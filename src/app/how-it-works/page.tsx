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
    color: "purple",
  },
  {
    number: "02",
    icon: FileText,
    title: "Add Your Application Details",
    description:
      "Enter the key dates from your application — when you submitted it, when it was acknowledged, and whether it has been completed. You can also upload a supporting document like a receipt or acknowledgement slip.",
    detail:
      "We only ask for information needed for the comparison. We don't require sensitive personal data like Aadhaar numbers or banking credentials. All dates are validated for consistency.",
    color: "teal",
  },
  {
    number: "03",
    icon: BarChart3,
    title: "Compare Against the Verified Rule",
    description:
      "Our deterministic rule-checking engine calculates the elapsed time using the verified service deadline parameters. It uses the documented deadline basis (e.g., calendar days from submission) and produces a clear, arithmetic result.",
    detail:
      "The calculation is transparent: you can see exactly which start date was used, how many days have elapsed, what the stated limit is, and what the difference is. No AI is needed for this step — it's pure arithmetic.",
    color: "gold-dark",
  },
  {
    number: "04",
    icon: Lightbulb,
    title: "Review the Result & Take Action",
    description:
      "Review the structured result showing whether a possible timeline mismatch was identified. Inspect the source rule, understand the caveats, and follow the recommended next steps — such as contacting the department or filing a grievance through the appropriate official channel.",
    detail:
      "If AI is available, an additional plain-language explanation is generated. But the core result never depends on AI — it's always based on verified rules and deterministic calculations.",
    color: "danger",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="bg-page-bg">
      {/* Header */}
      <section className="bg-navy text-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-sm text-white/80 mb-4">
              <Eye className="w-3.5 h-3.5 text-teal" />
              Transparent process
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              How HAQ Works
            </h1>
            <p className="mt-4 text-lg text-white/70 leading-relaxed">
              A clear, four-step process from selecting a service to
              understanding your next action. Every step is transparent and
              every source is inspectable.
            </p>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div
                    className="hidden sm:block absolute left-6 top-20 w-0.5 h-[calc(100%+1rem)] bg-border"
                    aria-hidden="true"
                  />
                )}
                <div className="bg-card-bg rounded-2xl p-6 sm:p-8 border border-border shadow-sm">
                  <div className="flex items-start gap-4 sm:gap-6">
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-navy text-white flex items-center justify-center font-bold text-sm">
                      {step.number}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <step.icon className="w-5 h-5 text-purple" />
                        <h2 className="text-xl font-bold text-navy">
                          {step.title}
                        </h2>
                      </div>
                      <p className="text-text-secondary leading-relaxed">
                        {step.description}
                      </p>
                      <div className="mt-4 p-3 bg-page-bg rounded-lg border border-border-light">
                        <p className="text-sm text-text-muted flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                          {step.detail}
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

      {/* Important Note */}
      <section className="pb-16 sm:pb-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="bg-gold/10 border border-gold/30 rounded-2xl p-6 sm:p-8">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-gold-dark shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-navy mb-2">
                  Important: What HAQ Does Not Do
                </h3>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li>
                    • HAQ provides <strong>informational assistance</strong>,
                    not legal advice or legal representation.
                  </li>
                  <li>
                    • A timeline mismatch alone does not prove a legal
                    violation, corruption, or negligence.
                  </li>
                  <li>
                    • HAQ never files complaints automatically — all official
                    actions must be taken by you through the appropriate
                    government channel.
                  </li>
                  <li>
                    • Rules marked as &quot;Unverified&quot; or &quot;Synthetic&quot; are for
                    demonstration only and must not be relied upon.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-16 sm:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3.5 text-base font-semibold bg-purple hover:bg-purple-dark text-white rounded-xl transition-colors shadow-md"
          >
            <Shield className="w-5 h-5" />
            Check a Service Now
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
