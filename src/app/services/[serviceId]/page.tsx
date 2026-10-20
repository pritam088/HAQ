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
} from "lucide-react";
import { getDemoServiceById, getDemoRulesForService } from "@/lib/demo-data";
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
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { serviceId } = await params;
  const service = getDemoServiceById(serviceId);
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
  const service = getDemoServiceById(serviceId);
  if (!service) return notFound();

  const rules = getDemoRulesForService(serviceId);

  return (
    <div className="bg-page-bg min-h-screen">
      {/* Header */}
      <section className="bg-navy text-white py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            All Services
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {service.name}
              </h1>
              {service.nameHindi && (
                <p className="text-white/50 text-sm mt-1">
                  {service.nameHindi}
                </p>
              )}
              <div className="flex items-center gap-3 mt-3 text-sm text-white/60">
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
        {/* Demo notice */}
        <div className="bg-gold/10 border border-gold/30 rounded-xl p-4 flex items-start gap-3 mb-6">
          <AlertTriangle className="w-5 h-5 text-gold-dark shrink-0 mt-0.5" />
          <p className="text-sm text-text-secondary">
            <strong className="text-navy">Synthetic demonstration data.</strong>{" "}
            The details below are hypothetical examples created for
            demonstration purposes. Do not rely on these for any official
            purpose.
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
            {/* CTA Card */}
            <div className="bg-purple/5 border border-purple/20 rounded-2xl p-6">
              <h3 className="text-base font-semibold text-navy mb-2">
                Check Your Application
              </h3>
              <p className="text-sm text-text-secondary mb-4">
                Enter your application details to compare against the service
                rules.
              </p>
              <Link
                href={`/cases/new?serviceId=${service.id}`}
                className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-semibold text-white bg-purple hover:bg-purple-dark rounded-xl transition-colors shadow-sm"
                id={`start-check-${service.id}`}
              >
                <Shield className="w-4 h-4" />
                Start Rule Check
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Quick Info */}
            <div className="bg-card-bg rounded-2xl border border-border p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-navy mb-4">
                Quick Information
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
