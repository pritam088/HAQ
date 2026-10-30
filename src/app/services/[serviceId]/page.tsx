import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  CheckCircle2,
  Clock,
  AlertCircle,
  MapPin,
  Building2,
  FileText,
  IndianRupee,
  CalendarDays,
  Shield,
  ChevronRight,
  AlertTriangle,
  BookOpen,
  Sparkles,
} from "lucide-react";
import { getServiceById, getRulesForService } from "@/lib/supabase";
import type { Metadata } from "next";
import type { VerificationStatus } from "@/lib/types";

interface PageProps {
  params: Promise<{ serviceId: string }>;
}



export const instant = false;

export function generateStaticParams() {
  return [
    { serviceId: "raj-caste-cert-001" },
    { serviceId: "raj-income-cert-001" },
    { serviceId: "raj-domicile-cert-001" },
    { serviceId: "raj-ration-card-001" },
    { serviceId: "raj-jamabandi-001" },
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { serviceId } = await params;
  const service = await getServiceById(serviceId);
  if (!service) return { title: "Service Not Found | HAQ" };
  return {
    title: `${service.name} | HAQ — आपका अधिकार`,
    description: service.shortDescription,
  };
}

function VerificationBadge({ status }: { status: VerificationStatus }) {
  const config = {
    VERIFIED: {
      icon: CheckCircle2,
      label: "Verified",
      className: "bg-teal/10 text-teal-dark border-teal/20",
    },
    PENDING_REVIEW: {
      icon: Clock,
      label: "Pending Review",
      className: "bg-gold/10 text-gold-dark border-gold/20",
    },
    UNVERIFIED: {
      icon: AlertCircle,
      label: "Unverified",
      className: "bg-text-muted/10 text-text-muted border-text-muted/20",
    },
    OUTDATED: {
      icon: AlertCircle,
      label: "Outdated",
      className: "bg-danger/10 text-danger border-danger/20",
    },
    DISPUTED: {
      icon: AlertCircle,
      label: "Disputed",
      className: "bg-danger/10 text-danger border-danger/20",
    },
  }[status];

  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border ${config.className}`}
    >
      <Icon className="w-3.5 h-3.5" />
      {config.label}
    </span>
  );
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { serviceId } = await params;
  const service = await getServiceById(serviceId);
  if (!service) return notFound();

  const rules = await getRulesForService(serviceId);

  return (
    <div className="bg-page-bg min-h-screen">
      {/* Header */}
      <section className="relative bg-navy text-white py-10 sm:py-14 overflow-hidden">
        <div className="absolute top-0 right-[10%] w-72 h-72 bg-purple/10 rounded-full blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            All Services
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 animate-fade-in-up">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {service.name}
              </h1>
              {service.nameHindi && (
                <p className="text-white/45 text-sm mt-1">
                  {service.nameHindi}
                </p>
              )}
              <div className="flex items-center gap-3 mt-3 text-sm text-white/55">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {service.state}
                </span>
                <span className="flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5" />
                  {service.department}
                </span>
              </div>
            </div>
            <VerificationBadge status={service.verificationStatus} />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Official source notice */}
        <div className="bg-teal/8 border border-teal/25 rounded-xl p-4 flex items-start gap-3 mb-6">
          <AlertTriangle className="w-5 h-5 text-teal shrink-0 mt-0.5" />
          <p className="text-sm text-text-secondary">
            <strong className="text-navy">Verified official reference data.</strong>{" "}
            Fees and timelines below are grounded in DoIT&C Rate Notification
            F1(23)/DoIT/Tech/11/Vol-V and the Rajasthan Guaranteed Delivery of
            Public Services Act 2011. Always verify on official portals before
            filing formal appeals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div className="bg-card-bg rounded-2xl border border-border p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-navy mb-3 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-purple" />
                About This Service
              </h2>
              <p className="text-text-secondary leading-relaxed">
                {service.longDescription || service.shortDescription}
              </p>
            </div>

            {/* Eligibility */}
            {service.eligibilitySummary && (
              <div className="bg-card-bg rounded-2xl border border-border p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-navy mb-3">
                  Eligibility
                </h2>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {service.eligibilitySummary}
                </p>
              </div>
            )}

            {/* Required Documents */}
            {service.requiredDocuments &&
              service.requiredDocuments.length > 0 && (
                <div className="bg-card-bg rounded-2xl border border-border p-6 shadow-sm">
                  <h2 className="text-lg font-semibold text-navy mb-3 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-purple" />
                    Required Documents
                  </h2>
                  <ul className="space-y-2">
                    {service.requiredDocuments.map((doc, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-text-secondary"
                      >
                        <CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                        {doc}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            {/* Applicable Rules */}
            {rules.length > 0 && (
              <div className="bg-card-bg rounded-2xl border border-border p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-navy mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-purple" />
                  Applicable Rules
                </h2>
                <div className="space-y-4">
                  {rules.map((rule) => (
                    <div
                      key={rule.id}
                      className="p-4 bg-page-bg rounded-xl border border-border-light"
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="text-sm font-semibold text-navy">
                          {rule.ruleTitle}
                        </h3>
                        <VerificationBadge
                          status={rule.verificationStatus}
                        />
                      </div>
                      <p className="text-xs text-text-secondary leading-relaxed mb-3">
                        {rule.ruleText}
                      </p>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-text-muted">
                        {rule.deadlineValue != null && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {rule.deadlineValue} {rule.deadlineUnit?.replace("_", " ").toLowerCase()}
                          </span>
                        )}
                        {rule.feeValue != null && (
                          <span className="flex items-center gap-1">
                            <IndianRupee className="w-3 h-3" />₹{rule.feeValue}
                          </span>
                        )}
                        <a
                          href={rule.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-purple hover:underline"
                        >
                          <ExternalLink className="w-3 h-3" />
                          Source
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Primary Action Card: Check Payment & Overcharging */}
            <div className="bg-gradient-to-br from-purple/10 via-purple/5 to-teal/5 border-2 border-purple/30 rounded-2xl p-6 shadow-sm">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-teal text-white tracking-wider uppercase mb-2 inline-block">
                RECOMMENDED FIRST STEP
              </span>
              <h3 className="text-base font-bold text-navy mb-1 flex items-center gap-1.5">
                <IndianRupee className="w-4 h-4 text-purple" />
                Check Kiosk Charges &amp; Fees
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed mb-4">
                Did a kiosk ask for extra money or fail to give an eMitra computer receipt? Check against official DoIT&amp;C rates.
              </p>
              <Link
                href={`/payments/check?serviceId=${service.id}`}
                className="btn-press inline-flex items-center justify-center gap-2 w-full px-4 py-3 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-purple to-purple-dark hover:from-purple-dark hover:to-navy rounded-xl transition-all shadow-md active:scale-95"
                id={`check-payment-${service.id}`}
              >
                <Shield className="w-4 h-4 text-gold" />
                <span>Verify What You Should Pay</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Direct Official Route Card */}
            <div className="bg-white border border-teal/30 rounded-2xl p-5 shadow-2xs space-y-2.5">
              <span className="text-[11px] font-bold text-teal flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Apply Directly (Bypass Kiosks)
              </span>
              <p className="text-xs text-text-secondary leading-relaxed">
                You can apply directly from your home PC or mobile via Rajasthan SSO (<strong>sso.rajasthan.gov.in</strong>). Pay only ₹40 statutory fee online; zero kiosk intermediary fees.
              </p>
              <a
                href="https://sso.rajasthan.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple hover:underline pt-1"
              >
                <span>Open Rajasthan SSO Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Secondary Action: Timeline Checker */}
            <div className="bg-card-bg border border-border rounded-2xl p-5 shadow-2xs space-y-2">
              <h3 className="text-sm font-bold text-navy flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-purple" />
                Check Delivery Timeline
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Already submitted an application? Compare your elapsed days against the statutory service guarantee.
              </p>
              <Link
                href={`/cases/new?serviceId=${service.id}`}
                className="inline-flex items-center justify-center gap-1.5 w-full px-3 py-2 text-xs font-bold text-navy bg-page-bg hover:bg-border-light border border-border rounded-xl transition-colors mt-2"
                id={`start-check-${service.id}`}
              >
                <span>Verify Statutory Delivery Timeline</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Quick Info */}
            <div className="bg-card-bg rounded-2xl border border-border p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-navy mb-4">
                Official Mandated Parameters
              </h3>
              <dl className="space-y-3">
                {service.serviceTimeLimit && (
                  <div>
                    <dt className="text-xs text-text-muted flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Service Time Limit
                    </dt>
                    <dd className="text-sm text-text-primary mt-0.5">
                      {service.serviceTimeLimit}
                    </dd>
                  </div>
                )}
                {service.applicableFee && (
                  <div>
                    <dt className="text-xs text-text-muted flex items-center gap-1">
                      <IndianRupee className="w-3 h-3" /> Applicable Fee
                    </dt>
                    <dd className="text-sm text-text-primary mt-0.5">
                      {service.applicableFee}
                    </dd>
                  </div>
                )}
                {service.appealRoute && (
                  <div>
                    <dt className="text-xs text-text-muted">Appeal Route</dt>
                    <dd className="text-sm text-text-primary mt-0.5">
                      {service.appealRoute}
                    </dd>
                  </div>
                )}
                <div>
                  <dt className="text-xs text-text-muted flex items-center gap-1">
                    <CalendarDays className="w-3 h-3" /> Last Reviewed
                  </dt>
                  <dd className="text-sm text-text-primary mt-0.5">
                    {service.lastReviewedAt
                      ? new Date(service.lastReviewedAt).toLocaleDateString(
                          "en-IN",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )
                      : "Not yet reviewed"}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Source links */}
            {service.officialSourceLinks.length > 0 && (
              <div className="bg-card-bg rounded-2xl border border-border p-6 shadow-sm">
                <h3 className="text-sm font-semibold text-navy mb-3">
                  Official Sources
                </h3>
                <ul className="space-y-2">
                  {service.officialSourceLinks.map((url, i) => (
                    <li key={i}>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm text-purple hover:underline"
                      >
                        <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">
                          {url.replace(/^https?:\/\//, "")}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
