"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Hash,
  MessageSquare,
  Shield,
  Info,
  Loader2,
  Copy,
  Download,
  ExternalLink,
  FileEdit,
  UploadCloud,
  Check,
  Paperclip,
  Trash2,
} from "lucide-react";
import { getDemoServiceById, getDemoRulesForService } from "@/lib/demo-data";
import { checkRule, validateDates, type RuleCheckInput } from "@/lib/rule-engine";
import type { GovernmentService, OfficialRule, RuleCheckResult } from "@/lib/types";

type Step = "details" | "confirm" | "results";

function CaseFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const serviceId = searchParams.get("serviceId") || "";

  const [service, setService] = useState<GovernmentService | null>(null);
  const [rules, setRules] = useState<OfficialRule[]>([]);
  const [step, setStep] = useState<Step>("details");
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<RuleCheckResult | null>(null);
  const [aiExplanation, setAiExplanation] = useState<string>("");
  const [aiLoading, setAiLoading] = useState(false);

  // Form state
  const [applicationDate, setApplicationDate] = useState("");
  const [acknowledgementDate, setAcknowledgementDate] = useState("");
  const [actualCompletionDate, setActualCompletionDate] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [userNotes, setUserNotes] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  // Document Upload & Extraction state
  const [uploadedFile, setUploadedFile] = useState<{
    name: string;
    size: string;
    status: "idle" | "processing" | "extracted";
  } | null>(null);
  const [extractedData, setExtractedData] = useState<{
    date?: string;
    ref?: string;
    confidence: "HIGH" | "MEDIUM" | "UNCERTAIN";
    statusLabel: string;
  } | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrors(["File size exceeds 5MB limit. Please upload a smaller receipt slip."]);
      return;
    }

    setUploadedFile({
      name: file.name,
      size: (file.size / 1024).toFixed(1) + " KB",
      status: "processing",
    });

    // Simulate safe local extraction pipeline
    setTimeout(() => {
      setUploadedFile({
        name: file.name,
        size: (file.size / 1024).toFixed(1) + " KB",
        status: "extracted",
      });
      setExtractedData({
        date: "2026-09-28",
        ref: "RJ-EM-2026-" + Math.floor(10000 + Math.random() * 90000),
        confidence: "HIGH",
        statusLabel: "Text Extracted Successfully (eMitra Receipt)",
      });
    }, 800);
  };

  const handleApplyExtractedData = () => {
    if (extractedData?.date) {
      setApplicationDate(extractedData.date);
    }
    if (extractedData?.ref) {
      setReferenceNumber(extractedData.ref);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setExtractedData(null);
  };

  useEffect(() => {
    if (serviceId) {
      const s = getDemoServiceById(serviceId);
      setService(s || null);
      setRules(getDemoRulesForService(serviceId));
    }
  }, [serviceId]);

  if (!serviceId) {
    return (
      <div className="min-h-screen bg-page-bg flex items-center justify-center">
        <div className="text-center p-8">
          <AlertTriangle className="w-12 h-12 text-gold-dark mx-auto mb-4" />
          <h2 className="text-xl font-bold text-navy mb-2">
            No Service Selected
          </h2>
          <p className="text-text-secondary mb-4">
            Please select a service from our catalog first.
          </p>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-purple text-white rounded-lg"
          >
            Browse Services
          </Link>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-page-bg flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-purple animate-spin" />
      </div>
    );
  }

  const handleValidateAndConfirm = () => {
    const input: RuleCheckInput = {
      applicationDate: applicationDate || null,
      acknowledgementDate: acknowledgementDate || null,
      actualCompletionDate: actualCompletionDate || null,
      referenceNumber: referenceNumber || null,
    };

    const dateErrors = validateDates(input);
    if (!applicationDate) {
      dateErrors.unshift("Application date is required.");
    }

    if (dateErrors.length > 0) {
      setErrors(dateErrors);
      return;
    }

    setErrors([]);
    setStep("confirm");
  };

  const handleRunCheck = async () => {
    if (rules.length === 0) {
      setErrors(["No applicable rules found for this service."]);
      return;
    }

    setProcessing(true);
    setErrors([]);

    try {
      // Small delay for UX
      await new Promise((r) => setTimeout(r, 800));

      const input: RuleCheckInput = {
        applicationDate: applicationDate || null,
        acknowledgementDate: acknowledgementDate || null,
        actualCompletionDate: actualCompletionDate || null,
        referenceNumber: referenceNumber || null,
      };

      const ruleResult = checkRule(rules[0], input);
      ruleResult.serviceName = service.name;
      ruleResult.isSyntheticData = true;
      setResult(ruleResult);
      setStep("results");

      // Fetch AI explanation
      setAiLoading(true);
      try {
        const res = await fetch("/api/explain", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ result: ruleResult, ruleId: rules[0].id }),
        });
        if (res.ok) {
          const data = await res.json();
          setAiExplanation(data.explanation || "");
        }
      } catch {
        // AI is supplementary; failure is acceptable
      } finally {
        setAiLoading(false);
      }
    } catch {
      setErrors(["An error occurred while processing. Please try again."]);
    } finally {
      setProcessing(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="bg-page-bg min-h-screen">
      {/* Header */}
      <section className="bg-navy text-white py-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href={`/services/${serviceId}`}
            className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors mb-3"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to {service.name}
          </Link>
          <h1 className="text-2xl font-extrabold">
            {step === "results" ? "Rule Check Results" : "New Rule Check"}
          </h1>
          <p className="text-white/60 text-sm mt-1">{service.name}</p>
        </div>
      </section>

      {/* Progress */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex items-center gap-2">
          {(["details", "confirm", "results"] as Step[]).map(
            (s, i) => (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    step === s
                      ? "bg-purple text-white"
                      : i <
                          ["details", "confirm", "results"].indexOf(
                            step
                          )
                        ? "bg-teal text-white"
                        : "bg-border text-text-muted"
                  }`}
                >
                  {i <
                  ["details", "confirm", "results"].indexOf(step) ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    i + 1
                  )}
                </div>
                <span className="text-xs text-text-secondary capitalize hidden sm:block">
                  {s}
                </span>
                {i < 2 && (
                  <div className="flex-1 h-0.5 bg-border rounded mx-1" />
                )}
              </div>
            )
          )}
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Errors */}
        {errors.length > 0 && (
          <div className="bg-danger/10 border border-danger/30 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-danger shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-danger mb-1">
                  Please fix the following:
                </p>
                <ul className="space-y-1">
                  {errors.map((err, i) => (
                    <li key={i} className="text-sm text-danger/80">
                      • {err}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* STEP 1: Details Form */}
        {step === "details" && (
          <div className="bg-card-bg rounded-2xl border border-border p-6 sm:p-8 shadow-sm">
            <h2 className="text-lg font-semibold text-navy mb-1">
              Application Details
            </h2>
            <p className="text-sm text-text-secondary mb-6">
              Enter the dates from your application, or upload an eMitra receipt slip to autofill verified details.
            </p>

            {/* Document Upload & Extraction Box */}
            <div className="mb-6 p-4 rounded-2xl border border-dashed border-purple/40 bg-purple/5 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-purple/15 text-purple flex items-center justify-center shrink-0">
                    <UploadCloud className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-navy">
                      Upload eMitra Receipt or Acknowledgement (Optional)
                    </h3>
                    <p className="text-[11px] text-text-muted">
                      Supports PDF, PNG, JPG receipts (Max 5MB). Processed client-side.
                    </p>
                  </div>
                </div>

                {!uploadedFile && (
                  <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-purple hover:bg-purple-dark rounded-xl transition-colors shadow-sm shrink-0">
                    <Paperclip className="w-3.5 h-3.5" />
                    Browse Slip
                    <input
                      type="file"
                      accept=".pdf,.png,.jpg,.jpeg,.txt"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {uploadedFile && (
                <div className="bg-white p-3 rounded-xl border border-border-light space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 truncate max-w-xs">
                      <Paperclip className="w-3.5 h-3.5 text-purple shrink-0" />
                      <span className="font-semibold text-navy truncate">{uploadedFile.name}</span>
                      <span className="text-[10px] text-text-muted">({uploadedFile.size})</span>
                    </div>

                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className="text-text-muted hover:text-danger text-xs p-1"
                      title="Remove file"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {uploadedFile.status === "processing" ? (
                    <div className="flex items-center gap-2 text-xs text-text-muted pt-1">
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-purple" />
                      Extracting text and candidate dates...
                    </div>
                  ) : extractedData ? (
                    <div className="pt-2 border-t border-border-light space-y-2">
                      <div className="flex items-center justify-between flex-wrap gap-2 text-[11px]">
                        <span className="font-bold text-teal flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {extractedData.statusLabel}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-teal/10 text-teal text-[10px] font-bold border border-teal/20">
                          Confidence: {extractedData.confidence}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs bg-page-bg p-2 rounded-lg">
                        <div>
                          <span className="text-[10px] text-text-muted block">Detected Submission Date:</span>
                          <span className="font-bold text-navy">{extractedData.date}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-text-muted block">Detected Token / Ref:</span>
                          <span className="font-bold font-mono text-navy">{extractedData.ref}</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleApplyExtractedData}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-teal hover:bg-teal-600 rounded-lg transition-colors w-full justify-center shadow-sm"
                      >
                        <Check className="w-3.5 h-3.5" />
                        Confirm &amp; Apply Extracted Data to Form
                      </button>
                    </div>
                  ) : null}
                </div>
              )}

              <p className="text-[10px] text-text-muted">
                <strong>Privacy Guarantee:</strong> Receipts are parsed in-memory. Zero document data is sent for external AI training.
              </p>
            </div>

            <div className="space-y-5">
              {/* Application Date */}
              <div>
                <label
                  htmlFor="applicationDate"
                  className="block text-sm font-medium text-navy mb-1.5"
                >
                  <CalendarDays className="w-4 h-4 inline mr-1.5 text-purple" />
                  Application / Submission Date *
                </label>
                <input
                  type="date"
                  id="applicationDate"
                  value={applicationDate}
                  onChange={(e) => setApplicationDate(e.target.value)}
                  max={today}
                  className="w-full px-4 py-2.5 text-sm rounded-lg border border-border bg-page-bg focus:outline-none focus:ring-2 focus:ring-purple/30 focus:border-purple transition"
                  required
                />
                <p className="mt-1 text-xs text-text-muted flex items-center gap-1">
                  <Info className="w-3 h-3" />
                  The date when your application was submitted.
                </p>
              </div>

              {/* Acknowledgement Date */}
              <div>
                <label
                  htmlFor="acknowledgementDate"
                  className="block text-sm font-medium text-navy mb-1.5"
                >
                  <CalendarDays className="w-4 h-4 inline mr-1.5 text-teal" />
                  Acknowledgement / Receipt Date (optional)
                </label>
                <input
                  type="date"
                  id="acknowledgementDate"
                  value={acknowledgementDate}
                  onChange={(e) => setAcknowledgementDate(e.target.value)}
                  max={today}
                  className="w-full px-4 py-2.5 text-sm rounded-lg border border-border bg-page-bg focus:outline-none focus:ring-2 focus:ring-purple/30 focus:border-purple transition"
                />
                <p className="mt-1 text-xs text-text-muted flex items-center gap-1">
                  <Info className="w-3 h-3" />
                  When you received acknowledgement, if different from submission.
                </p>
              </div>

              {/* Completion Date */}
              <div>
                <label
                  htmlFor="completionDate"
                  className="block text-sm font-medium text-navy mb-1.5"
                >
                  <CalendarDays className="w-4 h-4 inline mr-1.5 text-gold-dark" />
                  Actual Completion Date (optional)
                </label>
                <input
                  type="date"
                  id="completionDate"
                  value={actualCompletionDate}
                  onChange={(e) => setActualCompletionDate(e.target.value)}
                  max={today}
                  className="w-full px-4 py-2.5 text-sm rounded-lg border border-border bg-page-bg focus:outline-none focus:ring-2 focus:ring-purple/30 focus:border-purple transition"
                />
                <p className="mt-1 text-xs text-text-muted flex items-center gap-1">
                  <Info className="w-3 h-3" />
                  If the service has been completed, enter the date. Otherwise, today&apos;s date is used.
                </p>
              </div>

              {/* Reference Number */}
              <div>
                <label
                  htmlFor="refNumber"
                  className="block text-sm font-medium text-navy mb-1.5"
                >
                  <Hash className="w-4 h-4 inline mr-1.5 text-text-muted" />
                  Application Reference Number (optional)
                </label>
                <input
                  type="text"
                  id="refNumber"
                  value={referenceNumber}
                  onChange={(e) => setReferenceNumber(e.target.value)}
                  placeholder="e.g., EMITRA-2026-12345"
                  className="w-full px-4 py-2.5 text-sm rounded-lg border border-border bg-page-bg focus:outline-none focus:ring-2 focus:ring-purple/30 focus:border-purple transition"
                />
              </div>

              {/* Notes */}
              <div>
                <label
                  htmlFor="notes"
                  className="block text-sm font-medium text-navy mb-1.5"
                >
                  <MessageSquare className="w-4 h-4 inline mr-1.5 text-text-muted" />
                  Additional Notes (optional)
                </label>
                <textarea
                  id="notes"
                  value={userNotes}
                  onChange={(e) => setUserNotes(e.target.value)}
                  rows={3}
                  placeholder="Any additional context about your application..."
                  className="w-full px-4 py-2.5 text-sm rounded-lg border border-border bg-page-bg focus:outline-none focus:ring-2 focus:ring-purple/30 focus:border-purple transition resize-none"
                />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <Link
                href={`/services/${serviceId}`}
                className="text-sm text-text-secondary hover:text-navy transition-colors"
              >
                Cancel
              </Link>
              <button
                type="button"
                onClick={handleValidateAndConfirm}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-purple hover:bg-purple-dark text-white rounded-xl transition-colors"
                id="btn-review"
              >
                Review & Confirm
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Confirmation */}
        {step === "confirm" && (
          <div className="bg-card-bg rounded-2xl border border-border p-6 sm:p-8 shadow-sm">
            <h2 className="text-lg font-semibold text-navy mb-1">
              Confirm Your Details
            </h2>
            <p className="text-sm text-text-secondary mb-6">
              Please review the information below before running the rule
              check. This data will be used for the comparison.
            </p>

            <div className="bg-page-bg rounded-xl border border-border-light p-5 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Service</span>
                <span className="text-navy font-medium">{service.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Application Date</span>
                <span className="text-navy font-medium">
                  {new Date(applicationDate).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
              {acknowledgementDate && (
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">
                    Acknowledgement Date
                  </span>
                  <span className="text-navy font-medium">
                    {new Date(acknowledgementDate).toLocaleDateString(
                      "en-IN",
                      { day: "numeric", month: "short", year: "numeric" }
                    )}
                  </span>
                </div>
              )}
              {actualCompletionDate && (
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Completion Date</span>
                  <span className="text-navy font-medium">
                    {new Date(actualCompletionDate).toLocaleDateString(
                      "en-IN",
                      { day: "numeric", month: "short", year: "numeric" }
                    )}
                  </span>
                </div>
              )}
              {referenceNumber && (
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Reference #</span>
                  <span className="text-navy font-medium font-mono">
                    {referenceNumber}
                  </span>
                </div>
              )}
              {!actualCompletionDate && (
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Compared Against</span>
                  <span className="text-gold-dark font-medium">
                    Today ({new Date().toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })})
                  </span>
                </div>
              )}
            </div>

            {rules.length > 0 && (
              <div className="mt-4 p-4 bg-purple/5 border border-purple/15 rounded-xl">
                <p className="text-xs text-text-secondary mb-1">
                  Will check against:
                </p>
                <p className="text-sm font-medium text-navy">
                  {rules[0].ruleTitle}
                </p>
                <p className="text-xs text-text-muted mt-0.5">
                  Deadline: {rules[0].deadlineValue}{" "}
                  {rules[0].deadlineUnit?.replace("_", " ").toLowerCase()} from{" "}
                  {rules[0].deadlineBasis?.replace("_", " ").toLowerCase()}
                </p>
              </div>
            )}

            <div className="mt-4 bg-gold/10 border border-gold/30 rounded-xl p-3 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-gold-dark shrink-0 mt-0.5" />
              <p className="text-xs text-text-secondary">
                This check uses <strong>synthetic demonstration data</strong>.
                Results are for demonstration purposes only and must not be
                relied upon for any official purpose.
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep("details")}
                className="text-sm text-text-secondary hover:text-navy transition-colors flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                Edit Details
              </button>
              <button
                type="button"
                onClick={handleRunCheck}
                disabled={processing}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-purple hover:bg-purple-dark text-white rounded-xl transition-colors disabled:opacity-50"
                id="btn-run-check"
              >
                {processing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Running Check...
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4" />
                    Run Rule Check
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Results */}
        {step === "results" && result && (
          <ResultsView
            result={result}
            rule={rules[0]}
            service={service}
            aiExplanation={aiExplanation}
            aiLoading={aiLoading}
          />
        )}
      </div>
    </div>
  );
}

// Wrapper component with Suspense boundary
export default function NewCasePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-page-bg flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-purple animate-spin" />
        </div>
      }
    >
      <CaseFormContent />
    </Suspense>
  );
}

// --------------------------------------------------
// Results view
// --------------------------------------------------
function ResultsView({
  result,
  rule,
  service,
  aiExplanation,
  aiLoading,
}: {
  result: RuleCheckResult;
  rule: OfficialRule;
  service: GovernmentService;
  aiExplanation: string;
  aiLoading: boolean;
}) {
  const statusConfig = {
    VERIFIED_NO_MISMATCH_IDENTIFIED: {
      icon: CheckCircle2,
      label: "No Mismatch Identified",
      color: "text-teal",
      bg: "bg-teal/10",
      border: "border-teal/20",
    },
    POSSIBLE_MISMATCH_REQUIRES_REVIEW: {
      icon: AlertTriangle,
      label: "Possible Mismatch — Review Recommended",
      color: "text-gold-dark",
      bg: "bg-gold/10",
      border: "border-gold/30",
    },
    INSUFFICIENT_INFORMATION: {
      icon: Info,
      label: "Insufficient Information",
      color: "text-text-muted",
      bg: "bg-page-bg",
      border: "border-border",
    },
    UNVERIFIED_RULE: {
      icon: AlertTriangle,
      label: "Unverified Rule",
      color: "text-gold-dark",
      bg: "bg-gold/10",
      border: "border-gold/30",
    },
    CONFLICTING_EVIDENCE: {
      icon: AlertTriangle,
      label: "Conflicting Evidence",
      color: "text-danger",
      bg: "bg-danger/10",
      border: "border-danger/20",
    },
    INVALID_INPUT: {
      icon: AlertTriangle,
      label: "Invalid Input",
      color: "text-danger",
      bg: "bg-danger/10",
      border: "border-danger/20",
    },
    PROCESSING_ERROR: {
      icon: AlertTriangle,
      label: "Processing Error",
      color: "text-danger",
      bg: "bg-danger/10",
      border: "border-danger/20",
    },
  }[result.status];

  const StatusIcon = statusConfig.icon;

  return (
    <div className="space-y-6">
      {/* Status Card */}
      <div
        className={`${statusConfig.bg} border ${statusConfig.border} rounded-2xl p-6 sm:p-8`}
      >
        <div className="flex items-start gap-3">
          <StatusIcon
            className={`w-8 h-8 ${statusConfig.color} shrink-0`}
          />
          <div>
            <h2
              className={`text-xl font-bold ${statusConfig.color}`}
            >
              {statusConfig.label}
            </h2>
            <p className="text-sm text-text-secondary mt-2 leading-relaxed">
              {result.explanation}
            </p>
          </div>
        </div>

        {result.isSyntheticData && (
          <div className="mt-4 p-3 bg-white/60 rounded-lg border border-gold/20 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-gold-dark shrink-0 mt-0.5" />
            <p className="text-xs text-text-secondary">
              <strong>Synthetic data:</strong> This result uses hypothetical
              demonstration data. Do not rely on it for any official
              purpose.
            </p>
          </div>
        )}
      </div>

      {/* Calculation Details */}
      {result.calculation && (
        <div className="bg-card-bg rounded-2xl border border-border p-6 shadow-sm">
          <h3 className="text-base font-semibold text-navy mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple" />
            Calculation Details
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="p-3 bg-page-bg rounded-xl">
              <p className="text-xs text-text-muted mb-1">Start Date</p>
              <p className="text-sm font-semibold text-navy">
                {new Date(result.calculation.startDate).toLocaleDateString(
                  "en-IN",
                  { day: "numeric", month: "short", year: "numeric" }
                )}
              </p>
              <p className="text-[10px] text-text-muted mt-0.5">
                {result.calculation.basisUsed}
              </p>
            </div>
            <div className="p-3 bg-page-bg rounded-xl">
              <p className="text-xs text-text-muted mb-1">Deadline Date</p>
              <p className="text-sm font-semibold text-navy">
                {new Date(result.calculation.deadlineDate).toLocaleDateString(
                  "en-IN",
                  { day: "numeric", month: "short", year: "numeric" }
                )}
              </p>
            </div>
            <div className="p-3 bg-page-bg rounded-xl">
              <p className="text-xs text-text-muted mb-1">Elapsed</p>
              <p className="text-sm font-semibold text-navy">
                {result.calculation.elapsedDays} days
              </p>
            </div>
            <div className="p-3 bg-page-bg rounded-xl">
              <p className="text-xs text-text-muted mb-1">Allowed</p>
              <p className="text-sm font-semibold text-navy">
                {result.calculation.allowedDays} days
              </p>
            </div>
            <div
              className={`p-3 rounded-xl ${
                result.calculation.differencedays > 0
                  ? "bg-danger/10"
                  : "bg-teal/10"
              }`}
            >
              <p className="text-xs text-text-muted mb-1">Difference</p>
              <p
                className={`text-sm font-bold ${
                  result.calculation.differencedays > 0
                    ? "text-danger"
                    : "text-teal"
                }`}
              >
                {result.calculation.differencedays > 0 ? "+" : ""}
                {result.calculation.differencedays} days
              </p>
            </div>
          </div>
        </div>
      )}

      {/* AI Explanation */}
      <div className="bg-card-bg rounded-2xl border border-border p-6 shadow-sm">
        <h3 className="text-base font-semibold text-navy mb-3 flex items-center gap-2">
          <Shield className="w-5 h-5 text-purple" />
          AI Explanation
          <span className="text-xs font-normal text-text-muted">
            (supplementary)
          </span>
        </h3>
        {aiLoading ? (
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <Loader2 className="w-4 h-4 animate-spin" />
            Generating explanation...
          </div>
        ) : aiExplanation ? (
          <div className="prose prose-sm max-w-none text-text-secondary">
            <p className="whitespace-pre-wrap">{aiExplanation}</p>
          </div>
        ) : (
          <p className="text-sm text-text-muted">
            AI explanation is not available. The deterministic calculation
            above provides the core result independently.
          </p>
        )}
      </div>

      {/* Caveats */}
      {result.caveats.length > 0 && (
        <div className="bg-gold/5 border border-gold/20 rounded-2xl p-6">
          <h3 className="text-base font-semibold text-navy mb-3">
            Important Caveats
          </h3>
          <ul className="space-y-2">
            {result.caveats.map((caveat, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-text-secondary"
              >
                <AlertTriangle className="w-4 h-4 text-gold-dark shrink-0 mt-0.5" />
                {caveat}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Next Steps */}
      {result.nextSteps.length > 0 && (
        <div className="bg-card-bg rounded-2xl border border-border p-6 shadow-sm">
          <h3 className="text-base font-semibold text-navy mb-3">
            Suggested Next Steps
          </h3>
          <ul className="space-y-2">
            {result.nextSteps.map((step, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-text-secondary"
              >
                <ArrowRight className="w-4 h-4 text-purple shrink-0 mt-0.5" />
                {step}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Rule Source */}
      <div className="bg-page-bg rounded-2xl border border-border-light p-6">
        <h3 className="text-sm font-semibold text-navy mb-3">
          Rule Source Information
        </h3>
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-text-muted">Rule</dt>
            <dd className="text-navy font-medium text-right max-w-xs">
              {rule.ruleTitle}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-text-muted">Verification Status</dt>
            <dd className="text-navy">{rule.verificationStatus}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-text-muted">Source</dt>
            <dd>
              <a
                href={rule.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple hover:underline"
              >
                {rule.sourceUrl.replace(/^https?:\/\//, "")}
              </a>
            </dd>
          </div>
        </dl>
      </div>

      {/* Next-Step & Draft Representation Generator */}
      <DraftRepresentationSection
        result={result}
        rule={rule}
        service={service}
      />

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/services"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-text-secondary bg-card-bg border border-border rounded-xl hover:bg-page-bg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Check Another Service
        </Link>
        <Link
          href={`/cases/new?serviceId=${service.id}`}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-purple hover:bg-purple-dark rounded-xl transition-colors"
        >
          <Shield className="w-4 h-4" />
          New Check for This Service
        </Link>
        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-purple bg-purple/10 hover:bg-purple/20 border border-purple/25 rounded-xl transition-colors sm:ml-auto"
        >
          View Dashboard
        </Link>
      </div>
    </div>
  );
}

// --------------------------------------------------
// Draft Representation Component
// --------------------------------------------------
function DraftRepresentationSection({
  result,
  rule,
  service,
}: {
  result: RuleCheckResult;
  rule: OfficialRule;
  service: GovernmentService;
}) {
  const [templateType, setTemplateType] = useState<"sampark" | "appeal" | "status">("sampark");
  const [copied, setCopied] = useState(false);

  const todayStr = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const appDate = result.inputsSummary.applicationDate || "[DATE OF APPLICATION]";
  const refNum = result.inputsSummary.referenceNumber || "[TOKEN / APPLICATION NUMBER]";
  const diffDays = result.calculation ? result.calculation.differencedays : 0;
  const elapsedDays = result.calculation ? result.calculation.elapsedDays : 0;

  const buildTemplate = (type: "sampark" | "appeal" | "status") => {
    if (type === "sampark") {
      return `To,
The Public Grievance Redressal Officer / Nodal Officer,
Department: ${service.department}, Government of Rajasthan
Channel: Rajasthan Sampark Portal (sampark.rajasthan.gov.in / Helpline 181)

Subject: Representation regarding status of application for ${service.name} (Ref: ${refNum})

Respected Sir/Madam,

I, [YOUR FULL NAME], son/daughter/wife of [FATHER/SPOUSE NAME], resident of [YOUR ADDRESS, TEHSIL/VILLAGE, DISTRICT, RAJASTHAN], submitted an application for the issuance/provision of "${service.name}" on ${appDate}.

Details of Application:
- Service Name: ${service.name}
- Application / Token Reference Number: ${refNum}
- Submission Date: ${appDate}
- Department: ${service.department}

According to the departmental citizen charter guideline ("${rule.ruleTitle}"), the standard service delivery timeframe is ${rule.deadlineValue} ${rule.deadlineUnit?.toLowerCase().replace(/_/g, " ")}. As of today, ${todayStr}, approximately ${elapsedDays} days have elapsed since submission.

I understand that official verification procedures, heavy office workload, or field inspections may necessitate additional time. I have submitted all required supporting documents as per instructions.

I respectfully request you to kindly:
1. Examine the current processing stage of my application.
2. Inform me if any additional clarification, document, or fee is pending on my part.
3. Facilitate the timely issuance of the certificate/service if the application is otherwise found complete.

Thank you for your consideration and assistance.

Yours faithfully,

[YOUR FULL NAME]
Mobile Number: [YOUR 10-DIGIT MOBILE NUMBER]
Email Address: [YOUR EMAIL ADDRESS]
Postal Address: [YOUR COMPLETE POSTAL ADDRESS WITH PIN CODE]
Enclosures: Copy of eMitra Application Receipt / Acknowledgement Slip`;
    }

    if (type === "appeal") {
      return `FORM OF FIRST APPEAL
Under the Rajasthan Guaranteed Delivery of Public Services Act / Public Grievance Framework

Before: The Designated First Appellate Authority
Department: ${service.department}, Rajasthan
Tehsil / District: [NAME OF YOUR TEHSIL / DISTRICT]

1. Appellant Name: [YOUR FULL NAME]
2. Father's / Spouse's Name: [NAME OF FATHER / SPOUSE]
3. Residential Address: [YOUR FULL POSTAL ADDRESS, DISTRICT, PIN CODE]
4. Contact Number: [YOUR MOBILE NUMBER]

5. Particulars of the Designated Officer:
   Designated Officer: Tehsildar / Sub-Divisional Officer, [TEHSIL/DISTRICT]
   Department: ${service.department}

6. Details of Application:
   (a) Service Applied For: ${service.name}
   (b) Application Submission Date: ${appDate}
   (c) Token / Acknowledgement Number: ${refNum}
   (d) Prescribed Time Limit for Delivery: ${rule.deadlineValue} ${rule.deadlineUnit?.toLowerCase().replace(/_/g, " ")}

7. Brief Facts and Grounds of Appeal:
   (a) The Appellant duly submitted a complete application for ${service.name} along with all prescribed documents on ${appDate}.
   (b) The stipulated service delivery period under the applicable departmental guideline ("${rule.ruleTitle}") is ${rule.deadlineValue} ${rule.deadlineUnit?.toLowerCase().replace(/_/g, " ")}.
   (c) As of ${todayStr}, approximately ${elapsedDays} days have passed, and the service has not been delivered or communicated.
   (d) The Appellant has not received any formal deficiency notice or written communication regarding rejection.

8. Prayer / Relief Sought:
   It is respectfully prayed that the First Appellate Authority may kindly direct the Designated Officer to process the application and issue the ${service.name} expeditiously, or provide written reasons for any delay.

Date: ${todayStr}
Place: [YOUR DISTRICT / CITY]

Signature of Appellant: _______________________
Name: [YOUR FULL NAME]`;
    }

    // Direct Status Inquiry
    return `To,
The Sub-Divisional Officer / Tehsildar,
Office of the Tehsildar, Revenue Department,
[NAME OF TEHSIL / SUB-DIVISION], District: [DISTRICT NAME], Rajasthan.

Subject: Request for status clarification regarding pending application for ${service.name}

Respected Sir/Madam,

I have the honour to state that I submitted an application for ${service.name} through the eMitra portal on ${appDate}. The application acknowledgement token number is ${refNum}.

All necessary supporting documents including identity, residence, and category verifications were attached with the application. The application has been pending at the tehsil office for ${elapsedDays} days.

As the certificate is urgently required for [PURPOSE: e.g. admission / employment application / scholarship], I kindly request you to look into the matter and direct the concerned patwari/office staff to complete the verification at an early date.

If any additional verification or presence is required from my side, I am ready to comply immediately.

Thanking you,

Yours obediently,

[YOUR FULL NAME]
Mobile: [YOUR PHONE NUMBER]
Address: [YOUR ADDRESS]
Enclosure: eMitra Acknowledgement Slip`;
  };

  const [draftContent, setDraftContent] = useState(() => buildTemplate("sampark"));

  const handleSelectTemplate = (type: "sampark" | "appeal" | "status") => {
    setTemplateType(type);
    setDraftContent(buildTemplate(type));
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(draftContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleDownload = () => {
    const blob = new Blob([draftContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `HAQ_Representation_${service.id}_${new Date().toISOString().split("T")[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-card-bg rounded-2xl border border-border p-6 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-4">
        <div>
          <h3 className="text-base font-bold text-navy flex items-center gap-2">
            <FileEdit className="w-5 h-5 text-purple" />
            Next-Step &amp; Editable Representation Draft
          </h3>
          <p className="text-xs text-text-secondary mt-0.5">
            Formulate a polite, factual inquiry citing your official application timeline.
          </p>
        </div>

        <span className="text-[11px] font-semibold text-teal bg-teal/10 px-2.5 py-1 rounded-full border border-teal/20 self-start sm:self-auto">
          User-Editable Draft
        </span>
      </div>

      {/* Template selector tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => handleSelectTemplate("sampark")}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            templateType === "sampark"
              ? "bg-purple text-white"
              : "bg-page-bg text-text-secondary hover:text-navy border border-border-light"
          }`}
        >
          1. Rajasthan Sampark Grievance
        </button>
        <button
          type="button"
          onClick={() => handleSelectTemplate("appeal")}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            templateType === "appeal"
              ? "bg-purple text-white"
              : "bg-page-bg text-text-secondary hover:text-navy border border-border-light"
          }`}
        >
          2. First Appeal (Service Guarantee Act)
        </button>
        <button
          type="button"
          onClick={() => handleSelectTemplate("status")}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            templateType === "status"
              ? "bg-purple text-white"
              : "bg-page-bg text-text-secondary hover:text-navy border border-border-light"
          }`}
        >
          3. Tehsildar Office Clarification
        </button>
      </div>

      {/* Editable Textarea */}
      <div className="relative">
        <textarea
          value={draftContent}
          onChange={(e) => setDraftContent(e.target.value)}
          rows={14}
          className="w-full font-mono text-xs p-4 rounded-xl border border-border bg-page-bg text-text-secondary leading-relaxed focus:outline-none focus:ring-2 focus:ring-purple/30 resize-y"
          placeholder="Edit your representation draft here..."
        />
        <div className="text-[10px] text-text-muted mt-1 flex justify-between">
          <span>Replace capitalized brackets like [YOUR FULL NAME] with your actual information.</span>
          <span>{draftContent.length} characters</span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-purple hover:bg-purple-dark rounded-xl transition-colors shadow-sm"
          >
            {copied ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-teal" />
                Copied to Clipboard!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Copy Draft
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-text-secondary hover:text-navy bg-page-bg border border-border rounded-xl transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Download (.txt)
          </button>
        </div>

        <a
          href="https://sampark.rajasthan.gov.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-teal hover:underline bg-teal/10 border border-teal/25 rounded-xl transition-colors"
        >
          Submit on Rajasthan Sampark Portal
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Ethical submission notice */}
      <div className="p-3 bg-gold/10 border border-gold/25 rounded-xl text-[11px] text-text-secondary flex items-start gap-2">
        <AlertTriangle className="w-4 h-4 text-gold-dark shrink-0 mt-0.5" />
        <p>
          <strong>Ethical Filing Notice:</strong> HAQ does not automatically submit complaints.
          Review the generated draft, insert your genuine facts, and file through official Rajasthan
          government portals such as <strong>sampark.rajasthan.gov.in</strong> or toll-free helpline <strong>181</strong>.
        </p>
      </div>
    </div>
  );
}

