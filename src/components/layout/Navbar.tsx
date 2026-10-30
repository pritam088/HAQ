"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Shield,
  ChevronRight,
  Sparkles,
} from "lucide-react";

const navLinks = [
  { href: "/payments/check", label: "Check a Payment", badge: "NEW" },
  { href: "/services", label: "Services & Rates" },
  { href: "/cases/new", label: "Verify Timeline" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/sources", label: "Sources" },
  { href: "/dashboard", label: "Dashboard" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change & handle body scroll lock
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const openHaqSaathi = () => {
    setMobileOpen(false);
    window.dispatchEvent(new CustomEvent("open-haq-saathi"));
  };

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`sticky top-0 z-[80] transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-sm border-b border-border/50"
          : "bg-white/95 backdrop-blur-sm border-b border-border"
      }`}
    >
      <nav
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center group py-0.5"
            aria-label="HAQ — आपका अधिकार"
          >
            <img
              src="/haq-logo-light.png"
              alt="HAQ — आपका अधिकार"
              className="h-9 sm:h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href + "/"));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? "text-purple bg-purple/10 font-bold"
                      : "text-text-secondary hover:text-navy hover:bg-page-bg"
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="px-1.5 py-0.2 rounded-full text-[9px] font-black bg-teal text-white leading-tight">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* CTA & Hak Saathi AI Trigger */}
          <div className="hidden md:flex items-center gap-2.5">
            <button
              type="button"
              onClick={openHaqSaathi}
              className="btn-press inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-navy hover:text-purple bg-purple/10 hover:bg-purple/15 rounded-xl border border-purple/20 transition-all shadow-2xs cursor-pointer active:scale-95"
              id="desktop-open-haq-saathi"
              title="Open Hak Saathi (Civic AI Assistant)"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple animate-pulse" />
              <span>हक साथी (AI)</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </button>

            <Link
              href="/payments/check"
              className="btn-press inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-purple to-purple-dark hover:from-purple-dark hover:to-navy rounded-xl transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-purple/15 active:scale-95"
            >
              <Shield className="w-3.5 h-3.5 text-gold" />
              <span>Verify Payment</span>
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
      </nav>

      {/* Mobile Backdrop Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 top-16 bg-navy/60 backdrop-blur-xs z-40 md:hidden animate-fade-in"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Panel */}
      <div
        className={`fixed inset-x-0 top-16 bottom-0 bg-white shadow-2xl z-50 md:hidden transition-all duration-300 ease-in-out overflow-y-auto flex flex-col justify-between ${
          mobileOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="p-4 space-y-3">
          {/* Hak Saathi AI Top Trigger */}
          <div>
            <button
              type="button"
              onClick={openHaqSaathi}
              className="btn-press flex items-center justify-between px-3.5 py-3 text-sm font-bold rounded-xl text-purple bg-purple/10 hover:bg-purple/15 border border-purple/20 transition-all w-full text-left shadow-2xs cursor-pointer"
              id="mobile-open-haq-saathi"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple animate-pulse" />
                <span>हक साथी (Ask HAQ AI)</span>
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-teal text-white leading-tight">
                AI ONLINE
              </span>
            </button>
          </div>

          <div className="space-y-1 divide-y divide-border-light/60">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname?.startsWith(link.href + "/"));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center justify-between px-3.5 py-3 text-sm font-semibold rounded-xl transition-all ${
                    isActive
                      ? "text-purple bg-purple/10 font-bold"
                      : "text-navy hover:text-purple hover:bg-page-bg"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  <span>{link.label}</span>
                  {link.badge ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-teal text-white leading-tight">
                      {link.badge}
                    </span>
                  ) : (
                    <ChevronRight className="w-4 h-4 text-text-muted" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Bottom Actions & Trust Footnote */}
        <div className="p-4 border-t border-border-light bg-page-bg/50 space-y-3">
          <Link
            href="/payments/check"
            className="btn-press flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-bold text-white bg-gradient-to-r from-purple to-purple-dark hover:from-purple-dark hover:to-navy rounded-xl shadow-md active:scale-95 transition-all text-center"
            onClick={() => setMobileOpen(false)}
          >
            <Shield className="w-4 h-4 text-gold" />
            <span>Verify a Payment Now</span>
            <ChevronRight className="w-4 h-4" />
          </Link>

          <div className="text-[11px] text-text-muted flex items-center justify-between pt-1">
            <span>DoIT&amp;C Grounded Civics</span>
            <span className="font-semibold text-purple">Helpline: 181 (Toll-Free)</span>
          </div>
        </div>
      </div>
    </header>
  );
}
