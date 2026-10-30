"use client";

import Link from "next/link";
import { Shield, ExternalLink, Heart, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-navy text-white/80 overflow-hidden">
      {/* Subtle decorative gradient */}
      <div className="absolute inset-0 opacity-30" aria-hidden="true"
        style={{
          background: "radial-gradient(ellipse at 80% 100%, rgba(109,63,214,0.15) 0%, transparent 50%)"
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-purple to-purple-dark text-white font-black text-xs shadow-sm">
                HAQ
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-white font-extrabold text-base">
                  HAQ
                </span>
                <span className="text-[10px] text-white/55 font-medium">
                  आपका अधिकार
                </span>
              </div>
            </div>
            <p className="text-sm text-white/55 leading-relaxed">
              Citizen-service verification assistant.
              <br />
              Government rules, made usable.
            </p>
            <div className="mt-4 inline-flex items-center gap-1.5 px-2.5 py-1 glass-dark rounded-lg text-xs text-white/65">
              <Shield className="w-3 h-3" />
              Informational tool — not legal advice
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-3 tracking-wide">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/how-it-works"
                  className="text-sm text-white/55 hover:text-white transition-colors duration-200"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-sm text-white/55 hover:text-white transition-colors duration-200"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/sources"
                  className="text-sm text-white/55 hover:text-white transition-colors duration-200"
                >
                  Sources
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-3 tracking-wide">
              Transparency
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-white/55 hover:text-white transition-colors duration-200"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="/limitations"
                  className="text-sm text-white/55 hover:text-white transition-colors duration-200"
                >
                  Limitations
                </Link>
              </li>
              <li>
                <Link
                  href="/sources"
                  className="text-sm text-white/55 hover:text-white transition-colors duration-200"
                >
                  Source Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Team */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-3 tracking-wide">Team</h3>
            <p className="text-sm text-white/55 mb-1">
              Craftora: Build The AI For YOU 2026
            </p>
            <p className="text-sm text-white/80 font-semibold">Team PreetIQ</p>
            <ul className="mt-2 space-y-1 text-xs text-white/45">
              <li>Pritam Bairwa — Team Leader</li>
              <li>Sonali Agarwal</li>
              <li>Vikas Bairwa</li>
            </ul>
            <a
              href="https://github.com/pritam088/HAQ"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-white/70 hover:text-white border border-white/10 transition-colors duration-200"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub Repository</span>
              <ExternalLink className="w-3 h-3 text-white/40" />
            </a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/35 flex items-center gap-1">
            © 2026 HAQ — आपका अधिकार. Built with
            <Heart className="w-3 h-3 text-danger/60" />
            by Team PreetIQ.
          </p>
          <p className="text-xs text-white/25">
            Not an official government product. Not legal advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
