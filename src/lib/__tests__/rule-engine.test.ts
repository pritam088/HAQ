import { describe, it, expect } from "vitest";
import { checkRule, validateDates, type RuleCheckInput } from "../rule-engine";
import type { OfficialRule } from "../types";

const mockRule: OfficialRule = {
  id: "test-rule-001",
  serviceId: "test-service-001",
  state: "Rajasthan",
  department: "Revenue Department",
  ruleTitle: "Test Caste Certificate Issuance Timeline",
  ruleText: "Certificate must be issued within 15 calendar days from submission.",
  sourceUrl: "https://emitra.rajasthan.gov.in",
  sourceType: "SERVICE_CHARTER",
  effectiveFrom: "2024-01-01",
  effectiveTo: null,
  verificationStatus: "VERIFIED",
  deadlineValue: 15,
  deadlineUnit: "CALENDAR_DAYS",
  deadlineBasis: "SUBMISSION_DATE",
  ruleVersion: 1,
  createdAt: "2024-01-01T00:00:00Z",
  updatedAt: "2024-01-01T00:00:00Z",
};

describe("Deterministic Rule Engine: validateDates", () => {
  it("passes with valid sequential dates", () => {
    const input: RuleCheckInput = {
      applicationDate: "2026-01-10",
      acknowledgementDate: "2026-01-11",
      actualCompletionDate: "2026-01-20",
    };
    const errors = validateDates(input);
    expect(errors).toHaveLength(0);
  });

  it("flags impossible future dates", () => {
    const input: RuleCheckInput = {
      applicationDate: "2099-01-01",
    };
    const errors = validateDates(input);
    expect(errors).toContain("Application date cannot be in the future.");
  });

  it("flags application date after acknowledgement date", () => {
    const input: RuleCheckInput = {
      applicationDate: "2026-01-15",
      acknowledgementDate: "2026-01-10",
    };
    const errors = validateDates(input);
    expect(errors).toContain(
      "Application date cannot be after the acknowledgement date."
    );
  });

  it("flags application date after completion date", () => {
    const input: RuleCheckInput = {
      applicationDate: "2026-01-20",
      actualCompletionDate: "2026-01-10",
    };
    const errors = validateDates(input);
    expect(errors).toContain(
      "Application date cannot be after the completion date."
    );
  });

  it("flags malformed date strings", () => {
    const input: RuleCheckInput = {
      applicationDate: "invalid-date",
    };
    const errors = validateDates(input);
    expect(errors).toContain("Application date is not a valid date format.");
  });
});

describe("Deterministic Rule Engine: checkRule", () => {
  it("returns INSUFFICIENT_INFORMATION when dates are omitted", () => {
    const input: RuleCheckInput = {};
    const result = checkRule(mockRule, input);
    expect(result.status).toBe("INSUFFICIENT_INFORMATION");
    expect(result.calculation).toBeNull();
  });

  it("returns UNVERIFIED_RULE when the official rule is unverified", () => {
    const unverifiedRule: OfficialRule = {
      ...mockRule,
      verificationStatus: "UNVERIFIED",
    };
    const input: RuleCheckInput = { applicationDate: "2026-01-01" };
    const result = checkRule(unverifiedRule, input);
    expect(result.status).toBe("UNVERIFIED_RULE");
  });

  it("returns UNVERIFIED_RULE when the source URL is missing", () => {
    const ruleWithoutSource: OfficialRule = {
      ...mockRule,
      sourceUrl: "",
    };
    const input: RuleCheckInput = { applicationDate: "2026-01-01" };
    const result = checkRule(ruleWithoutSource, input);
    expect(result.status).toBe("UNVERIFIED_RULE");
  });

  it("identifies VERIFIED_NO_MISMATCH_IDENTIFIED when completed within timeline", () => {
    const input: RuleCheckInput = {
      applicationDate: "2026-01-01",
      actualCompletionDate: "2026-01-10", // 9 days elapsed <= 15 days allowed
    };
    const result = checkRule(mockRule, input);
    expect(result.status).toBe("VERIFIED_NO_MISMATCH_IDENTIFIED");
    expect(result.calculation).not.toBeNull();
    expect(result.calculation?.elapsedDays).toBe(9);
    expect(result.calculation?.allowedDays).toBe(15);
    expect(result.calculation?.differencedays).toBe(-6);
  });

  it("identifies POSSIBLE_MISMATCH_REQUIRES_REVIEW when completed after timeline", () => {
    const input: RuleCheckInput = {
      applicationDate: "2026-01-01",
      actualCompletionDate: "2026-01-25", // 24 days elapsed > 15 days allowed
    };
    const result = checkRule(mockRule, input);
    expect(result.status).toBe("POSSIBLE_MISMATCH_REQUIRES_REVIEW");
    expect(result.calculation).not.toBeNull();
    expect(result.calculation?.elapsedDays).toBe(24);
    expect(result.calculation?.differencedays).toBe(9);
    expect(result.explanation).toContain("exceeds the stated service limit");
  });

  it("respects ACKNOWLEDGEMENT_DATE as start date when configured", () => {
    const ackRule: OfficialRule = {
      ...mockRule,
      deadlineBasis: "ACKNOWLEDGEMENT_DATE",
    };
    const input: RuleCheckInput = {
      applicationDate: "2026-01-01",
      acknowledgementDate: "2026-01-05",
      actualCompletionDate: "2026-01-15",
    };
    const result = checkRule(ackRule, input);
    expect(result.calculation?.startDate).toBe("2026-01-05");
    expect(result.calculation?.elapsedDays).toBe(10);
  });

  it("handles WORKING_DAYS deadline unit correctly", () => {
    const workingDaysRule: OfficialRule = {
      ...mockRule,
      deadlineUnit: "WORKING_DAYS",
      deadlineValue: 10,
    };
    const input: RuleCheckInput = {
      applicationDate: "2026-01-05", // Monday
      actualCompletionDate: "2026-01-16", // Friday next week (10 working days elapsed)
    };
    const result = checkRule(workingDaysRule, input);
    expect(result.status).toBe("VERIFIED_NO_MISMATCH_IDENTIFIED");
    expect(result.calculation?.elapsedDays).toBe(9);
  });
});
