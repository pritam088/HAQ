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
      "Synthetic example: ₹50 application fee at eMitra kiosk (actual fees may vary)",
    serviceTimeLimit:
      "Synthetic example: 15 working days from date of application (actual timelines must be verified from the official source)",
    appealRoute:
      "Synthetic example: If the certificate is not issued within the stated time, a grievance may be filed through the Rajasthan Sampark portal or the district-level grievance cell. (Actual appeal procedures must be verified.)",
    officialSourceLinks: [
      "https://emitra.rajasthan.gov.in/",
      "https://rajasthan.gov.in/",
    ],
    verificationStatus: "PENDING_REVIEW",
    lastReviewedAt: "2026-10-18T00:00:00Z",
    effectiveFrom: "2024-01-01",
    effectiveTo: null,
    category: "Certificates",
    isActive: true,
    createdAt: "2026-10-18T00:00:00Z",
    updatedAt: "2026-10-18T00:00:00Z",
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
      "Any resident of Rajasthan requiring an official income declaration. (Synthetic summary.)",
    requiredDocuments: [
      "Application form",
      "Aadhaar card",
      "Salary slip or income proof",
      "Self-declaration affidavit",
      "Ration card",
    ],
    applicableFee:
      "Synthetic example: ₹40 application fee (actual fees may vary)",
    serviceTimeLimit:
      "Synthetic example: 10 working days (actual timelines must be verified)",
    appealRoute:
      "Synthetic example: District Collector office or Rajasthan Sampark portal",
    officialSourceLinks: ["https://emitra.rajasthan.gov.in/"],
    verificationStatus: "UNVERIFIED",
    lastReviewedAt: null,
    effectiveFrom: "2024-01-01",
    effectiveTo: null,
    category: "Certificates",
    isActive: true,
    createdAt: "2026-10-18T00:00:00Z",
    updatedAt: "2026-10-18T00:00:00Z",
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
      "Permanent residents of Rajasthan. (Synthetic summary.)",
    requiredDocuments: [
      "Application form",
      "Aadhaar card",
      "Ration card or voter ID",
      "Proof of residence (electricity bill, rent agreement)",
      "Passport-size photographs",
    ],
    applicableFee:
      "Synthetic example: ₹50 (actual fees may vary)",
    serviceTimeLimit:
      "Synthetic example: 15 calendar days (actual timelines must be verified)",
    appealRoute: "Synthetic example: District Collector office",
    officialSourceLinks: ["https://emitra.rajasthan.gov.in/"],
    verificationStatus: "UNVERIFIED",
    lastReviewedAt: null,
    effectiveFrom: "2024-01-01",
    effectiveTo: null,
    category: "Certificates",
    isActive: true,
    createdAt: "2026-10-18T00:00:00Z",
    updatedAt: "2026-10-18T00:00:00Z",
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

