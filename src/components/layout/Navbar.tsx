"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Shield,
  ChevronRight,
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

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
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
            className="flex items-center gap-2.5 group"
            aria-label="HAQ Home"
          >
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-navy text-white font-black text-sm tracking-tight overflow-hidden group-hover:shadow-lg group-hover:shadow-purple/15 transition-shadow duration-300">
              <span className="relative z-10">HAQ</span>
              <div className="absolute inset-0 bg-gradient-to-br from-purple/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
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

        {/* Mobile menu with slide animation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileOpen ? "max-h-80 pb-4 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border-t border-border-light mt-1 pt-3">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? "text-purple bg-purple/8"
                        : "text-text-secondary hover:text-navy hover:bg-page-bg"
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="mt-2 pt-2 border-t border-border-light">
                <Link
                  href="/payments/check"
                  className="btn-press inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-purple to-purple-dark rounded-xl transition-colors w-full justify-center shadow-sm"
                  onClick={() => setMobileOpen(false)}
                >
                  <Shield className="w-4 h-4 text-gold" />
                  Verify a Payment Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
