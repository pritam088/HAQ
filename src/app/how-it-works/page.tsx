import {
  Search,
  FileText,
  BarChart3,
  Lightbulb,
  ArrowRight,
  Shield,
  CheckCircle2,
  Eye,
  AlertTriangle,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How It Works | HAQ — आपका अधिकार",
  description:
    "Learn how HAQ helps you understand government service rules, compare your application evidence, and discover actionable next steps.",
};

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Select a Government Service",
    description:
      "Browse our service catalog and select the specific government service you applied for. Each service in our catalog includes its name, department, state, and — where verified — the applicable service timeline, fees, and required documents.",
    detail:
      "Services are organized by state and department. Each listing shows its verification status so you know whether the information has been reviewed.",
    badge: "Catalog Discovery",
    color: "from-purple/20 to-purple/5",
    iconColor: "text-purple",
  },
  {
    number: "02",
    icon: FileText,
    title: "Add Your Application Details",
    description:
      "Enter the key dates from your application — when you submitted it, when it was acknowledged, and whether it has been completed. You can also upload a supporting document like a receipt or acknowledgement slip to autofill details.",
    detail:
      "We only ask for information needed for the comparison. We don't require sensitive personal data like Aadhaar numbers or banking credentials. All dates are validated for consistency.",
    badge: "Evidence Input",
    color: "from-teal/20 to-teal/5",
    iconColor: "text-teal",
  },
  {
    number: "03",
    icon: BarChart3,
    title: "Compare Against the Verified Rule",
    description:
      "Our deterministic rule-checking engine calculates the elapsed time using the verified service deadline parameters. It uses the documented deadline basis (e.g., calendar days from submission) and produces a clear, arithmetic result.",
    detail:
      "The calculation is transparent: you can see exactly which start date was used, how many days have elapsed, what the stated limit is, and what the difference is. No AI is needed for this step — it's pure arithmetic.",
    badge: "Deterministic Engine",
    color: "from-gold/20 to-gold/5",
    iconColor: "text-gold-dark",
  },
  {
    number: "04",
    icon: Lightbulb,
    title: "Review the Result & Take Action",
    description:
      "Review the structured result showing whether a possible timeline mismatch was identified. Inspect the source rule, understand the caveats, and follow the recommended next steps — such as contacting the department or filing a grievance through the appropriate official channel.",
    detail:
      "If AI is available, an additional plain-language explanation is generated. But the core result never depends on AI — it's always based on verified rules and deterministic calculations.",
    badge: "Actionable Guidance",
    color: "from-navy/20 to-navy/5",
    iconColor: "text-navy",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="bg-page-bg min-h-screen">
      {/* Premium Hero Header */}
      <section className="relative bg-navy text-white py-16 sm:py-20 overflow-hidden">
        {/* Subtle decorative glowing orbs */}
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-purple/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-10 w-72 h-72 bg-teal/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs sm:text-sm text-white/90 mb-4 backdrop-blur-md">
              <Eye className="w-3.5 h-3.5 text-teal" />
              <span>Transparent Civic Process</span>
              <span className="w-1 h-1 rounded-full bg-white/40" />
              <span className="text-white/60">Zero Black-Box Math</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              How <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal to-purple-light">HAQ</span> Works
            </h1>
            <p className="mt-4 text-lg text-white/75 leading-relaxed font-normal">
              A transparent, four-step journey from selecting a service to
              understanding your statutory rights. Every step is deterministic,
              inspectable, and verifiable against primary government charters.
            </p>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={step.number} className="relative group">
                {/* Connector line between steps */}
                {index < steps.length - 1 && (
                  <div
                    className="hidden sm:block absolute left-8 top-20 w-0.5 h-[calc(100%+2rem)] bg-gradient-to-b from-purple/30 to-border"
                    aria-hidden="true"
                  />
                )}
                <div className="card-hover bg-card-bg rounded-2xl p-6 sm:p-8 border border-border/80 shadow-sm relative transition-all duration-300">
                  <div className="flex items-start gap-4 sm:gap-6">
                    <div className="shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-navy to-navy-light text-white flex flex-col items-center justify-center font-extrabold text-base shadow-md border border-white/10">
                      <span>{step.number}</span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <step.icon className={`w-5 h-5 ${step.iconColor}`} />
                          <h2 className="text-xl font-bold text-navy group-hover:text-purple transition-colors">
                            {step.title}
                          </h2>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-page-bg border border-border text-text-secondary">
                          {step.badge}
                        </span>
                      </div>

                      <p className="text-text-secondary leading-relaxed text-sm sm:text-base">
                        {step.description}
                      </p>

                      <div className="mt-4 p-3.5 bg-page-bg rounded-xl border border-border-light">
                        <p className="text-xs sm:text-sm text-text-muted flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                          <span>{step.detail}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Boundaries Note */}
      <section className="pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="bg-gold/10 border border-gold/30 rounded-2xl p-6 sm:p-8 shadow-sm backdrop-blur-sm">
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-gold/20 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-gold-dark" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-navy mb-2 flex items-center gap-2">
                  <span>Important: What HAQ Does Not Do</span>
                </h3>
                <ul className="space-y-2 text-sm text-text-secondary leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-gold-dark font-bold">•</span>
                    <span>
                      HAQ provides <strong>informational assistance and rule evaluation</strong>, not legal representation or official judicial counsel.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold-dark font-bold">•</span>
                    <span>
                      An arithmetic timeline mismatch alone does not prove corruption or intentional misconduct; official administrative clock pauses may apply.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold-dark font-bold">•</span>
                    <span>
                      HAQ never submits complaints automatically without citizen consent — all official filings remain fully in your hands.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold-dark font-bold">•</span>
                    <span>
                      Rules marked as &quot;Unverified&quot; or &quot;Synthetic&quot; are for demonstration only and should be cross-checked against primary portals.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex flex-col items-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 text-base font-semibold bg-gradient-to-r from-purple to-purple-dark hover:from-purple-dark hover:to-navy text-white rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              <Shield className="w-5 h-5" />
              <span>Check a Government Service Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-xs text-text-muted mt-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple" />
              No signup required • 100% Free &amp; Private
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
