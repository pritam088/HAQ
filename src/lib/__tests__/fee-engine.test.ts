import { describe, it, expect } from "vitest";
import {
  checkPayment,
  validatePaymentInput,
  VERIFIED_FEE_SCHEDULES,
  type PaymentCheckInput,
} from "../fee-engine";

describe("HAQ Payment & Fee Verification Engine", () => {
  describe("Input Validation", () => {
    it("rejects missing serviceId", () => {
      const input = {
        serviceId: "",
        reportedAmount: 100,
        receiptStatus: "OFFICIAL_COMPUTER_RECEIPT",
      } as PaymentCheckInput;
      const errors = validatePaymentInput(input);
      expect(errors).toContain("Service selection is required.");
    });

    it("rejects negative payment amounts", () => {
      const input: PaymentCheckInput = {
        serviceId: "raj-income-cert-001",
        reportedAmount: -50,
        receiptStatus: "OFFICIAL_COMPUTER_RECEIPT",
      };
      const errors = validatePaymentInput(input);
      expect(errors).toContain("Payment amount cannot be negative.");
    });

    it("rejects unrealistically high payment amounts (> 50,000)", () => {
      const input: PaymentCheckInput = {
        serviceId: "raj-income-cert-001",
        reportedAmount: 75000,
        receiptStatus: "OFFICIAL_COMPUTER_RECEIPT",
      };
      const errors = validatePaymentInput(input);
      expect(errors.some((e) => e.includes("exceeds realistic"))).toBe(true);
    });

    it("accepts valid input", () => {
      const input: PaymentCheckInput = {
        serviceId: "raj-income-cert-001",
        reportedAmount: 100,
        receiptStatus: "OFFICIAL_COMPUTER_RECEIPT",
      };
      const errors = validatePaymentInput(input);
      expect(errors).toHaveLength(0);
    });
  });

  describe("Fee Verification Calculations", () => {
    it("correctly identifies a compliant payment matching verified rates", () => {
      const input: PaymentCheckInput = {
        serviceId: "raj-income-cert-001",
        reportedAmount: 100,
        receiptStatus: "OFFICIAL_COMPUTER_RECEIPT",
      };

      const result = checkPayment(input);
      expect(result.status).toBe("MATCHES_VERIFIED_FEE");
      expect(result.unexplainedDifference).toBe(0);
      expect(result.maxAuthorizedTotal).toBe(100);
      expect(result.matchedAmount).toBe(100);
      expect(result.missingEvidence).toHaveLength(0);
      expect(result.findings[0].severity).toBe("info");
      expect(result.findings[0].title).toContain("Compliant");
    });

    it("correctly calculates an overcharge discrepancy with missing receipt", () => {
      const input: PaymentCheckInput = {
        serviceId: "raj-income-cert-001",
        reportedAmount: 350,
        receiptStatus: "NO_RECEIPT_PROVIDED",
        operatorExplanation: "Urgent processing fee",
        kioskIdOrLocation: "Kiosk #RJ-JP-9041, Sanganer",
      };

      const result = checkPayment(input);
      expect(result.status).toBe("POSSIBLE_DISCREPANCY_REQUIRING_VERIFICATION");
      expect(result.unexplainedDifference).toBe(250);
      expect(result.maxAuthorizedTotal).toBe(100);
      expect(result.matchedAmount).toBe(100);
      expect(result.missingEvidence.length).toBeGreaterThan(0);
      expect(result.missingEvidence[0]).toContain("Form 33");

      // Verify findings have alerts
      const alertFindings = result.findings.filter((f) => f.severity === "alert");
      expect(alertFindings.length).toBeGreaterThanOrEqual(1);

      // Verify neutral explanation cites DoIT&C
      expect(result.neutralExplanation).toContain("DoIT&C");
      expect(result.neutralExplanation).toContain("₹250");

      // Verify direct action steps exist
      expect(result.directActionSteps.demandReceiptScript).toContain("फॉर्म 33");
      expect(result.directActionSteps.directOnlineApplicationGuide).toContain("sso.rajasthan.gov.in");
      expect(result.directActionSteps.neutralComplaintDraft).toContain("Rajasthan Sampark");
      expect(result.directActionSteps.neutralComplaintDraft).toContain("₹350");
      expect(result.directActionSteps.neutralComplaintDraft).toContain("₹250");
    });

    it("handles handwritten slip warning", () => {
      const input: PaymentCheckInput = {
        serviceId: "raj-caste-cert-001",
        reportedAmount: 100,
        receiptStatus: "HANDWRITTEN_SLIP",
      };

      const result = checkPayment(input);
      // Fee amount matches, but receipt format has warning
      expect(result.status).toBe("MATCHES_VERIFIED_FEE");
      expect(result.unexplainedDifference).toBe(0);
      const warningFinding = result.findings.find((f) => f.title.includes("Handwritten") || f.title.includes("Non-Standard"));
      expect(warningFinding).toBeDefined();
    });

    it("handles receipt refusal alert", () => {
      const input: PaymentCheckInput = {
        serviceId: "raj-domicile-cert-001",
        reportedAmount: 200,
        receiptStatus: "RECEIPT_REFUSED",
      };

      const result = checkPayment(input);
      expect(result.status).toBe("POSSIBLE_DISCREPANCY_REQUIRING_VERIFICATION");
      expect(result.unexplainedDifference).toBe(100);
      const refusalFinding = result.findings.find((f) => f.title.includes("Refusal"));
      expect(refusalFinding).toBeDefined();
      expect(refusalFinding?.severity).toBe("alert");
    });

    it("handles unknown service with INSUFFICIENT_FEE_INFORMATION", () => {
      const input: PaymentCheckInput = {
        serviceId: "unknown-service-999",
        reportedAmount: 150,
        receiptStatus: "NO_RECEIPT_PROVIDED",
      };

      const result = checkPayment(input);
      expect(result.status).toBe("INSUFFICIENT_FEE_INFORMATION");
      expect(result.feeBreakdown).toBeNull();
      expect(result.neutralExplanation).toContain("strict source grounding");
    });

    it("maintains neutral, non-accusatory tone in explanation and caveats", () => {
      const input: PaymentCheckInput = {
        serviceId: "raj-income-cert-001",
        reportedAmount: 500,
        receiptStatus: "NO_RECEIPT_PROVIDED",
      };

      const result = checkPayment(input);
      // Ensure explanation does NOT label operator as a thief or criminal
      expect(result.neutralExplanation).not.toMatch(/criminal|thief|scam|fraudulent person/i);
      // Ensure caveat mentions that third-party expenses (notary/affidavit) may exist
      expect(result.caveats.some((c) => c.includes("notary"))).toBe(true);
    });

    it("correctly evaluates Ration Card fee compliance (Max ₹100)", () => {
      const input: PaymentCheckInput = {
        serviceId: "raj-ration-card-001",
        reportedAmount: 250,
        receiptStatus: "HANDWRITTEN_SLIP",
      };

      const result = checkPayment(input);
      expect(result.status).toBe("POSSIBLE_DISCREPANCY_REQUIRING_VERIFICATION");
      expect(result.maxAuthorizedTotal).toBe(100);
      expect(result.unexplainedDifference).toBe(150);
    });

    it("correctly evaluates Jamabandi Land Record fee compliance (Max ₹50)", () => {
      const input: PaymentCheckInput = {
        serviceId: "raj-jamabandi-001",
        reportedAmount: 50,
        receiptStatus: "OFFICIAL_COMPUTER_RECEIPT",
      };

      const result = checkPayment(input);
      expect(result.status).toBe("MATCHES_VERIFIED_FEE");
      expect(result.maxAuthorizedTotal).toBe(50);
      expect(result.unexplainedDifference).toBe(0);
    });
  });
});
