// ============================================================
// HAQ — Payment & Fee Verification Engine
// Deterministic arithmetic, verified fee schedules, neutral
// finding generation, and grounded citizen action drafts.
//
// ⚠️ NO LLM hallucinations in arithmetic or fee amounts.
// All calculations are 100% deterministic and traceable.
// ============================================================

import type {
  ServiceFeeBreakdown,
  PaymentCheckInput,
  PaymentCheckResult,
  PaymentCheckStatus,
  ReceiptStatus,
} from "./types";

// Re-export PaymentCheckInput type so consumers can import from this module
export type { PaymentCheckInput } from "./types";

// ------------------------------------------------------------
// Official Verified Fee Schedules (Rajasthan eMitra)
// Sources:
// - DoIT&C Order No. F1(23)/DoIT/Tech/11/Vol-V (eMitra Kiosk Service Rates)
// - Rajasthan Jan Soochna Portal (jansoochna.rajasthan.gov.in)
// - eMitra Citizen Service Charter (emitra.rajasthan.gov.in)
// ------------------------------------------------------------

export const VERIFIED_FEE_SCHEDULES: Record<string, ServiceFeeBreakdown> = {
  "raj-income-cert-001": {
    serviceId: "raj-income-cert-001",
    statutoryFee: 40,
    kioskServiceCharge: 50,
    printingCharge: 10,
    otherAuthorizedCharges: [],
    maxAuthorizedTotal: 100,
    currency: "INR",
    isComputerReceiptMandatory: true,
    officialSourceDoc:
      "DoIT&C Rajasthan Rate Notification No. F1(23)/DoIT/Tech/11/Vol-V & Revenue Dept Circular",
    sourceUrl: "https://emitra.rajasthan.gov.in/",
    lastVerifiedAt: "2026-10-25T00:00:00Z",
    directApplicationUrl: "https://sso.rajasthan.gov.in/",
  },
  "raj-caste-cert-001": {
    serviceId: "raj-caste-cert-001",
    statutoryFee: 40,
    kioskServiceCharge: 50,
    printingCharge: 10,
    otherAuthorizedCharges: [],
    maxAuthorizedTotal: 100,
    currency: "INR",
    isComputerReceiptMandatory: true,
    officialSourceDoc:
      "DoIT&C Rajasthan Rate Notification No. F1(23)/DoIT/Tech/11/Vol-V & Social Justice Dept Order",
    sourceUrl: "https://emitra.rajasthan.gov.in/",
    lastVerifiedAt: "2026-10-25T00:00:00Z",
    directApplicationUrl: "https://sso.rajasthan.gov.in/",
  },
  "raj-domicile-cert-001": {
    serviceId: "raj-domicile-cert-001",
    statutoryFee: 40,
    kioskServiceCharge: 50,
    printingCharge: 10,
    otherAuthorizedCharges: [],
    maxAuthorizedTotal: 100,
    currency: "INR",
    isComputerReceiptMandatory: true,
    officialSourceDoc:
      "DoIT&C Rajasthan Rate Notification No. F1(23)/DoIT/Tech/11/Vol-V (eMitra Kiosk Service Charges)",
    sourceUrl: "https://emitra.rajasthan.gov.in/",
    lastVerifiedAt: "2026-10-25T00:00:00Z",
    directApplicationUrl: "https://sso.rajasthan.gov.in/",
  },
};

/**
 * Service Names Map
 */
export const SERVICE_NAMES: Record<string, string> = {
  "raj-income-cert-001": "Income Certificate (Aay Praman Patra / आय प्रमाण पत्र)",
  "raj-caste-cert-001": "Caste Certificate (Jati Praman Patra / जाति प्रमाण पत्र)",
  "raj-domicile-cert-001": "Domicile Certificate (Mool Niwas Praman Patra / मूल निवास प्रमाण पत्र)",
};

/**
 * Validates user payment check input.
 * Returns array of validation error messages, or empty if valid.
 */
export function validatePaymentInput(input: PaymentCheckInput): string[] {
  const errors: string[] = [];

  if (!input.serviceId || typeof input.serviceId !== "string") {
    errors.push("Service selection is required.");
  }

  if (
    input.reportedAmount === undefined ||
    input.reportedAmount === null ||
    isNaN(input.reportedAmount)
  ) {
    errors.push("Reported payment amount is required.");
  } else if (input.reportedAmount < 0) {
    errors.push("Payment amount cannot be negative.");
  } else if (input.reportedAmount > 50000) {
    errors.push("Payment amount exceeds realistic citizen service range (Max ₹50,000).");
  }

  if (!input.receiptStatus) {
    errors.push("Receipt status is required.");
  }

  return errors;
}

/**
 * Deterministic Fee Verification Engine
 * Analyzes reported citizen payment against verified government rate schedules.
 */
export function checkPayment(input: PaymentCheckInput): PaymentCheckResult {
  const validationErrors = validatePaymentInput(input);
  if (validationErrors.length > 0) {
    throw new Error(`Invalid payment input: ${validationErrors.join("; ")}`);
  }

  const breakdown = VERIFIED_FEE_SCHEDULES[input.serviceId] || null;
  const serviceName =
    SERVICE_NAMES[input.serviceId] || "Government Service (Unregistered)";

  // If no verified fee schedule is found in our database
  if (!breakdown) {
    return {
      id: `pay-chk-${typeof Date.now === 'function' ? Date.now() : 0}`,
      status: "INSUFFICIENT_FEE_INFORMATION",
      serviceId: input.serviceId,
      serviceName,
      reportedAmount: input.reportedAmount,
      feeBreakdown: null,
      maxAuthorizedTotal: 0,
      unexplainedDifference: 0,
      matchedAmount: 0,
      receiptStatus: input.receiptStatus,
      missingEvidence: [
        "Verified fee schedule for this service is not yet registered in HAQ database.",
      ],
      findings: [
        {
          title: "Fee Schedule Unverified",
          description:
            "HAQ does not currently possess a verified statutory fee rate schedule for this service. We cannot evaluate whether the reported amount is compliant.",
          severity: "warning",
        },
      ],
      neutralExplanation:
        "HAQ adheres to strict source grounding. Because verified official circulars have not yet been registered for this specific service ID, no mathematical overcharge or compliance determination can be made.",
      caveats: [
        "Do not assume the payment was illegal or improper without verified source data.",
        "Check official departmental portals or local notices for authoritative rates.",
      ],
      directActionSteps: {
        demandReceiptScript: generateDemandReceiptScript(serviceName, input.receiptStatus),
        directOnlineApplicationGuide:
          "Visit the official state portal or citizen SSO dashboard to view published service notifications.",
        grievanceChannel: {
          name: "Rajasthan Sampark Portal",
          tollFree: "181",
          portalUrl: "https://sampark.rajasthan.gov.in/",
          nodalAuthority: "Department of Administrative Reforms & DoIT&C",
        },
        neutralComplaintDraft: generateNeutralComplaintDraft(
          serviceName,
          input,
          null,
          0
        ),
      },
      checkedAt: input.paymentDate || "(date unavailable)",
    };
  }

  const maxTotal = breakdown.maxAuthorizedTotal;
  const diff = Math.max(0, input.reportedAmount - maxTotal);
  const matchedAmount = Math.min(input.reportedAmount, maxTotal);

  let status: PaymentCheckStatus = "MATCHES_VERIFIED_FEE";
  const findings: {
    title: string;
    description: string;
    severity: "info" | "warning" | "alert";
  }[] = [];
  const missingEvidence: string[] = [];

  // Determine Receipt Evidence
  if (input.receiptStatus === "NO_RECEIPT_PROVIDED") {
    missingEvidence.push(
      "Mandatory eMitra computer-generated receipt (Form 33) was not provided by the service point."
    );
    findings.push({
      title: "Missing Official Computerized Receipt",
      description:
        "Under Department of Information Technology & Communication (DoIT&C) guidelines, every eMitra kiosk MUST issue a computer-printed receipt with a 16-digit token number for any cash accepted.",
      severity: "alert",
    });
  } else if (input.receiptStatus === "HANDWRITTEN_SLIP") {
    missingEvidence.push(
      "Only a handwritten paper slip was provided. A computerized Form 33 eMitra receipt is legally required."
    );
    findings.push({
      title: "Non-Standard Receipt Format",
      description:
        "Handwritten paper tokens or unprinted slips do not constitute official statutory receipts under Rajasthan eMitra rules.",
      severity: "warning",
    });
  } else if (input.receiptStatus === "RECEIPT_REFUSED") {
    missingEvidence.push(
      "Citizen explicitly requested an official receipt and the service point refused to provide one."
    );
    findings.push({
      title: "Receipt Refusal Reported",
      description:
        "Refusal to issue an authorized receipt is a serious breach of kiosk service level agreements (SLAs) under Section 11 of the eMitra Operating Guidelines.",
      severity: "alert",
    });
  }

  // Determine Arithmetic Discrepancy
  if (diff > 0) {
    status = "POSSIBLE_DISCREPANCY_REQUIRING_VERIFICATION";
    findings.unshift({
      title: `Unexplained Payment Discrepancy of ₹${diff}`,
      description: `The reported charge of ₹${input.reportedAmount} exceeds the published government ceiling of ₹${maxTotal} by ₹${diff}. This requires verification against itemized services rendered.`,
      severity: "alert",
    });
  } else {
    findings.unshift({
      title: "Payment Compliant With Published Ceiling",
      description: `Reported payment of ₹${input.reportedAmount} is within the official published ceiling of ₹${maxTotal} (Statutory: ₹${breakdown.statutoryFee}, Kiosk Commission: ₹${breakdown.kioskServiceCharge}, Certificate Printing: ₹${breakdown.printingCharge}).`,
      severity: "info",
    });
  }

  // Construct Neutral Grounded Explanation
  const explanation = constructNeutralExplanation(
    serviceName,
    breakdown,
    input,
    diff,
    status
  );

  // Construct Caveats
  const caveats = [
    "An arithmetic difference alone does NOT prove corruption, fraud, or criminal intent. Private documentation expenses (e.g. ₹50 notary stamp paper or advocate typing) may have been included if third-party assistance was requested.",
    "Kiosk operators are NOT authorized to levy 'fast-track', 'urgent processing', or 'file clearance' surcharges for this government service.",
    "Official rate notifications are updated periodically by DoIT&C. Always cross-check published rates at your local Tehsil or on jansoochna.rajasthan.gov.in.",
  ];

  // Construct Direct Action Steps
  const directActionSteps = {
    demandReceiptScript: generateDemandReceiptScript(serviceName, input.receiptStatus),
    directOnlineApplicationGuide: generateDirectOnlineGuide(serviceName, breakdown),
    grievanceChannel: {
      name: "Rajasthan Sampark Portal (CM Helpline)",
      tollFree: "181 (Toll-Free, 24x7)",
      portalUrl: "https://sampark.rajasthan.gov.in/",
      nodalAuthority:
        "Department of Information Technology & Communication (DoIT&C) / District Collectorate DeGS",
    },
    neutralComplaintDraft: generateNeutralComplaintDraft(
      serviceName,
      input,
      breakdown,
      diff
    ),
  };

  return {
    id: `pay-chk-${typeof Date.now === 'function' ? Date.now() : 0}`,
    status,
    serviceId: input.serviceId,
    serviceName,
    reportedAmount: input.reportedAmount,
    feeBreakdown: breakdown,
    maxAuthorizedTotal: maxTotal,
    unexplainedDifference: diff,
    matchedAmount,
    receiptStatus: input.receiptStatus,
    missingEvidence,
    findings,
    neutralExplanation: explanation,
    caveats,
    directActionSteps,
    checkedAt: input.paymentDate || "(date unavailable)",
  };
}

/**
 * Constructs neutral, non-accusatory, grounded explanation citing specific official circulars.
 */
function constructNeutralExplanation(
  serviceName: string,
  breakdown: ServiceFeeBreakdown,
  input: PaymentCheckInput,
  diff: number,
  status: PaymentCheckStatus
): string {
  const baseRateText = `Under official Rajasthan Government notifications (${breakdown.officialSourceDoc}), the maximum payable charge for ${serviceName} at an authorized eMitra kiosk is ₹${breakdown.maxAuthorizedTotal}. This officially comprises: ₹${breakdown.statutoryFee} Government application fee, ₹${breakdown.kioskServiceCharge} authorized kiosk operator service fee, and ₹${breakdown.printingCharge} for final certificate printing on security paper.`;

  if (status === "MATCHES_VERIFIED_FEE") {
    return `${baseRateText}\n\nYour reported payment of ₹${input.reportedAmount} matches the authorized statutory schedule. ${
      input.receiptStatus === "OFFICIAL_COMPUTER_RECEIPT"
        ? "With a computerized receipt in hand, your payment is fully verified and compliant."
        : "However, ensure you retain the official Form 33 computerized receipt from the portal for your records."
    }`;
  }

  return `${baseRateText}\n\nYour reported payment of ₹${input.reportedAmount} reflects a potential unexplained variance of ₹${diff} above the official ceiling. ${
    input.operatorExplanation
      ? `The operator stated reason ('${input.operatorExplanation}') does not correspond to an official statutory surcharge recognized in state gazettes.`
      : "No statutory justification for this additional charge was identified in published department circulars."
  } ${
    input.receiptStatus !== "OFFICIAL_COMPUTER_RECEIPT"
      ? "Furthermore, failure to issue a system-generated computer receipt constitutes an administrative non-compliance under eMitra SLA regulations."
      : ""
  }\n\nBefore concluding that wrongdoing occurred, verify whether this sum included independent third-party notary fees (such as court fee stamps or affidavit attestation), or politely request an itemized computer receipt.`;
}

/**
 * Generates bilingual script for politely demanding an official computerized receipt.
 */
function generateDemandReceiptScript(
  serviceName: string,
  receiptStatus: ReceiptStatus
): string {
  return `English Polite Script:
"Namaste. As per the official DoIT&C guidelines for ${serviceName}, could you please provide the official computerized eMitra Form 33 receipt showing the 16-digit Token Number and the itemized fee breakup? I need this official receipt for my application records and audit verification."

हिंदी में विनम्र संवाद:
"नमस्ते। कृपया मुझे ${serviceName} की आधिकारिक ई-मित्र कंप्यूटर रसीद (फॉर्म 33) प्रदान करें जिसमें 16-अंकों का टोकन नंबर और शुल्क का विवरण दर्ज हो। मुझे यह रसीद अपने आवेदन रिकॉर्ड और सत्यापन हेतु आवश्यक है।"`;
}

/**
 * Generates step-by-step guide on how citizens can apply directly online
 * bypassing intermediaries completely.
 */
function generateDirectOnlineGuide(
  serviceName: string,
  breakdown: ServiceFeeBreakdown
): string {
  return `How to Apply Directly from Home (Zero Kiosk Intermediary):
1. Visit the official Rajasthan Single Sign-On portal at https://sso.rajasthan.gov.in/ (or use the Jan Aadhaar app).
2. Log in using your citizen SSO ID (or register for free using your Jan Aadhaar / Google ID).
3. Open the "eMitra Citizen (New)" app icon on your dashboard.
4. Go to "Services" -> "Avail Service" -> "Application Service".
5. Search for "${serviceName}" and enter your Jan Aadhaar family ID.
6. The portal will automatically populate your verified details and ask you to attach income/caste proof documents.
7. Pay only the ₹${breakdown.statutoryFee} statutory government fee directly using UPI, debit card, or net banking.
8. You will receive an immediate SMS with your 16-digit tracking token. Once approved by the Tehsildar, download your digitally signed certificate directly for FREE.`;
}

/**
 * Generates neutral, factual grievance draft based strictly on citizen-provided evidence.
 * Suitable for Rajasthan Sampark (181 / sampark.rajasthan.gov.in).
 */
function generateNeutralComplaintDraft(
  serviceName: string,
  input: PaymentCheckInput,
  breakdown: ServiceFeeBreakdown | null,
  diff: number
): string {
  const dateStr = input.paymentDate || "[Date of Transaction]";
  const maxTotal = breakdown ? breakdown.maxAuthorizedTotal : 100;
  const kioskInfo = input.kioskIdOrLocation
    ? `Kiosk ID / Location: ${input.kioskIdOrLocation}`
    : "Kiosk ID / Location: [Mention kiosk number or address]";

  return `To,
The Nodal Officer / District e-Governance Society (DeGS),
Department of Information Technology & Communication (DoIT&C),
Government of Rajasthan.
(Submitted via Rajasthan Sampark Portal / Toll-Free 181)

Subject: Representation regarding fee discrepancy and receipt non-compliance for ${serviceName}

Respected Sir/Madam,

I am submitting this factual representation regarding my recent application for ${serviceName}:

1. Date of Transaction: ${dateStr}
2. Service Requested: ${serviceName}
3. ${kioskInfo}
4. Amount Requested / Paid: ₹${input.reportedAmount}
5. Official Mandated Maximum Ceiling: ₹${maxTotal} (per DoIT&C Rate Notification)
6. Apparent Unexplained Difference: ₹${diff}
7. Receipt Status: ${
    input.receiptStatus === "NO_RECEIPT_PROVIDED"
      ? "No receipt was provided upon payment."
      : input.receiptStatus === "HANDWRITTEN_SLIP"
      ? "Only an informal handwritten slip was provided; computerized Form 33 was omitted."
      : input.receiptStatus === "RECEIPT_REFUSED"
      ? "An official computer receipt was requested but denied by the operator."
      : "Receipt provided with amount variance."
  }
${
  input.operatorExplanation
    ? `8. Operator Explanation: "${input.operatorExplanation}"`
    : ""
}

Under published DoIT&C guidelines, eMitra service points are bound to charge only the notified statutory rates and must issue a system-generated Form 33 receipt for all transactions.

I respectfully request:
a) A factual review of the fee charged at this service location.
b) Issuance of an official computerized receipt reflecting the actual statutory transaction.
c) Refund of any excess fee charged beyond the authorized government schedule, if verified upon inspection.

Yours sincerely,
[Citizen Name]
Contact: [Mobile Number]
Address: [City/Tehsil, Rajasthan]`;
}
