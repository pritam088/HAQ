"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Menu,
  X,
  Shield,
  ChevronRight,
} from "lucide-react";

const navLinks = [
  { href: "/how-it-works", label: "How It Works" },
  { href: "/services", label: "Services" },
  { href: "/sources", label: "Sources" },
  { href: "/dashboard", label: "Dashboard" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <nav
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
            aria-label="HAQ Home"
          >
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-navy text-white font-black text-sm tracking-tight">
              HAQ
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-navy font-extrabold text-lg tracking-tight">
                HAQ
              </span>
              <span className="text-[10px] text-text-secondary font-medium -mt-0.5">
                आपका अधिकार
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-text-secondary hover:text-navy rounded-lg hover:bg-page-bg transition-colors duration-150"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-purple hover:bg-purple-dark rounded-lg transition-colors duration-150 shadow-sm"
            >
              <Shield className="w-4 h-4" />
              Check a Service
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-text-secondary hover:text-navy hover:bg-page-bg transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-border-light mt-1 pt-3">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2.5 text-sm font-medium text-text-secondary hover:text-navy rounded-lg hover:bg-page-bg transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 pt-2 border-t border-border-light">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-white bg-purple hover:bg-purple-dark rounded-lg transition-colors w-full justify-center"
                  onClick={() => setMobileOpen(false)}
                >
                  <Shield className="w-4 h-4" />
                  Check a Service
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
