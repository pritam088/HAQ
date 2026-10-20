// ============================================================
// HAQ — Deterministic Rule-Checking Engine
// This module performs the core comparison of citizen evidence
// against verified official rules. It is framework-independent
// and independently testable.
// ============================================================

import {
  differenceInCalendarDays,
  differenceInBusinessDays,
  addDays,
  addWeeks,
  addMonths,
  isValid,
  parseISO,
  isBefore,
  isAfter,
  format,
} from "date-fns";

import type {
  OfficialRule,
  RuleCheckResult,
  RuleCheckStatus,
  DeadlineUnit,
  DeadlineBasis,
} from "./types";

// --------------------------------------------------
// Input types
// --------------------------------------------------
export interface RuleCheckInput {
  applicationDate?: string | null;
  acknowledgementDate?: string | null;
  actualCompletionDate?: string | null;
  referenceNumber?: string | null;
}

// --------------------------------------------------
// Helpers
// --------------------------------------------------

function safeParse(dateStr: string | null | undefined): Date | null {
  if (!dateStr) return null;
  const d = parseISO(dateStr);
  return isValid(d) ? d : null;
}

function getStartDate(
  input: RuleCheckInput,
  basis: DeadlineBasis | null | undefined
): { date: Date | null; basisUsed: string } {
  switch (basis) {
    case "ACKNOWLEDGEMENT_DATE":
    case "RECEIPT_DATE": {
      const d = safeParse(input.acknowledgementDate);
      if (d) return { date: d, basisUsed: "Acknowledgement / receipt date" };
      // fallback to submission if acknowledgement not provided
      const fallback = safeParse(input.applicationDate);
      return {
        date: fallback,
        basisUsed: fallback
          ? "Application date (acknowledgement not provided)"
          : "Unknown",
      };
    }
    case "SUBMISSION_DATE":
    default: {
      const d = safeParse(input.applicationDate);
      return {
        date: d,
        basisUsed: d ? "Application / submission date" : "Unknown",
      };
    }
  }
}

function calculateDeadlineDate(
  start: Date,
  value: number,
  unit: DeadlineUnit
): Date {
  switch (unit) {
    case "CALENDAR_DAYS":
      return addDays(start, value);
    case "WORKING_DAYS":
      // Approximate: add extra days for weekends
      // For a proper implementation, a holiday calendar would be needed
      return addDays(start, Math.ceil(value * (7 / 5)));
    case "WEEKS":
      return addWeeks(start, value);
    case "MONTHS":
      return addMonths(start, value);
    default:
      return addDays(start, value);
  }
}

function calculateElapsedDays(
  start: Date,
  end: Date,
  unit: DeadlineUnit
): number {
  switch (unit) {
    case "WORKING_DAYS":
      return differenceInBusinessDays(end, start);
    case "CALENDAR_DAYS":
    default:
      return differenceInCalendarDays(end, start);
  }
}

// --------------------------------------------------
// Main Engine
// --------------------------------------------------

export function checkRule(
  rule: OfficialRule,
  input: RuleCheckInput,
  /** The date to compare against (defaults to today) */
  checkDate?: Date
): RuleCheckResult {
  const now = checkDate ?? new Date();
  const baseResult = {
    ruleId: rule.id,
    ruleTitle: rule.ruleTitle,
    serviceId: rule.serviceId,
    serviceName: "", // populated by caller
    inputsSummary: {
      applicationDate: input.applicationDate ?? null,
      acknowledgementDate: input.acknowledgementDate ?? null,
      actualCompletionDate: input.actualCompletionDate ?? null,
      referenceNumber: input.referenceNumber ?? null,
    },
    ruleParameters: {
      deadlineValue: rule.deadlineValue ?? null,
      deadlineUnit: rule.deadlineUnit ?? null,
      deadlineBasis: rule.deadlineBasis ?? null,
      sourceUrl: rule.sourceUrl,
      sourceSection: rule.sourceSection ?? null,
      verificationStatus: rule.verificationStatus,
    },
    isSyntheticData: false,
    checkedAt: now.toISOString(),
  };

  // 1. Check rule verification status and source presence
  if (
    !rule.sourceUrl ||
    (rule.verificationStatus !== "VERIFIED" &&
      rule.verificationStatus !== "PENDING_REVIEW")
  ) {
    return {
      ...baseResult,
      status: "UNVERIFIED_RULE" as RuleCheckStatus,
      calculation: null,
      explanation: !rule.sourceUrl
        ? `The rule "${rule.ruleTitle}" does not contain a verifiable official source URL. Results cannot be produced from a source-less rule.`
        : `The rule "${rule.ruleTitle}" has not been verified against an official source. Its verification status is: ${rule.verificationStatus}. Results cannot be produced from an unverified rule.`,
      caveats: [
        "This rule has not been verified against an official source. Do not rely on this for any official purpose.",
      ],
      nextSteps: [
        "Wait for this rule to be verified by an authorized reviewer.",
        "Check the official source directly: " + (rule.sourceUrl || "No source link provided"),
      ],
    };
  }

  // 2. Check if rule is currently effective
  const effectiveFrom = safeParse(rule.effectiveFrom);
  const effectiveTo = safeParse(rule.effectiveTo);

  if (effectiveFrom && isAfter(effectiveFrom, now)) {
    return {
      ...baseResult,
      status: "INVALID_INPUT" as RuleCheckStatus,
      calculation: null,
      explanation: `This rule is not yet effective. It becomes effective from ${format(effectiveFrom, "dd MMM yyyy")}.`,
      caveats: ["The rule is not yet in force."],
      nextSteps: ["Check back after the effective date."],
    };
  }

  if (effectiveTo && isBefore(effectiveTo, now)) {
    return {
      ...baseResult,
      status: "UNVERIFIED_RULE" as RuleCheckStatus,
      calculation: null,
      explanation: `This rule may no longer be in effect. It was effective until ${format(effectiveTo, "dd MMM yyyy")}. A newer version may exist.`,
      caveats: [
        "This rule may have been superseded. Check the official source.",
      ],
      nextSteps: [
        "Check the official source for the current version: " +
          rule.sourceUrl,
      ],
    };
  }

  // 3. Check if we have the needed deadline parameters
  if (
    rule.deadlineValue == null ||
    rule.deadlineUnit == null
  ) {
    return {
      ...baseResult,
      status: "INSUFFICIENT_INFORMATION" as RuleCheckStatus,
      calculation: null,
      explanation:
        "The rule does not specify a verifiable deadline value or unit. A timeline comparison cannot be performed.",
      caveats: [
        "Without a specific deadline, only general information is available.",
      ],
      nextSteps: [
        "Review the official source for timeline details: " + rule.sourceUrl,
      ],
    };
  }

  // 4. Get the start date
  const { date: startDate, basisUsed } = getStartDate(
    input,
    rule.deadlineBasis
  );

  if (!startDate) {
    return {
      ...baseResult,
      status: "INSUFFICIENT_INFORMATION" as RuleCheckStatus,
      calculation: null,
      explanation:
        "No valid application or acknowledgement date was provided. A timeline calculation requires at least one date.",
      caveats: ["Provide a valid date to perform the calculation."],
      nextSteps: [
        "Enter the date when your application was submitted or acknowledged.",
      ],
    };
  }

  // 5. Determine the comparison end date
  const completionDate = safeParse(input.actualCompletionDate);
  const endDate = completionDate ?? now;
  const endDateLabel = completionDate
    ? "Actual completion date"
    : "Current date (service not yet completed)";

  // 6. Calculate
  const deadlineDate = calculateDeadlineDate(
    startDate,
    rule.deadlineValue,
    rule.deadlineUnit
  );
  const elapsedDays = calculateElapsedDays(
    startDate,
    endDate,
    rule.deadlineUnit
  );
  const allowedDays = rule.deadlineValue;
  const differenceDays = elapsedDays - allowedDays;

  const calculation = {
    startDate: format(startDate, "yyyy-MM-dd"),
    deadlineDate: format(deadlineDate, "yyyy-MM-dd"),
    elapsedDays,
    allowedDays,
    differencedays: differenceDays,
    basisUsed,
  };

  // 7. Determine status
  let status: RuleCheckStatus;
  let explanation: string;
  const caveats: string[] = [];
  const nextSteps: string[] = [];

  if (differenceDays <= 0) {
    status = "VERIFIED_NO_MISMATCH_IDENTIFIED";
    explanation = `Based on the provided information, the elapsed time (${elapsedDays} ${rule.deadlineUnit === "WORKING_DAYS" ? "working" : "calendar"} days) is within the stated service limit of ${allowedDays} ${rule.deadlineUnit === "WORKING_DAYS" ? "working" : "calendar"} days. No timeline mismatch was identified.`;
    nextSteps.push(
      "No action may be required at this time based on the timeline alone."
    );
  } else {
    status = "POSSIBLE_MISMATCH_REQUIRES_REVIEW";
    explanation = `Based on the provided information, the elapsed time (${elapsedDays} ${rule.deadlineUnit === "WORKING_DAYS" ? "working" : "calendar"} days) exceeds the stated service limit of ${allowedDays} ${rule.deadlineUnit === "WORKING_DAYS" ? "working" : "calendar"} days by ${differenceDays} day(s). This indicates a possible timeline mismatch that may warrant review.`;
    nextSteps.push(
      "Consider contacting the relevant department for a status update.",
      "You may file a follow-up or grievance through the appropriate official channel."
    );
    if (rule.appealInformation) {
      nextSteps.push(
        "Appeal information: " + rule.appealInformation
      );
    }
  }

  // Standard caveats
  caveats.push(
    `This calculation uses the ${basisUsed.toLowerCase()} as the start date and the ${endDateLabel.toLowerCase()} as the comparison date.`
  );

  if (rule.deadlineUnit === "WORKING_DAYS") {
    caveats.push(
      "Working-day calculations exclude weekends but may not account for official holidays. The actual count may differ."
    );
  }

  caveats.push(
    "This is an informational comparison, not legal advice. A timeline difference alone does not prove a legal violation."
  );

  if (rule.verificationStatus === "PENDING_REVIEW") {
    caveats.push(
      "This rule is pending full verification. Results should be treated as preliminary."
    );
  }

  if (rule.applicabilityConditions) {
    caveats.push(
      "Applicability condition: " + rule.applicabilityConditions
    );
  }

  nextSteps.push("Verify the current rule at: " + rule.sourceUrl);

  return {
    ...baseResult,
    status,
    calculation,
    explanation,
    caveats,
    nextSteps,
  };
}

// --------------------------------------------------
// Validation helpers
// --------------------------------------------------

export function validateDates(input: RuleCheckInput): string[] {
  const errors: string[] = [];
  const now = new Date();

  if (input.applicationDate) {
    const d = safeParse(input.applicationDate);
    if (!d) {
      errors.push("Application date is not a valid date format.");
    } else if (isAfter(d, now)) {
      errors.push("Application date cannot be in the future.");
    }
  }

  if (input.acknowledgementDate) {
    const d = safeParse(input.acknowledgementDate);
    if (!d) {
      errors.push("Acknowledgement date is not a valid date format.");
    } else if (isAfter(d, now)) {
      errors.push("Acknowledgement date cannot be in the future.");
    }
  }

  if (input.actualCompletionDate) {
    const d = safeParse(input.actualCompletionDate);
    if (!d) {
      errors.push("Completion date is not a valid date format.");
    } else if (isAfter(d, now)) {
      errors.push("Completion date cannot be in the future.");
    }
  }

  // Cross-validation
  if (input.applicationDate && input.acknowledgementDate) {
    const appDate = safeParse(input.applicationDate);
    const ackDate = safeParse(input.acknowledgementDate);
    if (appDate && ackDate && isAfter(appDate, ackDate)) {
      errors.push(
        "Application date cannot be after the acknowledgement date."
      );
    }
  }

  if (input.applicationDate && input.actualCompletionDate) {
    const appDate = safeParse(input.applicationDate);
    const compDate = safeParse(input.actualCompletionDate);
    if (appDate && compDate && isAfter(appDate, compDate)) {
      errors.push("Application date cannot be after the completion date.");
    }
  }

  return errors;
}
