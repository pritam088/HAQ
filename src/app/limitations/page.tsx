import Link from "next/link";
import {
  AlertTriangle,
  Scale,
  Building,
  CalendarClock,
  HelpCircle,
  ShieldAlert,
  ArrowRight,
  ExternalLink,
  Sparkles,
} from "lucide-react";

export const metadata = {
  title: "Limitations & Ethical Truthfulness | HAQ — आपका अधिकार",
  description:
    "Review HAQ's critical legal boundaries, civic truthfulness disclosures, and computational limitations.",
};

const limitations = [
  {
    icon: Scale,
    title: "1. Informational Assistance, Not Legal Advice",
    content:
      "HAQ provides automated rule verification and educational timeline calculations. It does not provide legal advice, judicial counsel, or statutory guarantees. For contentious administrative disputes or judicial filings, consult a qualified advocate or legal aid clinic.",
    color: "text-purple",
    bgColor: "bg-purple/10",
  },
  {
    icon: Building,
    title: "2. Independent Civic Technology — No Official Endorsement",
    content:
      "HAQ is an independent civic-tech project developed by Team PreetIQ for the Craftora: Build The AI For YOU 2026 hackathon. HAQ is NOT an official government website, is NOT sponsored by the Government of Rajasthan or Government of India, and has NOT received departmental certification.",
    color: "text-teal",
    bgColor: "bg-teal/10",
  },
  {
    icon: CalendarClock,
    title: "3. Timeline Mismatch ≠ Proof of Wrongdoing or Violation",
    content:
      "An arithmetic difference between your elapsed days and a stated service limit does NOT establish corruption, illegality, negligence, or departmental misconduct. Official service charters allow statutory clock pauses for applicant document deficiencies, field revenue inspections, tehsildar inquiries, and gazetted public holidays.",
    color: "text-gold-dark",
    bgColor: "bg-gold/15",
  },
  {
    icon: HelpCircle,
    title: "4. Synthetic Demonstration Models in This MVP",
    content:
      "To safeguard citizen accuracy while public service APIs are unintegrated, all service rules, fees, and timelines featured in this MVP (including Rajasthan Caste & Domicile certificates) are clearly classified as synthetic demonstration datasets. Real statutory parameters must be verified on official state portals.",
    color: "text-navy",
    bgColor: "bg-navy/10",
  },
];

export default function LimitationsPage() {
  return (
    <div className="bg-page-bg min-h-screen">
      {/* Hero Header */}
      <section className="relative bg-navy text-white py-16 sm:py-20 overflow-hidden border-b border-white/10">
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-gold/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-10 w-72 h-72 bg-purple/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/15 border border-gold/30 text-xs font-semibold text-gold mb-4 backdrop-blur-md">
            <ShieldAlert className="w-4 h-4 text-gold" />
            <span>Civic Truthfulness &amp; Ethics Policy</span>
            <span className="w-1 h-1 rounded-full bg-white/40" />
            <span className="text-white/60">Strict Boundaries</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Limitations, Disclaimers &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-teal">Truthfulness</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-white/75 max-w-3xl leading-relaxed">
            In civic technology, transparency is paramount. We believe in being honest about
            what HAQ can calculate, what it cannot determine, and why strict boundaries protect citizens.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Core Boundaries */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {limitations.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="card-hover bg-card-bg rounded-2xl border border-border p-6 sm:p-7 shadow-sm flex flex-col justify-between transition-all duration-300"
              >
                <div>
                  <div className={`w-11 h-11 rounded-xl ${item.bgColor} flex items-center justify-center ${item.color} mb-4 shadow-sm`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-navy mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                    {item.content}
                  </p>
                </div>
              </div>
            );
          })}
        </section>

        {/* Detailed Breakdown: How Date Counting Differs in Law */}
        <section className="bg-card-bg rounded-2xl border border-border p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold text-navy mb-3">
            Understanding Service Timeline Nuances in Rajasthan
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary mb-6 leading-relaxed max-w-3xl">
            Calculating government service deadlines under the Rajasthan Guaranteed Delivery of
            Public Services Act (RGDPSA) involves multiple legal nuances that simple date subtraction ignores:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-xs sm:text-sm">
            <div className="p-5 rounded-xl bg-page-bg border border-border-light">
              <h4 className="font-bold text-navy text-sm mb-2">
                1. Working Days vs. Calendar Days
              </h4>
              <p className="text-text-secondary leading-relaxed text-xs">
                Most departmental charters prescribe <em>working days</em>. Government holidays,
                second/fourth Saturdays, and Sundays are excluded from the official countdown.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-page-bg border border-border-light">
              <h4 className="font-bold text-navy text-sm mb-2">
                2. Application Clock Pauses
              </h4>
              <p className="text-text-secondary leading-relaxed text-xs">
                If the issuing officer requests additional documents (objection / <em>aapatti</em>),
                the statutory timer is formally suspended until the citizen responds.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-page-bg border border-border-light">
              <h4 className="font-bold text-navy text-sm mb-2">
                3. First Appeal Windows
              </h4>
              <p className="text-text-secondary leading-relaxed text-xs">
                When a designated officer fails to deliver within the timeline, citizens typically
                have 30 days to lodge an appeal with the Designated First Appellate Authority.
              </p>
            </div>
          </div>
        </section>

        {/* What to do when a mismatch occurs */}
        <section className="relative bg-gradient-to-br from-navy via-navy to-navy-light text-white rounded-2xl p-6 sm:p-8 shadow-md overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-2xl pointer-events-none" />

          <h2 className="text-xl sm:text-2xl font-bold mb-3">
            What Should You Do If HAQ Identifies a Potential Mismatch?
          </h2>
          <p className="text-xs sm:text-sm text-white/75 mb-6 max-w-3xl leading-relaxed">
            Do not jump to hostile accusations. Most government delays stem from staff backlog or document
            clarifications. Follow this recommended constructive path:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="bg-white/10 rounded-xl p-4 border border-white/15 backdrop-blur-sm">
              <span className="text-gold font-extrabold text-sm block mb-1">Step 1</span>
              <p className="text-white/80 leading-relaxed">
                Check your eMitra token or application status on the official portal to see if an
                objection was raised.
              </p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 border border-white/15 backdrop-blur-sm">
              <span className="text-gold font-extrabold text-sm block mb-1">Step 2</span>
              <p className="text-white/80 leading-relaxed">
                Contact your nearest eMitra kiosk or call Rajasthan 181 (CM Helpline) for polite clarification.
              </p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 border border-white/15 backdrop-blur-sm">
              <span className="text-gold font-extrabold text-sm block mb-1">Step 3</span>
              <p className="text-white/80 leading-relaxed">
                Use HAQ&apos;s Draft Generator to formulate a polite, factual representation citing your
                acknowledgement receipt.
              </p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-white/15 flex flex-wrap gap-4 items-center justify-between">
            <span className="text-xs text-white/60">
              Ready to verify a service application?
            </span>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple to-purple-dark hover:from-purple-dark hover:to-navy text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md active:scale-95"
            >
              <span>Browse Catalog Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
