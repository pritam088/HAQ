import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  EyeOff,
  Trash2,
  FileCheck2,
  AlertTriangle,
  Server,
  KeyRound,
  ArrowRight,
} from "lucide-react";

export const metadata = {
  title: "Privacy & Data Protection Policy | HAQ — आपका अधिकार",
  description:
    "Learn about HAQ's strict citizen data privacy architecture, zero-Aadhaar policy, and transparent data minimization standards.",
};

const privacyPrinciples = [
  {
    icon: EyeOff,
    title: "1. Zero Sensitive Data Collection",
    desc: "HAQ strictly prohibits and will NEVER prompt for Aadhaar numbers, PAN cards, OTPs, login passwords, or banking credentials. We only request non-sensitive submission dates and optional reference numbers.",
    color: "text-teal",
    bgColor: "bg-teal/10",
  },
  {
    icon: Lock,
    title: "2. Ephemeral & Local-First Processing",
    desc: "Rule verification calculations run deterministically in your session. In this MVP release, case data is retained locally in your browser memory and demo state, never harvested into proprietary tracking databases.",
    color: "text-purple",
    bgColor: "bg-purple/10",
  },
  {
    icon: Server,
    title: "3. Untrusted Input Sandboxing",
    desc: "Any uploaded receipt or PDF text is treated strictly as untrusted evidence. Extracted text is never permitted to execute scripts, trigger arbitrary database writes, or inject prompt modifications.",
    color: "text-navy",
    bgColor: "bg-navy/10",
  },
  {
    icon: KeyRound,
    title: "4. No AI Training on Citizen Evidence",
    desc: "Your application receipts, submission dates, and draft letters are never used to train or fine-tune public foundation AI models.",
    color: "text-gold-dark",
    bgColor: "bg-gold/15",
  },
];

export default function PrivacyPage() {
  return (
    <div className="bg-page-bg min-h-screen">
      {/* Hero Header */}
      <section className="relative bg-navy text-white py-16 sm:py-20 overflow-hidden border-b border-white/10">
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-teal/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-10 w-72 h-72 bg-purple/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal/15 border border-teal/30 text-xs font-semibold text-teal mb-4 backdrop-blur-md">
            <ShieldCheck className="w-4 h-4" />
            <span>Citizen-First Privacy Architecture</span>
            <span className="w-1 h-1 rounded-full bg-white/40" />
            <span className="text-white/60">Zero Aadhaar Harvesting</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Privacy &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal to-purple-light">Data Protection Policy</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-white/75 max-w-3xl leading-relaxed">
            Citizens seeking public service verification should never have to sacrifice their privacy.
            HAQ is engineered around strict data minimization, zero credential harvesting, and complete user agency.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Principles */}
        <section>
          <h2 className="text-2xl font-bold text-navy mb-6">
            Core Privacy Commitments
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {privacyPrinciples.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="card-hover bg-card-bg rounded-2xl border border-border p-6 sm:p-7 shadow-sm transition-all duration-300"
                >
                  <div className={`w-11 h-11 rounded-xl ${item.bgColor} flex items-center justify-center ${item.color} mb-4 shadow-sm`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-navy text-base mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* What We Collect vs What We NEVER Collect */}
        <section className="bg-card-bg rounded-2xl border border-border p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-navy mb-6">
            Data Minimization Comparison
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-danger font-bold text-sm">
                <AlertTriangle className="w-4 h-4" />
                <span>What HAQ Will NEVER Ask For:</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-text-secondary">
                <li className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-danger shrink-0 mt-1.5" />
                  <span><strong>12-digit Aadhaar Number or VID:</strong> We never collect national biometric identifiers.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-danger shrink-0 mt-1.5" />
                  <span><strong>One-Time Passwords (OTPs):</strong> HAQ never prompts for SMS or authentication OTPs.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-danger shrink-0 mt-1.5" />
                  <span><strong>SSO / Jan Aadhaar Passwords:</strong> We never request government portal logins.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-danger shrink-0 mt-1.5" />
                  <span><strong>Bank Account or Payment Details:</strong> All core HAQ verification tools are 100% free.</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-teal font-bold text-sm">
                <FileCheck2 className="w-4 h-4" />
                <span>What HAQ Uses for Timeline Verification:</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-text-secondary">
                <li className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-teal shrink-0 mt-1.5" />
                  <span><strong>Application Date:</strong> The calendar date on which you submitted your request.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-teal shrink-0 mt-1.5" />
                  <span><strong>Acknowledgement Date (Optional):</strong> The date stamped on your official receipt.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-teal shrink-0 mt-1.5" />
                  <span><strong>Application Reference Token:</strong> Masked receipt ID for case identification.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-teal shrink-0 mt-1.5" />
                  <span><strong>Delivery Status:</strong> Whether the service is pending, rejected, or completed.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* User Agency & Data Deletion */}
        <section className="bg-card-bg rounded-2xl border border-border p-6 sm:p-7 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-purple/10 flex items-center justify-center text-purple shrink-0 shadow-sm">
              <Trash2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-navy text-base sm:text-lg mb-1">
                Full User Control &amp; Instant Data Erasure
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-4">
                Because HAQ supports private client-side sessions, clearing your browser session storage or
                clicking &quot;Clear Case History&quot; on your Dashboard instantly and permanently removes all
                local case references from your device.
              </p>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-purple hover:text-purple-dark transition-colors"
              >
                <span>Go to Citizen Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
