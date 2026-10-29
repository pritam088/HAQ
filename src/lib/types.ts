// ============================================================
// HAQ — Official Rule & Service Data Models
// These types define the core domain entities for the application.
// ============================================================

/** Verification status for rules and services */
export type VerificationStatus =
  | "VERIFIED"
  | "UNVERIFIED"
  | "PENDING_REVIEW"
  | "OUTDATED"
  | "DISPUTED";

/** Source types for official rules */
export type SourceType =
  | "OFFICIAL_NOTIFICATION"
  | "OFFICIAL_STATUTE"
  | "SERVICE_CHARTER"
  | "GOVERNMENT_SERVICE_PAGE"
  | "OTHER";

/** Deadline counting units */
export type DeadlineUnit = "CALENDAR_DAYS" | "WORKING_DAYS" | "WEEKS" | "MONTHS";

/** Deadline basis — what event starts the clock */
export type DeadlineBasis =
  | "SUBMISSION_DATE"
  | "ACKNOWLEDGEMENT_DATE"
  | "RECEIPT_DATE"
  | "CUSTOM";

// --------------------------------------------------
// Official Rule
// --------------------------------------------------
export interface OfficialRule {
  id: string;
  serviceId: string;
  state: string;
  department: string;
  ruleTitle: string;
  ruleText: string;
  sourceUrl: string;
  sourceType: SourceType;
  sourcePage?: string;
  sourceSection?: string;
  effectiveFrom: string; // ISO date
  effectiveTo?: string | null;
  verificationStatus: VerificationStatus;
  verifiedBy?: string | null;
  verifiedAt?: string | null;
  lastCheckedAt?: string | null;
  applicabilityConditions?: string | null;
  deadlineValue?: number | null;
  deadlineUnit?: DeadlineUnit | null;
  deadlineBasis?: DeadlineBasis | null;
  feeValue?: number | null;
  feeCurrency?: string | null;
  appealInformation?: string | null;
  ruleVersion: number;
  createdAt: string;
  updatedAt: string;
}

// --------------------------------------------------
// Government Service
// --------------------------------------------------
export interface GovernmentService {
  id: string;
  name: string;
  nameHindi?: string;
  state: string;
  department: string;
  shortDescription: string;
  longDescription?: string;
  eligibilitySummary?: string | null;
  requiredDocuments?: string[] | null;
  applicableFee?: string | null;
  feeBreakdown?: ServiceFeeBreakdown | null;
  directOnlineProcess?: string | null;
  serviceTimeLimit?: string | null;
  appealRoute?: string | null;
  officialSourceLinks: string[];
  verificationStatus: VerificationStatus;
  lastReviewedAt?: string | null;
  effectiveFrom?: string | null;
  effectiveTo?: string | null;
  category?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// --------------------------------------------------
// Citizen Case
// --------------------------------------------------
export type CaseStatus =
  | "DRAFT"
  | "SUBMITTED"
  | "PROCESSING"
  | "COMPLETED"
  | "ERROR";

export interface CitizenCase {
  id: string;
  userId?: string | null;
  serviceId: string;
  serviceName: string;
  applicationDate?: string | null;
  acknowledgementDate?: string | null;
  applicationReference?: string | null;
  currentStatus?: string | null;
  actualCompletionDate?: string | null;
  userNotes?: string | null;
  status: CaseStatus;
  createdAt: string;
  updatedAt: string;
}

// --------------------------------------------------
// Rule Check Result
// --------------------------------------------------
export type RuleCheckStatus =
  | "VERIFIED_NO_MISMATCH_IDENTIFIED"
  | "POSSIBLE_MISMATCH_REQUIRES_REVIEW"
  | "INSUFFICIENT_INFORMATION"
  | "UNVERIFIED_RULE"
  | "CONFLICTING_EVIDENCE"
  | "INVALID_INPUT"
  | "PROCESSING_ERROR";

export interface RuleCheckResult {
  status: RuleCheckStatus;
  ruleId: string;
  ruleTitle: string;
  serviceId: string;
  serviceName: string;
  /** The user-provided inputs that were used */
  inputsSummary: {
    applicationDate?: string | null;
    acknowledgementDate?: string | null;
    actualCompletionDate?: string | null;
    referenceNumber?: string | null;
  };
  /** The rule parameters used for the check */
  ruleParameters: {
    deadlineValue?: number | null;
    deadlineUnit?: DeadlineUnit | null;
    deadlineBasis?: DeadlineBasis | null;
    sourceUrl: string;
    sourceSection?: string | null;
    verificationStatus: VerificationStatus;
  };
  /** Calculated values */
  calculation?: {
    startDate: string;
    deadlineDate: string;
    elapsedDays: number;
    allowedDays: number;
    differencedays: number;
    basisUsed: string;
  } | null;
  /** Human-readable explanation */
  explanation: string;
  /** Caveats and limitations */
  caveats: string[];
  /** Suggested next steps */
  nextSteps: string[];
  /** Whether this result used synthetic/demo data */
  isSyntheticData: boolean;
  /** Timestamp */
  checkedAt: string;
}

// --------------------------------------------------
// Document Upload
// --------------------------------------------------
export type ExtractionStatus =
  | "PENDING"
  | "EXTRACTING"
  | "EXTRACTED"
  | "PARTIAL"
  | "REQUIRES_OCR"
  | "UNREADABLE"
  | "CONFIRMED"
  | "FAILED";

export interface ExtractedField {
  fieldName: string;
  value: string;
  confidence: "HIGH" | "MEDIUM" | "LOW" | "UNCERTAIN";
  sourceLocation?: string;
  userConfirmed: boolean;
}

export interface UploadedDocument {
  id: string;
  caseId: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  extractionStatus: ExtractionStatus;
  extractedFields: ExtractedField[];
  extractedText?: string;
  uploadedAt: string;
}

// ============================================================
// HAQ — Payment & Fee Transparency Models
// ============================================================

export type ReceiptStatus =
  | "OFFICIAL_COMPUTER_RECEIPT" // e.g. Form 33 eMitra computer receipt with 16-digit token
  | "HANDWRITTEN_SLIP"          // Kiosk owner wrote on a scrap of paper
  | "NO_RECEIPT_PROVIDED"       // Money accepted without receipt
  | "RECEIPT_REFUSED";          // Citizen asked for receipt and was denied

export interface ServiceFeeBreakdown {
  serviceId: string;
  statutoryFee: number;           // Government application/statutory charge (e.g. ₹40)
  kioskServiceCharge: number;     // Mandated kiosk entry/operator charge (e.g. ₹50)
  printingCharge: number;         // Security paper certificate print charge (e.g. ₹10)
  otherAuthorizedCharges?: {
    name: string;
    amount: number;
    mandatory: boolean;
  }[];
  maxAuthorizedTotal: number;     // Ceiling payable by citizen (e.g. ₹100)
  currency: string;               // INR
  isComputerReceiptMandatory: boolean; // True for eMitra
  officialSourceDoc: string;      // e.g. "DoIT&C Rate Notification F1(23)/DoIT/Tech/11/Vol-V"
  sourceUrl: string;
  lastVerifiedAt: string;         // ISO date
  directApplicationUrl?: string;  // Self-apply URL (e.g. emitra.rajasthan.gov.in via SSO)
}

export type PaymentCheckStatus =
  | "MATCHES_VERIFIED_FEE"
  | "POSSIBLE_DISCREPANCY_REQUIRING_VERIFICATION"
  | "INSUFFICIENT_FEE_INFORMATION";

export interface PaymentCheckInput {
  serviceId: string;
  reportedAmount: number;
  receiptStatus: ReceiptStatus;
  paymentPurpose?: string;          // e.g. "Income Certificate application"
  operatorExplanation?: string;     // e.g. "Kiosk claimed ₹200 tatkal urgency fee"
  kioskIdOrLocation?: string;       // e.g. "Kiosk #RJ-JP-1049, Sanganer"
  paymentDate?: string;
}

export interface PaymentCheckResult {
  id: string;
  status: PaymentCheckStatus;
  serviceId: string;
  serviceName: string;
  reportedAmount: number;
  feeBreakdown: ServiceFeeBreakdown | null;
  maxAuthorizedTotal: number;
  unexplainedDifference: number; // max(0, reportedAmount - maxAuthorizedTotal)
  matchedAmount: number;
  receiptStatus: ReceiptStatus;
  missingEvidence: string[];
  findings: {
    title: string;
    description: string;
    severity: "info" | "warning" | "alert";
  }[];
  neutralExplanation: string;
  caveats: string[];
  directActionSteps: {
    demandReceiptScript: string;
    directOnlineApplicationGuide: string;
    grievanceChannel: {
      name: string;
      tollFree: string;
      portalUrl: string;
      nodalAuthority: string;
    };
    neutralComplaintDraft: string;
  };
  checkedAt: string;
}

