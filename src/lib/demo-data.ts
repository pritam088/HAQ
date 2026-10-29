// ============================================================
// HAQ — Synthetic Demo Data
// This file contains SYNTHETIC demonstration data for the
// Rajasthan Caste Certificate (Jati Praman Patra) service.
//
// ⚠️  ALL data here is for DEMONSTRATION PURPOSES ONLY.
// Deadlines, fees, and procedures are HYPOTHETICAL and must
// NOT be treated as actual government service parameters.
// ============================================================

import type { GovernmentService, OfficialRule } from "./types";

export const DEMO_SERVICES: GovernmentService[] = [
  {
    id: "raj-caste-cert-001",
    name: "Caste Certificate (Jati Praman Patra)",
    nameHindi: "जाति प्रमाण पत्र",
    state: "Rajasthan",
    department: "Revenue Department (via eMitra)",
    shortDescription:
      "Application for issuance of a caste certificate through the eMitra portal in Rajasthan.",
    longDescription:
      "The Caste Certificate (Jati Praman Patra) is an official document issued by the Revenue Department of the Government of Rajasthan. It certifies a citizen's caste and is commonly required for admissions, employment applications, and accessing government welfare schemes. Applications are typically submitted through eMitra kiosks or the eMitra online portal.",
    eligibilitySummary:
      "Residents of Rajasthan belonging to Scheduled Castes (SC), Scheduled Tribes (ST), or Other Backward Classes (OBC) categories. (This is a synthetic summary for demonstration.)",
    requiredDocuments: [
      "Application form",
      "Aadhaar card (for identity verification)",
      "Ration card or family ID",
      "Previous caste certificate of a family member (if available)",
      "Passport-size photographs",
      "Self-declaration affidavit",
    ],
    applicableFee:
      "Statutory application fee: ₹40 | Authorized eMitra Kiosk charge: ₹50 | Security print: ₹10 | Max Citizen Total: ₹100",
    feeBreakdown: {
      serviceId: "raj-caste-cert-001",
      statutoryFee: 40,
      kioskServiceCharge: 50,
      printingCharge: 10,
      maxAuthorizedTotal: 100,
      currency: "INR",
      isComputerReceiptMandatory: true,
      officialSourceDoc: "DoIT&C Rate Notification No. F1(23)/DoIT/Tech/11/Vol-V",
      sourceUrl: "https://emitra.rajasthan.gov.in/",
      lastVerifiedAt: "2026-10-25T00:00:00Z",
      directApplicationUrl: "https://sso.rajasthan.gov.in/",
    },
    directOnlineProcess:
      "Apply directly from home via Rajasthan SSO (sso.rajasthan.gov.in) -> eMitra Citizen (New) -> Application Services -> Pay ₹40 online via UPI/netbanking. Avoids all kiosk visit fees.",
    serviceTimeLimit:
      "15 working days from submission of complete application (Rajasthan Guaranteed Delivery Act)",
    appealRoute:
      "First Appeal: Sub-Divisional Officer (SDO) / District Collector. eMitra Overcharging Grievance: Rajasthan Sampark 181",
    officialSourceLinks: [
      "https://emitra.rajasthan.gov.in/",
      "https://jansoochna.rajasthan.gov.in/",
      "https://rajasthan.gov.in/",
    ],
    verificationStatus: "VERIFIED",
    lastReviewedAt: "2026-10-25T00:00:00Z",
    effectiveFrom: "2024-01-01",
    effectiveTo: null,
    category: "Certificates",
    isActive: true,
    createdAt: "2026-10-18T00:00:00Z",
    updatedAt: "2026-10-25T00:00:00Z",
  },
  {
    id: "raj-income-cert-001",
    name: "Income Certificate (Aay Praman Patra)",
    nameHindi: "आय प्रमाण पत्र",
    state: "Rajasthan",
    department: "Revenue Department (via eMitra)",
    shortDescription:
      "Application for issuance of an income certificate through the eMitra portal in Rajasthan.",
    longDescription:
      "The Income Certificate is issued by the Revenue Department and certifies the annual income of an individual or family. It is used for availing fee concessions, scholarships, subsidized housing, and other government benefits.",
    eligibilitySummary:
      "Any resident of Rajasthan requiring an official income declaration.",
    requiredDocuments: [
      "Application form",
      "Aadhaar card / Jan Aadhaar ID",
      "Salary slip, employer certificate, or agricultural income proof",
      "Self-declaration affidavit (notarized)",
      "Ration card",
    ],
    applicableFee:
      "Statutory application fee: ₹40 | Authorized eMitra Kiosk charge: ₹50 | Security print: ₹10 | Max Citizen Total: ₹100",
    feeBreakdown: {
      serviceId: "raj-income-cert-001",
      statutoryFee: 40,
      kioskServiceCharge: 50,
      printingCharge: 10,
      maxAuthorizedTotal: 100,
      currency: "INR",
      isComputerReceiptMandatory: true,
      officialSourceDoc: "DoIT&C Rate Notification No. F1(23)/DoIT/Tech/11/Vol-V",
      sourceUrl: "https://emitra.rajasthan.gov.in/",
      lastVerifiedAt: "2026-10-25T00:00:00Z",
      directApplicationUrl: "https://sso.rajasthan.gov.in/",
    },
    directOnlineProcess:
      "Apply directly from home via Rajasthan SSO (sso.rajasthan.gov.in) -> eMitra Citizen -> Application Services -> Pay ₹40 online. You will receive an SMS token to download digitally signed certificate.",
    serviceTimeLimit:
      "10 working days from submission of complete application (Rajasthan Guaranteed Delivery Act)",
    appealRoute:
      "First Appeal: Tehsildar / District Collector. eMitra Kiosk Overcharging: Rajasthan Sampark 181",
    officialSourceLinks: [
      "https://emitra.rajasthan.gov.in/",
      "https://jansoochna.rajasthan.gov.in/",
    ],
    verificationStatus: "VERIFIED",
    lastReviewedAt: "2026-10-25T00:00:00Z",
    effectiveFrom: "2024-01-01",
    effectiveTo: null,
    category: "Certificates",
    isActive: true,
    createdAt: "2026-10-18T00:00:00Z",
    updatedAt: "2026-10-25T00:00:00Z",
  },
  {
    id: "raj-domicile-cert-001",
    name: "Domicile Certificate (Mool Niwas Praman Patra)",
    nameHindi: "मूल निवास प्रमाण पत्र",
    state: "Rajasthan",
    department: "Revenue Department (via eMitra)",
    shortDescription:
      "Application for issuance of a domicile / residence certificate in Rajasthan.",
    longDescription:
      "The Domicile Certificate (Mool Niwas Praman Patra) certifies that the applicant is a permanent resident of Rajasthan. It is commonly required for state-level admissions, government jobs, and various welfare schemes.",
    eligibilitySummary:
      "Permanent residents of Rajasthan living in state for at least 10 years.",
    requiredDocuments: [
      "Application form",
      "Aadhaar card / Jan Aadhaar",
      "Ration card or voter ID",
      "Proof of residence (electricity bill, 10-year education certificates, or land records)",
      "Passport-size photographs",
    ],
    applicableFee:
      "Statutory application fee: ₹40 | Authorized eMitra Kiosk charge: ₹50 | Security print: ₹10 | Max Citizen Total: ₹100",
    feeBreakdown: {
      serviceId: "raj-domicile-cert-001",
      statutoryFee: 40,
      kioskServiceCharge: 50,
      printingCharge: 10,
      maxAuthorizedTotal: 100,
      currency: "INR",
      isComputerReceiptMandatory: true,
      officialSourceDoc: "DoIT&C Rate Notification No. F1(23)/DoIT/Tech/11/Vol-V",
      sourceUrl: "https://emitra.rajasthan.gov.in/",
      lastVerifiedAt: "2026-10-25T00:00:00Z",
      directApplicationUrl: "https://sso.rajasthan.gov.in/",
    },
    directOnlineProcess:
      "Apply directly from home via Rajasthan SSO (sso.rajasthan.gov.in) -> eMitra Citizen -> Application Services -> Pay ₹40 online.",
    serviceTimeLimit:
      "15 calendar days from submission of complete application",
    appealRoute:
      "First Appeal: Sub-Divisional Officer (SDO). Kiosk Overcharging: Rajasthan Sampark 181",
    officialSourceLinks: [
      "https://emitra.rajasthan.gov.in/",
      "https://jansoochna.rajasthan.gov.in/",
    ],
    verificationStatus: "VERIFIED",
    lastReviewedAt: "2026-10-25T00:00:00Z",
    effectiveFrom: "2024-01-01",
    effectiveTo: null,
    category: "Certificates",
    isActive: true,
    createdAt: "2026-10-18T00:00:00Z",
    updatedAt: "2026-10-25T00:00:00Z",
  },
];

export const DEMO_RULES: OfficialRule[] = [
  {
    id: "rule-raj-caste-001",
    serviceId: "raj-caste-cert-001",
    state: "Rajasthan",
    department: "Revenue Department",
    ruleTitle:
      "Service Time Limit for Caste Certificate Issuance (Synthetic Example)",
    ruleText:
      "SYNTHETIC EXAMPLE: The caste certificate shall be issued within 15 working days from the date of submission of a complete application with all required documents at an eMitra kiosk or through the eMitra online portal. This is a hypothetical rule created for demonstration purposes and does not represent an actual government notification.",
    sourceUrl: "https://emitra.rajasthan.gov.in/",
    sourceType: "GOVERNMENT_SERVICE_PAGE",
    sourcePage: "N/A — Synthetic data",
    sourceSection: "N/A — Synthetic data",
    effectiveFrom: "2024-01-01",
    effectiveTo: null,
    verificationStatus: "PENDING_REVIEW",
    verifiedBy: null,
    verifiedAt: null,
    lastCheckedAt: "2026-10-18T00:00:00Z",
    applicabilityConditions:
      "Applicable only when a complete application with all required documents has been submitted. Incomplete applications may reset the timeline.",
    deadlineValue: 15,
    deadlineUnit: "WORKING_DAYS",
    deadlineBasis: "SUBMISSION_DATE",
    feeValue: 50,
    feeCurrency: "INR",
    appealInformation:
      "Synthetic: If the certificate is not issued within the stated period, a grievance may be filed through the Rajasthan Sampark portal (https://sampark.rajasthan.gov.in/) or the district-level grievance redressal cell.",
    ruleVersion: 1,
    createdAt: "2026-10-18T00:00:00Z",
    updatedAt: "2026-10-18T00:00:00Z",
  },
  {
    id: "rule-raj-income-001",
    serviceId: "raj-income-cert-001",
    state: "Rajasthan",
    department: "Revenue Department",
    ruleTitle:
      "Service Time Limit for Income Certificate Issuance (Synthetic Example)",
    ruleText:
      "SYNTHETIC EXAMPLE: The income certificate shall be issued within 10 working days from the date of submission of a complete application with all required documents at an eMitra kiosk or through the eMitra online portal. This is a hypothetical rule created for demonstration purposes and does not represent an actual government notification.",
    sourceUrl: "https://emitra.rajasthan.gov.in/",
    sourceType: "GOVERNMENT_SERVICE_PAGE",
    sourcePage: "N/A — Synthetic data",
    sourceSection: "N/A — Synthetic data",
    effectiveFrom: "2024-01-01",
    effectiveTo: null,
    verificationStatus: "UNVERIFIED",
    verifiedBy: null,
    verifiedAt: null,
    lastCheckedAt: "2026-10-18T00:00:00Z",
    applicabilityConditions:
      "Applicable only when a complete application with salary proof or self-declaration affidavit has been submitted. Incomplete applications may reset the timeline.",
    deadlineValue: 10,
    deadlineUnit: "WORKING_DAYS",
    deadlineBasis: "SUBMISSION_DATE",
    feeValue: 40,
    feeCurrency: "INR",
    appealInformation:
      "Synthetic: If the certificate is not issued within the stated period, a grievance may be filed through the Rajasthan Sampark portal (https://sampark.rajasthan.gov.in/) or the District Collector office.",
    ruleVersion: 1,
    createdAt: "2026-10-18T00:00:00Z",
    updatedAt: "2026-10-18T00:00:00Z",
  },
  {
    id: "rule-raj-domicile-001",
    serviceId: "raj-domicile-cert-001",
    state: "Rajasthan",
    department: "Revenue Department",
    ruleTitle:
      "Service Time Limit for Domicile Certificate Issuance (Synthetic Example)",
    ruleText:
      "SYNTHETIC EXAMPLE: The domicile certificate (Mool Niwas Praman Patra) shall be issued within 15 calendar days from the date of submission of a complete application with all required documents at an eMitra kiosk or through the eMitra online portal. This is a hypothetical rule created for demonstration purposes and does not represent an actual government notification.",
    sourceUrl: "https://emitra.rajasthan.gov.in/",
    sourceType: "GOVERNMENT_SERVICE_PAGE",
    sourcePage: "N/A — Synthetic data",
    sourceSection: "N/A — Synthetic data",
    effectiveFrom: "2024-01-01",
    effectiveTo: null,
    verificationStatus: "UNVERIFIED",
    verifiedBy: null,
    verifiedAt: null,
    lastCheckedAt: "2026-10-18T00:00:00Z",
    applicabilityConditions:
      "Applicable only when a complete application with proof of residence and identity documents has been submitted. Physical verification by the patwari may be required.",
    deadlineValue: 15,
    deadlineUnit: "CALENDAR_DAYS",
    deadlineBasis: "SUBMISSION_DATE",
    feeValue: 50,
    feeCurrency: "INR",
    appealInformation:
      "Synthetic: If the certificate is not issued within the stated period, a grievance may be filed through the District Collector office or Rajasthan Sampark portal (https://sampark.rajasthan.gov.in/).",
    ruleVersion: 1,
    createdAt: "2026-10-18T00:00:00Z",
    updatedAt: "2026-10-18T00:00:00Z",
  },
];

/** Get all demo services */
export function getDemoServices(): GovernmentService[] {
  return DEMO_SERVICES;
}

/** Get a single demo service by ID */
export function getDemoServiceById(
  id: string
): GovernmentService | undefined {
  return DEMO_SERVICES.find((s) => s.id === id);
}

/** Get rules for a service */
export function getDemoRulesForService(serviceId: string): OfficialRule[] {
  return DEMO_RULES.filter((r) => r.serviceId === serviceId);
}

/** Get a single rule by ID */
export function getDemoRuleById(id: string): OfficialRule | undefined {
  return DEMO_RULES.find((r) => r.id === id);
}

// Aliases for convenience
export const demoRules = DEMO_RULES;
export const demoServices = DEMO_SERVICES;

// --------------------------------------------------
// Demo Citizen Cases (for Dashboard)
// --------------------------------------------------
import type { CitizenCase } from "./types";

export const DEMO_CASES: (CitizenCase & {
  resultStatus: string;
  elapsedDays?: number;
  allowedDays?: number;
  differenceDays?: number;
  ruleTitle?: string;
  sourceUrl?: string;
})[] = [
  {
    id: "case-demo-001",
    serviceId: "raj-caste-cert-001",
    serviceName: "Caste Certificate (Jati Praman Patra)",
    applicationDate: "2026-09-25",
    acknowledgementDate: "2026-09-26",
    applicationReference: "RJ-EM-2026-89421",
    currentStatus: "Under Processing at Tehsil Office",
    actualCompletionDate: null,
    userNotes: "Applied via eMitra kiosk at Sanganer. Fee receipt received. Awaiting certificate for university admission.",
    status: "PROCESSING",
    resultStatus: "POSSIBLE_MISMATCH_REQUIRES_REVIEW",
    elapsedDays: 24,
    allowedDays: 15,
    differenceDays: 9,
    ruleTitle: "Service Time Limit for Caste Certificate Issuance (Synthetic Example)",
    sourceUrl: "https://emitra.rajasthan.gov.in/",
    createdAt: "2026-09-26T10:30:00Z",
    updatedAt: "2026-10-20T08:00:00Z",
  },
  {
    id: "case-demo-002",
    serviceId: "raj-income-cert-001",
    serviceName: "Income Certificate (Aay Praman Patra)",
    applicationDate: "2026-10-12",
    acknowledgementDate: "2026-10-12",
    applicationReference: "RJ-EM-2026-91304",
    currentStatus: "Certificate Issued & Downloaded",
    actualCompletionDate: "2026-10-18",
    userNotes: "Submitted for fee concession. Processed within the timeline.",
    status: "COMPLETED",
    resultStatus: "VERIFIED_NO_MISMATCH_IDENTIFIED",
    elapsedDays: 6,
    allowedDays: 10,
    differenceDays: -4,
    ruleTitle: "Income Certificate Timely Delivery Guideline (Synthetic)",
    sourceUrl: "https://emitra.rajasthan.gov.in/",
    createdAt: "2026-10-12T09:15:00Z",
    updatedAt: "2026-10-18T16:45:00Z",
  },
  {
    id: "case-demo-003",
    serviceId: "raj-domicile-cert-001",
    serviceName: "Domicile Certificate (Mool Niwas Praman Patra)",
    applicationDate: "2026-10-15",
    acknowledgementDate: null,
    applicationReference: "RJ-EM-2026-92810",
    currentStatus: "Submitted — Receipt Awaited",
    actualCompletionDate: null,
    userNotes: "Submitted application online; physical verification pending.",
    status: "SUBMITTED",
    resultStatus: "INSUFFICIENT_INFORMATION",
    ruleTitle: "Domicile Certificate Issuance Standard (Synthetic)",
    sourceUrl: "https://emitra.rajasthan.gov.in/",
    createdAt: "2026-10-15T14:20:00Z",
    updatedAt: "2026-10-15T14:20:00Z",
  },
];

export function getDemoCases() {
  return DEMO_CASES;
}

export function getDemoCaseById(id: string) {
  return DEMO_CASES.find((c) => c.id === id);
}

