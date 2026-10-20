"use client";

import Link from "next/link";
import { Shield, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-navy text-white/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple text-white font-black text-xs">
                HAQ
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-white font-extrabold text-base">
                  HAQ
                </span>
                <span className="text-[10px] text-white/60 font-medium">
                  आपका अधिकार
                </span>
              </div>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              Citizen-service verification assistant.
              <br />
              Government rules, made usable.
            </p>
            <div className="mt-4 inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/10 rounded-md text-xs text-white/70">
              <Shield className="w-3 h-3" />
              Informational tool — not legal advice
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-3">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/how-it-works"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/sources"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  Sources
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-3">
              Transparency
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="/limitations"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  Limitations
                </Link>
              </li>
              <li>
                <Link
                  href="/sources"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  Source Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Team */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-3">Team</h3>
            <p className="text-sm text-white/60 mb-1">
              Craftora: Build The AI For YOU 2026
            </p>
            <p className="text-sm text-white/80 font-medium">Team PreetIQ</p>
            <ul className="mt-2 space-y-1 text-xs text-white/50">
              <li>Pritam Bairwa — Team Leader</li>
              <li>Sonali Agarwal</li>
              <li>Vikas Bairwa</li>
            </ul>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mt-3 text-xs text-white/50 hover:text-white/80 transition-colors"
            >
              <ExternalLink className="w-3 h-3" />
              GitHub Repository
            </a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">
            © 2026 HAQ — आपका अधिकार. Concept prototype
            by Team PreetIQ.
          </p>
          <p className="text-xs text-white/30">
            Not an official government product. Not legal advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
