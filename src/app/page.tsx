import Link from "next/link";
import {
  Shield,
  FileSearch,
  Scale,
  ChevronRight,
  BookOpen,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Search,
  FileText,
  BarChart3,
  Lightbulb,
  Eye,
  HelpCircle,
  Lock,
} from "lucide-react";

export default function HomePage() {
  return (
    <>
      {/* ====== HERO SECTION ====== */}
      <section className="relative overflow-hidden bg-navy text-white">
        {/* Subtle gradient decoration */}
        <div
          className="absolute inset-0 opacity-20"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse at 20% 50%, rgba(109,63,214,0.4) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(18,184,134,0.3) 0%, transparent 60%)",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-sm text-white/80 mb-6">
              <Shield className="w-3.5 h-3.5 text-teal" />
              Citizen-service verification assistant
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
              Know the Rule.
              <br />
              <span className="text-teal">Check the Reality.</span>
              <br />
              Take Action.
            </h1>

            {/* Supporting copy */}
            <p className="mt-6 text-lg sm:text-xl text-white/70 leading-relaxed max-w-2xl">
              Understand applicable government service rules, compare your
              application evidence, and discover your next step — with sources
              you can inspect.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold bg-purple hover:bg-purple-light text-white rounded-xl transition-colors duration-200 shadow-lg shadow-purple/25"
                id="cta-check-service"
              >
                <Shield className="w-5 h-5" />
                Check a Service
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold bg-white/10 hover:bg-white/15 text-white rounded-xl transition-colors duration-200 border border-white/15"
                id="cta-how-it-works"
              >
                <BookOpen className="w-5 h-5" />
                See How It Works
              </Link>
            </div>

            {/* Disclaimer */}
            <p className="mt-6 text-xs text-white/40 flex items-start gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
              HAQ provides informational assistance, not legal advice. Not an
              official government product.
            </p>
          </div>
        </div>
      </section>

      {/* ====== HOW IT WORKS ====== */}
      <section className="py-16 sm:py-24 bg-page-bg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy">
              How HAQ Works
            </h2>
            <p className="mt-3 text-text-secondary text-lg max-w-2xl mx-auto">
              Four clear steps from selecting a service to understanding your
              next action.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Search,
                step: "1",
                title: "Select a Service",
                desc: "Choose the government service you applied for from our verified catalog.",
                color: "text-purple",
                bg: "bg-purple/10",
              },
              {
                icon: FileText,
                step: "2",
                title: "Add Your Details",
                desc: "Enter your application dates and any relevant details or upload documents.",
                color: "text-teal",
                bg: "bg-teal/10",
              },
              {
                icon: BarChart3,
                step: "3",
                title: "Compare Against Rule",
                desc: "Our engine calculates the timeline against the verified service limit.",
                color: "text-gold-dark",
                bg: "bg-gold/10",
              },
              {
                icon: Lightbulb,
                step: "4",
                title: "Review & Act",
                desc: "Understand the result, inspect sources, and follow recommended next steps.",
                color: "text-danger",
                bg: "bg-danger/10",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative bg-card-bg rounded-2xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow duration-200"
              >
                <div className="absolute -top-3 -left-1 w-7 h-7 rounded-full bg-navy text-white text-xs font-bold flex items-center justify-center">
                  {item.step}
                </div>
                <div
                  className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center mb-4`}
                >
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-navy mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== CORE VALUES ====== */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy">
              Built on Transparency
            </h2>
            <p className="mt-3 text-text-secondary text-lg max-w-2xl mx-auto">
              Every answer is grounded in verifiable sources and transparent
              calculations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Eye,
                title: "Source-Grounded Answers",
                desc: "Every rule is linked to its official source. You can inspect where the information comes from.",
              },
              {
                icon: Scale,
                title: "Evidence-Based Comparison",
                desc: "Your application details are compared against verified service parameters using deterministic calculations.",
              },
              {
                icon: BarChart3,
                title: "Transparent Calculations",
                desc: "See exactly which inputs were used, how the timeline was computed, and what the deadline basis is.",
              },
              {
                icon: HelpCircle,
                title: "Clear Uncertainty Handling",
                desc: "When information is missing, unverified, or conflicting, the system tells you — it never fabricates confidence.",
              },
              {
                icon: FileSearch,
                title: "Human-Reviewed Sources",
                desc: "Rules go through a review process before they're marked as verified. Unverified rules are clearly labeled.",
              },
              {
                icon: Lock,
                title: "Privacy First",
                desc: "Your documents stay private. No data is shared without disclosure. Sensitive information is handled carefully.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-page-bg rounded-2xl p-6 border border-border-light hover:border-purple/20 transition-colors duration-200"
              >
                <item.icon className="w-8 h-8 text-purple mb-4" />
                <h3 className="text-base font-semibold text-navy mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== TRUST & LIMITATIONS ====== */}
      <section className="py-16 sm:py-24 bg-page-bg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-navy">
                Honest About Our Limitations
              </h2>
              <p className="mt-3 text-text-secondary text-lg">
                We believe transparency builds trust. Here is what HAQ does and
                does not do.
              </p>
            </div>

            <div className="bg-card-bg rounded-2xl shadow-sm border border-border p-6 sm:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* What HAQ does */}
                <div>
                  <h3 className="text-sm font-semibold text-teal uppercase tracking-wider mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    What HAQ does
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Shows verified service rules with sources",
                      "Calculates timelines from your dates",
                      "Identifies possible mismatches",
                      "Suggests next steps with official channels",
                      "Explains how conclusions were reached",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-text-primary"
                      >
                        <CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* What HAQ does not do */}
                <div>
                  <h3 className="text-sm font-semibold text-danger uppercase tracking-wider mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    What HAQ does not do
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Provide legal advice or representation",
                      "Prove a legal violation occurred",
                      "File complaints on your behalf",
                      "Guarantee 100% accuracy",
                      "Replace official government portals",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-text-primary"
                      >
                        <X className="w-4 h-4 text-danger shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== CTA SECTION ====== */}
      <section className="py-16 sm:py-20 bg-navy text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to check your service?
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
            Select a government service, enter your application details, and get
            a transparent, source-grounded assessment.
          </p>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold bg-purple hover:bg-purple-light text-white rounded-xl transition-colors duration-200 shadow-lg shadow-purple/25"
            id="cta-bottom-check"
          >
            Get Started
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}

// Need X icon for limitations
function X({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}
