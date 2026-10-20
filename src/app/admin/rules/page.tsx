"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  BookOpen,
  FileText,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Lock,
  Layers,
  Search,
  Scale,
  Calendar,
  Clock,
  ArrowRight,
  Play,
} from "lucide-react";
import { DEMO_RULES, DEMO_SERVICES } from "@/lib/demo-data";
import { checkRule, type RuleCheckInput } from "@/lib/rule-engine";
import type { OfficialRule, VerificationStatus } from "@/lib/types";

export default function AdminRulesPage() {
  const [rules, setRules] = useState<OfficialRule[]>(DEMO_RULES);
  const [selectedRuleId, setSelectedRuleId] = useState<string>(DEMO_RULES[0]?.id || "");
  const [searchTerm, setSearchTerm] = useState("");

  // Simulator state
  const [simAppDate, setSimAppDate] = useState("2026-09-20");
  const [simAckDate, setSimAckDate] = useState("2026-09-21");
  const [simResult, setSimResult] = useState<any>(null);

  // Reviewer audit checklist state
  const [auditChecks, setAuditChecks] = useState<Record<string, boolean>>({
    sourceAuthenticity: true,
    exactTextVerified: true,
    jurisdictionMatch: true,
    countingBasisConfirmed: true,
    exceptionsDocumented: false,
    firstAppealDesignated: true,
  });

  const selectedRule = rules.find((r) => r.id === selectedRuleId) || rules[0];
  const associatedService = DEMO_SERVICES.find((s) => s.id === selectedRule?.serviceId);

  const toggleAuditCheck = (key: string) => {
    setAuditChecks((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const allChecksPassed = Object.values(auditChecks).every(Boolean);

  const handleRunSimulator = () => {
    if (!selectedRule) return;
    const input: RuleCheckInput = {
      applicationDate: simAppDate,
      acknowledgementDate: simAckDate,
      actualCompletionDate: null,
      referenceNumber: "SIM-TEST-001",
    };
    const res = checkRule(selectedRule, input);
    setSimResult(res);
  };

  const handleUpdateStatus = (status: VerificationStatus) => {
    setRules((prev) =>
      prev.map((r) =>
        r.id === selectedRule.id
          ? {
              ...r,
              verificationStatus: status,
              verifiedBy: status === "VERIFIED" ? "Pritam Bairwa (Lead Reviewer)" : null,
              verifiedAt: status === "VERIFIED" ? new Date().toISOString() : null,
              updatedAt: new Date().toISOString(),
            }
          : r
      )
    );
  };

  return (
    <div className="bg-page-bg min-h-screen">
      {/* Header */}
      <section className="bg-navy text-white py-12 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal/15 border border-teal/30 text-xs font-semibold text-teal">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Reviewer Governance Portal
                </span>
                <span className="text-xs text-white/50">
                  Role: Authorized Rule Verifier (Demo Mode)
                </span>
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight">
                Official Rule Repository &amp; Review Hub
              </h1>
              <p className="text-sm text-white/60 mt-1">
                Audit statutory citations, verify deadline counting basis, and certify rule records before public release.
              </p>
            </div>

            <Link
              href="/sources"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white/80 hover:text-white bg-white/10 hover:bg-white/15 rounded-xl border border-white/15 transition-colors self-start md:self-auto"
            >
              <BookOpen className="w-4 h-4" />
              Public Sources View
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Rules List */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-card-bg rounded-2xl border border-border p-4 shadow-sm">
              <h3 className="font-bold text-navy text-sm mb-3">
                Cataloged Government Rules ({rules.length})
              </h3>

              <div className="space-y-2">
                {rules.map((rule) => {
                  const isSelected = rule.id === selectedRule?.id;
                  return (
                    <button
                      key={rule.id}
                      onClick={() => setSelectedRuleId(rule.id)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                        isSelected
                          ? "bg-purple/5 border-purple text-navy shadow-sm"
                          : "bg-page-bg border-border-light text-text-secondary hover:border-purple/30"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            rule.verificationStatus === "VERIFIED"
                              ? "bg-teal/15 text-teal border border-teal/30"
                              : "bg-gold/15 text-gold-dark border border-gold/30"
                          }`}
                        >
                          {rule.verificationStatus}
                        </span>
                        <span className="text-[10px] font-mono text-text-muted">
                          v{rule.ruleVersion}
                        </span>
                      </div>
                      <div className="text-xs font-bold leading-snug line-clamp-2">
                        {rule.ruleTitle}
                      </div>
                      <div className="text-[11px] text-text-muted mt-1">
                        {rule.department} • {rule.state}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Verification Principles Notice */}
            <div className="bg-card-bg rounded-2xl border border-border p-5 text-xs text-text-secondary space-y-2 shadow-sm">
              <h4 className="font-bold text-navy flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-purple" />
                Reviewer Rule Governance Policy
              </h4>
              <p>
                A rule cannot be marked &quot;VERIFIED&quot; based on general impressions. Reviewers must check
                the exact gazette or charter section, establish whether holidays pause the clock, and link
                an active government URL.
              </p>
            </div>
          </div>

          {/* Right: Selected Rule Inspector & Reviewer Tools */}
          <div className="lg:col-span-2 space-y-6">
            {selectedRule && (
              <>
                {/* Rule Metadata Detail Card */}
                <div className="bg-card-bg rounded-2xl border border-border p-6 shadow-sm space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-text-muted">
                          ID: {selectedRule.id}
                        </span>
                        <span className="text-xs text-text-muted">•</span>
                        <span className="text-xs font-semibold text-purple">
                          Service: {associatedService?.name}
                        </span>
                      </div>
                      <h2 className="text-xl font-bold text-navy">
                        {selectedRule.ruleTitle}
                      </h2>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full ${
                          selectedRule.verificationStatus === "VERIFIED"
                            ? "bg-teal/15 text-teal border border-teal/30"
                            : "bg-gold/15 text-gold-dark border border-gold/30"
                        }`}
                      >
                        {selectedRule.verificationStatus}
                      </span>
                    </div>
                  </div>

                  {/* Rule Text Extract */}
                  <div className="bg-page-bg rounded-xl p-4 border border-border-light">
                    <span className="text-xs font-bold text-navy block mb-1">
                      Statutory Rule Text Extract:
                    </span>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      {selectedRule.ruleText}
                    </p>
                  </div>

                  {/* Metadata Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="p-3 bg-page-bg rounded-xl border border-border-light">
                      <span className="text-[10px] text-text-muted uppercase font-bold block mb-0.5">
                        Time Limit
                      </span>
                      <span className="font-bold text-navy">
                        {selectedRule.deadlineValue} {selectedRule.deadlineUnit?.toLowerCase().replace("_", " ")}
                      </span>
                    </div>

                    <div className="p-3 bg-page-bg rounded-xl border border-border-light">
                      <span className="text-[10px] text-text-muted uppercase font-bold block mb-0.5">
                        Clock Basis
                      </span>
                      <span className="font-bold text-navy">
                        {selectedRule.deadlineBasis?.replace("_", " ")}
                      </span>
                    </div>

                    <div className="p-3 bg-page-bg rounded-xl border border-border-light">
                      <span className="text-[10px] text-text-muted uppercase font-bold block mb-0.5">
                        Statutory Fee
                      </span>
                      <span className="font-bold text-navy">
                        {selectedRule.feeCurrency} {selectedRule.feeValue}
                      </span>
                    </div>

                    <div className="p-3 bg-page-bg rounded-xl border border-border-light">
                      <span className="text-[10px] text-text-muted uppercase font-bold block mb-0.5">
                        Effective Period
                      </span>
                      <span className="font-bold text-navy">
                        {selectedRule.effectiveFrom} &rarr; {selectedRule.effectiveTo || "Present"}
                      </span>
                    </div>
                  </div>

                  {/* Source Citations */}
                  <div className="text-xs space-y-2 border-t border-border-light pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-text-muted font-medium">Source Document:</span>
                      <span className="text-navy font-semibold">{selectedRule.sourceType.replace(/_/g, " ")}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-text-muted font-medium">Source URL:</span>
                      <a
                        href={selectedRule.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple hover:underline inline-flex items-center gap-1 font-mono"
                      >
                        {selectedRule.sourceUrl}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    {selectedRule.appealInformation && (
                      <div className="pt-2 border-t border-border-light">
                        <span className="text-text-muted font-medium block mb-1">
                          Appellate / Redressal Information:
                        </span>
                        <p className="text-text-secondary bg-page-bg p-2.5 rounded-lg border border-border-light">
                          {selectedRule.appealInformation}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Reviewer Audit Checklist */}
                  <div className="bg-purple/5 border border-purple/20 rounded-xl p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-navy text-sm flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-purple" />
                        Statutory Verification Audit Checklist
                      </h4>
                      <span className="text-[11px] font-semibold text-purple">
                        {Object.values(auditChecks).filter(Boolean).length} of 6 Checks Verified
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                      {[
                        { key: "sourceAuthenticity", label: "Primary government domain authenticity verified" },
                        { key: "exactTextVerified", label: "Exact verbatim statutory text cited" },
                        { key: "jurisdictionMatch", label: "Rajasthan state department jurisdiction confirmed" },
                        { key: "countingBasisConfirmed", label: "Working days vs calendar days defined" },
                        { key: "exceptionsDocumented", label: "Document deficiency / enquiry clock pauses recorded" },
                        { key: "firstAppealDesignated", label: "Designated first appellate authority verified" },
                      ].map((item) => (
                        <label
                          key={item.key}
                          className="flex items-start gap-2 cursor-pointer p-2 rounded-lg hover:bg-white/60 transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={auditChecks[item.key] || false}
                            onChange={() => toggleAuditCheck(item.key)}
                            className="mt-0.5 rounded text-purple focus:ring-purple"
                          />
                          <span className="text-text-secondary leading-snug">
                            {item.label}
                          </span>
                        </label>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-purple/15 flex items-center justify-between flex-wrap gap-2">
                      <span className="text-[11px] text-text-muted">
                        Reviewer Sign-off: {selectedRule.verifiedBy || "Pending Review"}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleUpdateStatus("PENDING_REVIEW")}
                          className="px-3 py-1.5 text-xs font-semibold text-text-secondary hover:text-navy bg-white border border-border rounded-lg transition-colors"
                        >
                          Mark Pending Review
                        </button>
                        <button
                          onClick={() => handleUpdateStatus("VERIFIED")}
                          className={`px-3.5 py-1.5 text-xs font-bold text-white rounded-lg transition-colors shadow-sm ${
                            allChecksPassed
                              ? "bg-teal hover:bg-teal-600"
                              : "bg-purple hover:bg-purple-dark"
                          }`}
                        >
                          {allChecksPassed ? "Certify as VERIFIED" : "Certify Rule"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Interactive Rule Simulator */}
                <div className="bg-card-bg rounded-2xl border border-border p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-navy text-base flex items-center gap-2">
                        <Play className="w-4 h-4 text-purple" />
                        Rule Engine Simulator
                      </h3>
                      <p className="text-xs text-text-secondary mt-0.5">
                        Test date arithmetic and rule boundaries against this rule before publishing.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-navy mb-1">
                        Simulated Application Date
                      </label>
                      <input
                        type="date"
                        value={simAppDate}
                        onChange={(e) => setSimAppDate(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-xl border border-border bg-page-bg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-navy mb-1">
                        Simulated Acknowledgement Date
                      </label>
                      <input
                        type="date"
                        value={simAckDate}
                        onChange={(e) => setSimAckDate(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-xl border border-border bg-page-bg"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleRunSimulator}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-navy hover:bg-navy/90 text-white rounded-xl text-xs font-semibold transition-colors"
                  >
                    <Play className="w-3.5 h-3.5" />
                    Run Engine Check
                  </button>

                  {simResult && (
                    <div className="p-4 rounded-xl bg-page-bg border border-border-light text-xs space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-navy">Simulator Output Status:</span>
                        <span className="font-mono font-bold text-purple">{simResult.status}</span>
                      </div>
                      <p className="text-text-secondary">{simResult.explanation}</p>
                      {simResult.calculation && (
                        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border-light text-[11px]">
                          <div>
                            <span className="text-text-muted block">Elapsed:</span>
                            <span className="font-bold">{simResult.calculation.elapsedDays} d</span>
                          </div>
                          <div>
                            <span className="text-text-muted block">Allowed:</span>
                            <span className="font-bold">{simResult.calculation.allowedDays} d</span>
                          </div>
                          <div>
                            <span className="text-text-muted block">Diff:</span>
                            <span className="font-bold">{simResult.calculation.differencedays} d</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
