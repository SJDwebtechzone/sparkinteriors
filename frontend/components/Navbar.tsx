"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const links = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/portfolio" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/" || pathname === "";
    return pathname?.startsWith(href);
  };

  return (
    <header 
      className={`fixed top-0 inset-x-0 z-50 w-full transition-all duration-500 select-none ${
        scrolled
          ? "h-[78px] sm:h-[84px] shadow-[0_12px_36px_-6px_rgba(0,0,0,0.65),0_4px_16px_rgba(213,147,24,0.22)]"
          : "h-[82px] sm:h-[90px] shadow-[0_8px_24px_-4px_rgba(0,0,0,0.45)]"
      }`}
      style={{
        background: scrolled
          ? "linear-gradient(135deg, rgba(22, 54, 80, 0.98) 0%, rgba(18, 46, 70, 0.98) 50%, rgba(14, 38, 60, 0.99) 100%)"
          : "linear-gradient(135deg, rgba(28, 68, 100, 0.94) 0%, rgba(22, 56, 84, 0.95) 50%, rgba(18, 46, 72, 0.96) 100%)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "2px solid #D59318",
        boxShadow: scrolled
          ? "0 10px 30px -5px rgba(0, 0, 0, 0.7), 0 4px 15px -2px rgba(213, 147, 24, 0.25)"
          : "0 6px 20px -4px rgba(0, 0, 0, 0.45)"
      }}
    >
      
      {/* Full-width container with responsive max-width content alignment */}
      <div className="max-w-[1440px] mx-auto w-full h-full px-4 sm:px-8 lg:px-12 flex items-center justify-between">

        {/* Official Authentic Spark Interiors Logo Emblem */}
        <Link 
          href="/" 
          className="flex items-center gap-3.5 sm:gap-4 group flex-shrink-0 shrink-0 select-none whitespace-nowrap" 
          aria-label="Spark Interiors Home"
        >
          <Image
            src="/spark-logo-clarity.png"
            alt="Spark Interiors Logo"
            width={90}
            height={78}
            priority
            unoptimized
            className="w-[70px] h-[60px] sm:w-[82px] sm:h-[70px] object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)] transition-transform duration-300 group-hover:scale-105"
          />
          <div className="flex flex-col justify-center leading-none flex-shrink-0 shrink-0">
            <span
              className="font-serif text-[24px] sm:text-[28px] tracking-[0.18em] font-extrabold leading-none"
              style={{
                color: "#F3C33D",
                textShadow: "0 2px 10px rgba(243, 195, 61, 0.45), 0 1px 2px rgba(0, 0, 0, 0.9)"
              }}
            >
              SPARK
            </span>
            <span
              className="text-[10.5px] sm:text-[12px] uppercase tracking-[0.36em] font-black mt-1 leading-none text-white/90"
              style={{ 
                textShadow: "0 1px 3px rgba(0, 0, 0, 0.8)"
              }}
            >
              INTERIORS
            </span>
          </div>
        </Link>

        {/* Desktop Links & Action Button */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <nav className="flex items-center gap-1.5 lg:gap-2">
            {links.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-4 py-2 rounded-xl text-[14.5px] font-semibold tracking-wide transition-all duration-300 ${
                    active
                      ? "text-[#F3C33D] bg-white/10 shadow-sm border border-[#F3C33D]/30 font-bold"
                      : "text-slate-100/90 hover:text-[#F3C33D] hover:bg-white/10"
                  }`}
                >
                  <span>{link.name}</span>
                  {active && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-[#F3C33D] rounded-full shadow-[0_0_8px_rgba(243,195,61,0.8)]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Brushed Brass CTA Button */}
          <Link
            href="/contact"
            className="px-6 sm:px-7 py-2.5 sm:py-3 rounded-full text-[13.5px] sm:text-[14px] font-bold tracking-wide transition-all duration-300 hover:scale-[1.03] active:scale-95 inline-flex items-center gap-2 group shadow-md"
            style={{
              background: "linear-gradient(135deg, #F3C33D 0%, #D59318 55%, #B8760B 100%)",
              color: "#FFFFFF",
              textShadow: "0 1px 2px rgba(0, 0, 0, 0.35)",
              boxShadow: "0 6px 18px rgba(184, 118, 11, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.55), inset 0 -1px 2px rgba(0, 0, 0, 0.25)"
            }}
          >
            <span>Get a Quote</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1 font-bold">→</span>
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden px-4 py-2 rounded-xl border border-[#D59318]/50 bg-black/40 text-[#F3C33D] text-xs font-bold tracking-widest uppercase transition-all active:scale-95 shadow-sm flex items-center gap-1.5"
          aria-label="Toggle navigation menu"
        >
          <span>{menuOpen ? "CLOSE" : "MENU"}</span>
          <span className="text-[#D59318] text-[11px]">✦</span>
        </button>

      </div>

      {/* Mobile Full-Width Dropdown Drawer */}
      {menuOpen && (
        <div
          className="md:hidden absolute top-full inset-x-0 w-full p-6 border-b-2 border-[#D59318] shadow-[0_25px_60px_rgba(0,0,0,0.8)] flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-300 select-none"
          style={{
            background: "linear-gradient(135deg, rgba(28, 68, 100, 0.99) 0%, rgba(18, 46, 72, 0.99) 100%)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)"
          }}
        >
          <div className="max-w-[1440px] mx-auto w-full px-2 flex flex-col gap-3.5">
            {links.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-base font-semibold transition-colors py-2 px-3 rounded-lg ${
                    active ? "text-[#F3C33D] bg-white/10 font-bold" : "text-slate-100 hover:text-[#F3C33D]"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
                </Link>
              );
            })}

            <Link
              href="/contact"
              className="mt-2 w-full py-3.5 rounded-full text-center text-sm font-bold tracking-wide shadow-md inline-flex items-center justify-center gap-2"
              style={{
                background: "linear-gradient(135deg, #F3C33D 0%, #D59318 55%, #B8760B 100%)",
                color: "#FFFFFF",
                textShadow: "0 1px 2px rgba(0, 0, 0, 0.35)"
              }}
              onClick={() => setMenuOpen(false)}
            >
              <span>Get a Quote</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      )}

    </header>
  );
}
