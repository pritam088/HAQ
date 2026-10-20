import Link from "next/link";
import {
  Search,
  MapPin,
  Building2,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  Clock,
  Filter,
  FileText,
} from "lucide-react";
import { getDemoServices } from "@/lib/demo-data";
import type { Metadata } from "next";
import type { VerificationStatus } from "@/lib/types";

export const metadata: Metadata = {
  title: "Services | HAQ — आपका अधिकार",
  description:
    "Browse government services available for rule verification on HAQ. Each service shows its verification status, department, and key details.",
};

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
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium border ${config.className}`}
    >
      <Icon className="w-3 h-3" />
      {config.label}
    </span>
  );
}

export default function ServicesPage() {
  const services = getDemoServices();

  return (
    <div className="bg-page-bg min-h-screen">
      {/* Header */}
      <section className="bg-navy text-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-sm text-white/80 mb-4">
              <FileText className="w-3.5 h-3.5 text-teal" />
              Service Catalog
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Government Services
            </h1>
            <p className="mt-3 text-lg text-white/70">
              Select a service to check your application against verified rules
              and timelines.
            </p>
          </div>
        </div>
      </section>

      {/* Demo notice */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6">
        <div className="bg-gold/10 border border-gold/30 rounded-xl p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-gold-dark shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-navy">
              Demonstration Data
            </p>
            <p className="text-xs text-text-secondary mt-0.5">
              The services listed below use synthetic demonstration data for the
              Rajasthan state. Deadlines, fees, and procedures shown are
              hypothetical and must not be treated as actual government
              parameters.
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6">
        <div className="bg-card-bg rounded-xl border border-border p-4 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="text"
              placeholder="Search services..."
              className="w-full pl-9 pr-4 py-2.5 text-sm rounded-lg border border-border bg-page-bg focus:outline-none focus:ring-2 focus:ring-purple/30 focus:border-purple transition"
              aria-label="Search services"
              id="service-search"
            />
          </div>
          <div className="flex gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-text-secondary bg-page-bg rounded-lg border border-border">
              <MapPin className="w-3.5 h-3.5" />
              Rajasthan
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-text-secondary bg-page-bg rounded-lg border border-border">
              <Filter className="w-3.5 h-3.5" />
              All Statuses
            </div>
          </div>
        </div>
      </div>

      {/* Service list */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service) => (
            <Link
              key={service.id}
              href={`/services/${service.id}`}
              className="group bg-card-bg rounded-2xl border border-border p-6 shadow-sm hover:shadow-md hover:border-purple/20 transition-all duration-200"
              id={`service-card-${service.id}`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-purple/10 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-purple" />
                </div>
                <VerificationBadge status={service.verificationStatus} />
              </div>

              <h3 className="text-base font-semibold text-navy mb-1 group-hover:text-purple transition-colors">
                {service.name}
              </h3>
              {service.nameHindi && (
                <p className="text-xs text-text-muted mb-2">
                  {service.nameHindi}
                </p>
              )}

              <p className="text-sm text-text-secondary leading-relaxed mb-4 line-clamp-2">
                {service.shortDescription}
              </p>

              <div className="flex items-center gap-3 text-xs text-text-muted">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {service.state}
                </span>
                <span className="flex items-center gap-1">
                  <Building2 className="w-3 h-3" />
                  {service.department.split("(")[0].trim()}
                </span>
              </div>

              <div className="mt-4 pt-3 border-t border-border-light flex items-center justify-between">
                <span className="text-xs text-text-muted">
                  {service.category}
                </span>
                <span className="text-xs text-purple font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  View details
                  <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty state if needed */}
        {services.length === 0 && (
          <div className="text-center py-16">
            <Search className="w-12 h-12 text-text-muted mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-navy mb-2">
              No services found
            </h3>
            <p className="text-sm text-text-secondary">
              No services match your current filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
