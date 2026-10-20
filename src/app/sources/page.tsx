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
  },
  {
    icon: FileCheck,
    title: "2. Verbatim Statutory Text",
    desc: "Every deadline and fee requirement must link directly to an exact section, circular number, or rule paragraph with a verifiable reference.",
  },
  {
    icon: Calendar,
    title: "3. Clear Counting Conventions",
    desc: "The counting unit (working days vs. calendar days) and starting trigger (submission timestamp vs. physical document acknowledgement) must be explicitly documented.",
  },
  {
    icon: Scale,
    title: "4. Exception & Appeal Documentation",
    desc: "Known statutory exceptions (inquiry requirements, field verification delays, gazetted holidays) and designated first-appellate authorities must be verified before approval.",
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
      <section className="bg-navy text-white py-14 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-teal mb-4">
            <ShieldCheck className="w-4 h-4" />
            Transparent Civic Technology
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Official Sources & Verification Policy
          </h1>
          <p className="mt-3 text-lg text-white/70 max-w-3xl leading-relaxed">
            HAQ believes that an AI platform is only as trustworthy as its primary sources.
            We link every citizen rule-check to verified government publications, service charters,
            and public service delivery statutes.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Verification Standards */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-navy">
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
                  className="bg-card-bg rounded-2xl border border-border p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple/10 flex items-center justify-center text-purple mb-4">
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
                Rule Repository & Provenance
              </h2>
              <p className="text-sm text-text-secondary mt-1">
                Inspect currently cataloged rules, source URLs, and verification classifications.
              </p>
            </div>
            <Link
              href="/admin/rules"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple hover:text-purple-dark bg-purple/10 px-3 py-1.5 rounded-lg border border-purple/20 transition-colors self-start sm:self-auto"
            >
              <BookOpen className="w-3.5 h-3.5" />
              View Rule Inspector & Simulator
            </Link>
          </div>

          <div className="space-y-4">
            {DEMO_RULES.map((rule) => {
              const service = DEMO_SERVICES.find((s) => s.id === rule.serviceId);
              return (
                <div
                  key={rule.id}
                  className="bg-card-bg rounded-2xl border border-border p-6 shadow-sm"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-gold/15 text-gold-dark border border-gold/30">
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
                      <p className="text-xs text-text-secondary mt-0.5">
                        Department: {rule.department} | Associated Service: {service?.name}
                      </p>
                    </div>

                    <a
                      href={rule.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple hover:underline bg-page-bg px-3 py-2 rounded-xl border border-border-light shrink-0"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Inspect Source Portal
                    </a>
                  </div>

                  <div className="bg-page-bg rounded-xl p-4 border border-border-light text-xs text-text-secondary leading-relaxed mb-4">
                    <span className="font-semibold text-navy">Rule Text Extract: </span>
                    {rule.ruleText}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="bg-white p-2.5 rounded-lg border border-border-light">
                      <span className="text-text-muted block text-[10px] uppercase font-bold">
                        Stated Timeline
                      </span>
                      <span className="font-semibold text-navy">
                        {rule.deadlineValue} {rule.deadlineUnit?.toLowerCase().replace("_", " ")}
                      </span>
                    </div>
                    <div className="bg-white p-2.5 rounded-lg border border-border-light">
                      <span className="text-text-muted block text-[10px] uppercase font-bold">
                        Clock Basis
                      </span>
                      <span className="font-semibold text-navy">
                        {rule.deadlineBasis?.replace("_", " ")}
                      </span>
                    </div>
                    <div className="bg-white p-2.5 rounded-lg border border-border-light">
                      <span className="text-text-muted block text-[10px] uppercase font-bold">
                        Statutory Fee
                      </span>
                      <span className="font-semibold text-navy">
                        {rule.feeCurrency} {rule.feeValue}
                      </span>
                    </div>
                    <div className="bg-white p-2.5 rounded-lg border border-border-light">
                      <span className="text-text-muted block text-[10px] uppercase font-bold">
                        Effective From
                      </span>
                      <span className="font-semibold text-navy">
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
              Primary Official Portals & Grievance Systems
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
                className="bg-card-bg rounded-2xl border border-border p-6 shadow-sm hover:border-purple/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-teal/10 text-teal border border-teal/20">
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
                    className="inline-flex items-center gap-1 text-xs font-semibold text-purple hover:underline"
                  >
                    Visit Portal
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Synthetic Demonstration Notice Banner */}
        <div className="bg-gold/10 border border-gold/30 rounded-2xl p-6 flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-gold-dark shrink-0 mt-0.5" />
          <div className="text-xs text-text-secondary space-y-1.5">
            <h4 className="font-bold text-navy text-sm">
              Demonstration &amp; Synthetic Data Transparency Notice
            </h4>
            <p>
              Under our strict hackathon truthfulness commitment, the service rules shown above for
              Rajasthan eMitra are provided as <strong>synthetic demonstration models</strong>. While they
              accurately emulate real-world timelines and fee structures, they have not yet received final
              statutory certification from the state revenue department.
            </p>
            <p>
              Always cross-verify deadlines and fees at your local eMitra kiosk or on{" "}
              <a
                href="https://emitra.rajasthan.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-purple font-medium"
              >
                emitra.rajasthan.gov.in
              </a>{" "}
              before filing formal appeals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
