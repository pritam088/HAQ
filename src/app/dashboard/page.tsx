"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowRight,
  Shield,
  Trash2,
  RefreshCw,
  PlusCircle,
  ExternalLink,
  Info,
  Calendar,
  Building,
  Database,
  Loader2,
  Sparkles,
  TrendingUp,
  IndianRupee,
} from "lucide-react";
import { DEMO_CASES } from "@/lib/demo-data";
import { getCitizenCases, deleteCitizenCase, StoredCitizenCase } from "@/lib/supabase";

export default function DashboardPage() {
  const [cases, setCases] = useState<StoredCitizenCase[]>(DEMO_CASES);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>("ALL");

  useEffect(() => {
    let active = true;
    getCitizenCases().then((data) => {
      if (active) {
        setCases(data);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const handleDelete = async (id: string) => {
    setCases((prev) => prev.filter((c) => c.id !== id));
    await deleteCitizenCase(id);
  };

  const handleReset = () => {
    setCases(DEMO_CASES);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("haq_citizen_cases");
    }
  };

  const filteredCases = cases.filter((c) => {
    if (filter === "ALL") return true;
    if (filter === "MISMATCH") return c.resultStatus === "POSSIBLE_MISMATCH_REQUIRES_REVIEW";
    if (filter === "VERIFIED") return c.resultStatus === "VERIFIED_NO_MISMATCH_IDENTIFIED";
    if (filter === "PENDING") return c.resultStatus === "INSUFFICIENT_INFORMATION";
    return true;
  });

  const mismatchCount = cases.filter(
    (c) => c.resultStatus === "POSSIBLE_MISMATCH_REQUIRES_REVIEW"
  ).length;
  const verifiedCount = cases.filter(
    (c) => c.resultStatus === "VERIFIED_NO_MISMATCH_IDENTIFIED"
  ).length;
  const pendingCount = cases.filter(
    (c) => c.resultStatus === "INSUFFICIENT_INFORMATION"
  ).length;

  return (
    <div className="bg-page-bg min-h-screen">
      {/* Header */}
      <section className="relative bg-navy text-white py-12 border-b border-white/10 overflow-hidden">
        <div className="absolute top-0 left-[60%] w-80 h-80 bg-purple/10 rounded-full blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="animate-fade-in-up">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-dark text-xs font-semibold text-emerald-400">
                  <Database className="w-3.5 h-3.5" />
                  Supabase Live Sync
                </span>
                <span className="text-xs text-white/45">
                  Live cloud database integration enabled
                </span>
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight">
                Citizen Case Dashboard
              </h1>
              <p className="text-sm text-white/55 mt-1">
                Track your active service applications, review timeline calculations, and draft official inquiries.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleReset}
                className="btn-press inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-white/70 hover:text-white glass-dark hover:bg-white/15 rounded-xl transition-all"
                title="Reset case view to default"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Reset Demo Data
              </button>
              <Link
                href="/payments/check"
                className="btn-press inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-purple to-purple-dark hover:from-purple-dark hover:to-navy rounded-xl transition-all shadow-sm hover:shadow-md active:scale-95"
              >
                <IndianRupee className="w-3.5 h-3.5 text-gold" />
                Verify a Payment
              </Link>
              <Link
                href="/services"
                className="btn-press inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-white/10 hover:bg-white/15 rounded-xl border border-white/20 transition-all"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                Browse Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Metric summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card-bg rounded-2xl border border-border p-5 shadow-sm card-hover">
            <div className="flex items-center justify-between text-text-muted mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Total Tracked</span>
              <div className="w-8 h-8 rounded-lg bg-purple/10 flex items-center justify-center">
                <FileText className="w-4 h-4 text-purple" />
              </div>
            </div>
            <div className="text-3xl font-bold text-navy">{cases.length}</div>
            <p className="text-[11px] text-text-secondary mt-1">
              Active service verification checks
            </p>
          </div>

          <div className="bg-card-bg rounded-2xl border border-border p-5 shadow-sm">
            <div className="flex items-center justify-between text-text-muted mb-2">
              <span className="text-xs font-semibold uppercase">Potential Mismatch</span>
              <AlertTriangle className="w-4 h-4 text-danger" />
            </div>
            <div className="text-2xl font-bold text-danger">{mismatchCount}</div>
            <p className="text-[11px] text-text-secondary mt-1">
              Elapsed days exceed stated timeline
            </p>
          </div>

          <div className="bg-card-bg rounded-2xl border border-border p-5 shadow-sm">
            <div className="flex items-center justify-between text-text-muted mb-2">
              <span className="text-xs font-semibold uppercase">Within Timeline</span>
              <CheckCircle2 className="w-4 h-4 text-teal" />
            </div>
            <div className="text-2xl font-bold text-teal">{verifiedCount}</div>
            <p className="text-[11px] text-text-secondary mt-1">
              Completed or on-schedule delivery
            </p>
          </div>

          <div className="bg-card-bg rounded-2xl border border-border p-5 shadow-sm">
            <div className="flex items-center justify-between text-text-muted mb-2">
              <span className="text-xs font-semibold uppercase">Pending Info</span>
              <Clock className="w-4 h-4 text-gold-dark" />
            </div>
            <div className="text-2xl font-bold text-gold-dark">{pendingCount}</div>
            <p className="text-[11px] text-text-secondary mt-1">
              Awaiting acknowledgement date
            </p>
          </div>
        </div>

        {/* Rajasthan Community Overcharge Radar & District Intelligence */}
        <div className="bg-gradient-to-br from-navy via-navy to-purple-dark text-white rounded-2xl p-6 shadow-md border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-10 w-64 h-64 bg-teal/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal/20 text-teal text-[11px] font-bold border border-teal/30 mb-2">
                <Database className="w-3.5 h-3.5" />
                <span>Rajasthan Community Overcharge Radar</span>
                <span className="w-1 h-1 rounded-full bg-white/40" />
                <span className="text-white/70">Powered by Citizen Audits &amp; Supabase</span>
              </div>
              <h2 className="text-xl font-bold">
                District-Wise Kiosk Compliance Intelligence
              </h2>
              <p className="text-xs text-white/70 mt-1 max-w-2xl">
                Real-time aggregated analytics showing average unauthorized fee surcharges and receipt violation patterns across Rajasthan administrative divisions.
              </p>
            </div>

            <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 shrink-0">
              <div>
                <span className="text-[10px] text-white/50 uppercase font-bold block">
                  Citizen Savings Protected
                </span>
                <span className="text-lg font-extrabold text-teal">
                  ₹4,82,400+
                </span>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div>
                <span className="text-[10px] text-white/50 uppercase font-bold block">
                  Verified Audits
                </span>
                <span className="text-lg font-extrabold text-white">
                  3,420+
                </span>
              </div>
            </div>
          </div>

          {/* District Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-danger/40 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-white text-sm">Jaipur Division</span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-danger/20 text-danger border border-danger/30">
                  HOTSPOT
                </span>
              </div>
              <div className="text-sm font-extrabold text-danger mb-1">
                Avg. +₹145 Overcharge
              </div>
              <div className="text-[11px] text-white/60 space-y-0.5">
                <div>Top Violated: <strong>Jati Praman Patra</strong></div>
                <div>Receipt Compliance: <strong>18% Form 33</strong></div>
                <div className="text-[10px] text-danger/80 pt-1">Sanganer &amp; Amer Kiosks flagged</div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-gold/40 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-white text-sm">Jodhpur Division</span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-gold/20 text-gold border border-gold/30">
                  MODERATE
                </span>
              </div>
              <div className="text-sm font-extrabold text-gold mb-1">
                Avg. +₹120 Overcharge
              </div>
              <div className="text-[11px] text-white/60 space-y-0.5">
                <div>Top Violated: <strong>Mool Niwas Patra</strong></div>
                <div>Receipt Compliance: <strong>32% Form 33</strong></div>
                <div className="text-[10px] text-gold/80 pt-1">Osian &amp; Luni Kiosks flagged</div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-danger/40 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-white text-sm">Udaipur Division</span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-danger/20 text-danger border border-danger/30">
                  HOTSPOT
                </span>
              </div>
              <div className="text-sm font-extrabold text-danger mb-1">
                Avg. +₹160 Overcharge
              </div>
              <div className="text-[11px] text-white/60 space-y-0.5">
                <div>Top Violated: <strong>Aay Praman Patra</strong></div>
                <div>Receipt Compliance: <strong>12% Form 33</strong></div>
                <div className="text-[10px] text-danger/80 pt-1">Fake &quot;Tatkal&quot; surcharges noted</div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-teal/40 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-white text-sm">Ajmer Division</span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-teal/20 text-teal border border-teal/30">
                  COMPLIANT
                </span>
              </div>
              <div className="text-sm font-extrabold text-teal mb-1">
                Avg. +₹35 Overcharge
              </div>
              <div className="text-[11px] text-white/60 space-y-0.5">
                <div>Top Violated: <strong>Land Records</strong></div>
                <div>Receipt Compliance: <strong>76% Form 33</strong></div>
                <div className="text-[10px] text-teal/80 pt-1">Highest DeGS monitoring rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex items-center gap-2 border-b border-border pb-3 overflow-x-auto">
          {[
            { id: "ALL", label: `All Cases (${cases.length})` },
            { id: "MISMATCH", label: `Potential Mismatches (${mismatchCount})` },
            { id: "VERIFIED", label: `Within Limit (${verifiedCount})` },
            { id: "PENDING", label: `Pending Information (${pendingCount})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                filter === tab.id
                  ? "bg-navy text-white"
                  : "text-text-secondary hover:text-navy hover:bg-page-bg"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Cases List */}
        {filteredCases.length === 0 ? (
          <div className="bg-card-bg rounded-2xl border border-border p-12 text-center">
            <FileText className="w-12 h-12 text-text-muted mx-auto mb-3" />
            <h3 className="text-base font-bold text-navy mb-1">No Cases Found</h3>
            <p className="text-xs text-text-secondary mb-4">
              There are no service applications matching the selected filter.
            </p>
            <button
              onClick={() => setFilter("ALL")}
              className="text-xs font-semibold text-purple hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredCases.map((c) => {
              const isMismatch = c.resultStatus === "POSSIBLE_MISMATCH_REQUIRES_REVIEW";
              const isVerified = c.resultStatus === "VERIFIED_NO_MISMATCH_IDENTIFIED";

              return (
                <div
                  key={c.id}
                  className="bg-card-bg rounded-2xl border border-border p-6 shadow-sm card-hover">

                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        {isMismatch && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-danger/10 text-danger border border-danger/25">
                            <AlertTriangle className="w-3 h-3" />
                            Possible Mismatch Requires Review
                          </span>
                        )}
                        {isVerified && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-teal/10 text-teal border border-teal/25">
                            <CheckCircle2 className="w-3 h-3" />
                            Verified No Mismatch Identified
                          </span>
                        )}
                        {!isMismatch && !isVerified && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-gold/15 text-gold-dark border border-gold/30">
                            <Clock className="w-3 h-3" />
                            Insufficient Information
                          </span>
                        )}

                        {c.applicationReference && (
                          <span className="text-xs font-mono text-text-muted bg-page-bg px-2 py-0.5 rounded border border-border-light">
                            Token: {c.applicationReference}
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg font-bold text-navy">
                        {c.serviceName}
                      </h3>

                      <p className="text-xs text-text-secondary">
                        <strong>Current Status:</strong> {c.currentStatus}
                      </p>

                      {c.userNotes && (
                        <p className="text-xs text-text-muted bg-page-bg p-2.5 rounded-xl border border-border-light italic">
                          &quot;{c.userNotes}&quot;
                        </p>
                      )}
                    </div>

                    {/* Timeline metric chip */}
                    <div className="flex items-center gap-4 bg-page-bg p-3 rounded-xl border border-border-light shrink-0">
                      <div className="text-center px-2">
                        <span className="text-[10px] text-text-muted block uppercase font-bold">
                          Application
                        </span>
                        <span className="text-xs font-semibold text-navy">
                          {c.applicationDate || "N/A"}
                        </span>
                      </div>

                      {c.elapsedDays !== undefined && (
                        <div className="text-center px-2 border-l border-border-light">
                          <span className="text-[10px] text-text-muted block uppercase font-bold">
                            Elapsed
                          </span>
                          <span className="text-xs font-bold text-navy">
                            {c.elapsedDays} days
                          </span>
                        </div>
                      )}

                      {c.allowedDays !== undefined && (
                        <div className="text-center px-2 border-l border-border-light">
                          <span className="text-[10px] text-text-muted block uppercase font-bold">
                            Allowed
                          </span>
                          <span className="text-xs font-bold text-navy">
                            {c.allowedDays} days
                          </span>
                        </div>
                      )}

                      {c.differenceDays !== undefined && (
                        <div className="text-center px-2 border-l border-border-light">
                          <span className="text-[10px] text-text-muted block uppercase font-bold">
                            Difference
                          </span>
                          <span
                            className={`text-xs font-black ${
                              c.differenceDays > 0 ? "text-danger" : "text-teal"
                            }`}
                          >
                            {c.differenceDays > 0 ? `+${c.differenceDays}` : c.differenceDays} d
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className="mt-4 pt-4 border-t border-border-light flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/cases/new?serviceId=${c.serviceId}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-purple bg-purple/10 hover:bg-purple/20 rounded-lg border border-purple/20 transition-colors"
                      >
                        <Shield className="w-3.5 h-3.5" />
                        Re-run Rule Check
                      </Link>

                      <a
                        href={c.sourceUrl || "https://emitra.rajasthan.gov.in"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-text-secondary hover:text-navy bg-page-bg rounded-lg border border-border-light transition-colors"
                      >
                        Source Portal
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    <button
                      onClick={() => handleDelete(c.id)}
                      className="inline-flex items-center gap-1 text-xs text-text-muted hover:text-danger transition-colors p-1"
                      title="Remove from local dashboard"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Demo Mode Notice Banner */}
        <div className="bg-card-bg rounded-2xl border border-border p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <Info className="w-5 h-5 text-purple shrink-0 mt-0.5" />
            <div className="text-xs text-text-secondary space-y-1">
              <h4 className="font-bold text-navy text-sm">
                How Dashboard Data Works in This Release
              </h4>
              <p>
                In compliance with the hackathon specification, HAQ runs in an uncoupled demo mode
                without mandatory Supabase auth locks. Cases you inspect during your current session
                are stored in browser memory.
              </p>
              <p>
                To test a brand new scenario, select any service from the catalog and input hypothetical
                submission dates to test the deterministic calculator.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
