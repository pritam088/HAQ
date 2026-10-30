import Link from "next/link";
import {
  BookOpen,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  FileCheck,
  Search,
  Scale,
  Building2,
  Calendar,
  Sparkles,
} from "lucide-react";
import { DEMO_SERVICES, DEMO_RULES } from "@/lib/demo-data";

export const metadata = {
  title: "Official Sources & Verification Policy | HAQ — आपका अधिकार",
  description:
    "Explore the official government sources, statutory guidelines, and rigorous verification policy behind HAQ.",
};

const verificationCriteria = [
  {
    icon: Building2,
    title: "1. Primary Source Authenticity",
    desc: "Rules must stem directly from official departmental portals (gov.in, nic.in), published gazette notifications, or citizen service charters. Third-party blogs or news snippets are strictly rejected.",
    color: "text-purple",
    bgColor: "bg-purple/10",
  },
  {
    icon: FileCheck,
    title: "2. Verbatim Statutory Text",
    desc: "Every deadline and fee requirement must link directly to an exact section, circular number, or rule paragraph with a verifiable reference.",
    color: "text-teal",
    bgColor: "bg-teal/10",
  },
  {
    icon: Calendar,
    title: "3. Clear Counting Conventions",
    desc: "The counting unit (working days vs. calendar days) and starting trigger (submission timestamp vs. physical document acknowledgement) must be explicitly documented.",
    color: "text-gold-dark",
    bgColor: "bg-gold/15",
  },
  {
    icon: Scale,
    title: "4. Exception & Appeal Documentation",
    desc: "Known statutory exceptions (inquiry requirements, field verification delays, gazetted holidays) and designated first-appellate authorities must be verified before approval.",
    color: "text-navy",
    bgColor: "bg-navy/10",
  },
];

const officialPortals = [
  {
    name: "eMitra Rajasthan Portal",
    url: "https://emitra.rajasthan.gov.in/",
    desc: "Unified citizen services delivery platform for Rajasthan state certificates, utility services, and revenue applications.",
    department: "DoIT&C, Government of Rajasthan",
    status: "Active Source Hub",
  },
  {
    name: "Rajasthan Guaranteed Delivery of Public Services Act (RGDPSA)",
    url: "https://rajasthan.gov.in/",
    desc: "Statutory framework governing mandated service delivery timelines, nodal officers, and appellate provisions for state services.",
    department: "Department of Administrative Reforms (AR)",
    status: "Statutory Baseline",
  },
  {
    name: "Rajasthan Sampark (181 Toll-Free)",
    url: "https://sampark.rajasthan.gov.in/",
    desc: "Official centralized public grievance redressal portal for lodging complaints regarding service delay or non-compliance.",
    department: "Government of Rajasthan",
    status: "Official Redressal Channel",
  },
  {
    name: "Revenue Department Rajasthan",
    url: "https://landrecords.rajasthan.gov.in/",
    desc: "Nodal department responsible for caste, domicile, and revenue certificate administration across all district tehsils.",
    department: "Board of Revenue / Revenue Department",
    status: "Departmental Authority",
  },
];

export default function SourcesPage() {
  return (
    <div className="bg-page-bg min-h-screen">
      {/* Hero Header */}
      <section className="relative bg-navy text-white py-16 sm:py-20 overflow-hidden border-b border-white/10">
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-purple/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-10 w-72 h-72 bg-teal/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal/15 border border-teal/30 text-xs font-semibold text-teal mb-4 backdrop-blur-md">
            <ShieldCheck className="w-4 h-4" />
            <span>Grounded Civic Knowledge</span>
            <span className="w-1 h-1 rounded-full bg-white/40" />
            <span className="text-white/60">Zero Uncited Claims</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Official Sources &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal to-purple-light">Verification Policy</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-white/75 max-w-3xl leading-relaxed">
            HAQ believes that civic AI is only as trustworthy as its primary sources.
            We link every rule check to verified government publications, citizen service charters,
            and public service delivery statutes.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-14">
        {/* Verification Standards */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-navy flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple" />
              Our 4-Point Rule Verification Standard
            </h2>
            <p className="text-sm text-text-secondary mt-1">
              No rule is classified as &quot;VERIFIED&quot; without passing all four checks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {verificationCriteria.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="card-hover bg-card-bg rounded-2xl border border-border p-6 shadow-sm transition-all duration-300"
                >
                  <div className={`w-11 h-11 rounded-xl ${item.bgColor} flex items-center justify-center ${item.color} mb-4 shadow-sm`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-navy text-base mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Catalog of Grounded Service Rules in HAQ */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-navy">
                Rule Repository &amp; Provenance
              </h2>
              <p className="text-sm text-text-secondary mt-1">
                Inspect currently cataloged rules, source URLs, and verification classifications.
              </p>
            </div>
          </div>

          <div className="space-y-5">
            {DEMO_RULES.map((rule) => {
              const service = DEMO_SERVICES.find((s) => s.id === rule.serviceId);
              return (
                <div
                  key={rule.id}
                  className="card-hover bg-card-bg rounded-2xl border border-border p-6 sm:p-7 shadow-sm transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1.5">
                        <span className="text-xs font-bold px-3 py-1 rounded-full bg-gold/15 text-gold-dark border border-gold/30">
                          {rule.verificationStatus}
                        </span>
                        <span className="text-xs text-text-muted">
                          Rule Version {rule.ruleVersion}
                        </span>
                        <span className="text-xs text-text-muted">
                          • State: {rule.state}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-navy">
                        {rule.ruleTitle}
                      </h3>
                      <p className="text-xs text-text-secondary mt-1">
                        Department: {rule.department} | Associated Service: <span className="font-semibold text-navy">{service?.name}</span>
                      </p>
                    </div>

                    <a
                      href={rule.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple hover:text-purple-dark bg-purple/5 hover:bg-purple/10 px-3.5 py-2 rounded-xl border border-purple/20 transition-colors shrink-0 shadow-sm"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Inspect Source Portal
                    </a>
                  </div>

                  <div className="bg-page-bg rounded-xl p-4 border border-border-light text-xs text-text-secondary leading-relaxed mb-4">
                    <span className="font-bold text-navy">Rule Text Extract: </span>
                    {rule.ruleText}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="bg-white p-3 rounded-xl border border-border-light shadow-2xs">
                      <span className="text-text-muted block text-[10px] uppercase font-bold tracking-wider">
                        Stated Timeline
                      </span>
                      <span className="font-bold text-navy text-sm mt-0.5 block">
                        {rule.deadlineValue} {rule.deadlineUnit?.toLowerCase().replace("_", " ")}
                      </span>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-border-light shadow-2xs">
                      <span className="text-text-muted block text-[10px] uppercase font-bold tracking-wider">
                        Clock Basis
                      </span>
                      <span className="font-bold text-navy text-sm mt-0.5 block">
                        {rule.deadlineBasis?.replace("_", " ")}
                      </span>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-border-light shadow-2xs">
                      <span className="text-text-muted block text-[10px] uppercase font-bold tracking-wider">
                        Statutory Fee
                      </span>
                      <span className="font-bold text-navy text-sm mt-0.5 block">
                        {rule.feeCurrency} {rule.feeValue}
                      </span>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-border-light shadow-2xs">
                      <span className="text-text-muted block text-[10px] uppercase font-bold tracking-wider">
                        Effective From
                      </span>
                      <span className="font-bold text-navy text-sm mt-0.5 block">
                        {rule.effectiveFrom}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Official Rajasthan Government Portals Directory */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-navy">
              Primary Official Portals &amp; Grievance Systems
            </h2>
            <p className="text-sm text-text-secondary mt-1">
              All representations drafted by HAQ are designed to be manually submitted by citizens
              through these official state government channels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {officialPortals.map((portal, idx) => (
              <div
                key={idx}
                className="card-hover bg-card-bg rounded-2xl border border-border p-6 shadow-sm hover:border-purple/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-teal/10 text-teal border border-teal/20">
                      {portal.status}
                    </span>
                    <span className="text-xs text-text-muted">
                      {portal.department}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-navy mb-2">
                    {portal.name}
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed mb-4">
                    {portal.desc}
                  </p>
                </div>
                <div className="pt-3 border-t border-border-light flex items-center justify-between">
                  <span className="text-xs text-text-muted font-mono truncate max-w-[200px]">
                    {portal.url.replace(/^https?:\/\//, "")}
                  </span>
                  <a
                    href={portal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple hover:text-purple-dark transition-colors"
                  >
                    <span>Visit Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Data Grounding & Transparency Notice */}
        <div className="bg-teal/8 border border-teal/25 rounded-2xl p-6 sm:p-7 flex items-start gap-4 shadow-sm backdrop-blur-sm">
          <AlertCircle className="w-6 h-6 text-teal shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-text-secondary space-y-2">
            <h4 className="font-bold text-navy text-sm sm:text-base">
              Official Sources & Data Transparency
            </h4>
            <p>
              The service parameters shown on HAQ — including fees, timelines, and appeal routes — are
              grounded in official Rajasthan government publications:{" "}
              <strong>DoIT&C Rate Notification No. F1(23)/DoIT/Tech/11/Vol-V</strong> and the{" "}
              <strong>Rajasthan Guaranteed Delivery of Public Services Act 2011</strong>. HAQ uses these
              as reference data and displays them transparently to help citizens identify discrepancies.
            </p>
            <p>
              Always cross-verify deadlines and fees at your local eMitra kiosk or on{" "}
              <a
                href="https://emitra.rajasthan.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-purple font-semibold hover:text-purple-dark"
              >
                emitra.rajasthan.gov.in
              </a>{" "}
              before filing formal appeals. Last reference check:{" "}
              <strong>October 2026</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
