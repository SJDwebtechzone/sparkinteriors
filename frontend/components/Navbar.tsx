"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const links = [
  { name: "Home", href: "/#home" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/portfolio" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <nav className="navbar-container">

        {/* Logo */}
        <a href="/#home" className="navbar-logo flex items-center gap-3.5 group">
          <Image
            src="/spark-logo-transparent.png"
            alt="Spark Interiors Logo"
            width={72}
            height={72}
            priority
            unoptimized
            className="w-[70px] h-[70px] object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <div className="flex flex-col justify-center leading-none select-none">
            <span className="font-serif text-[22px] sm:text-[24px] tracking-[0.14em] font-bold text-[#F3C33D] drop-shadow-[0_2px_8px_rgba(243,195,61,0.25)]">
              SPARK
            </span>
            <span className="text-[10px] sm:text-[10.5px] uppercase tracking-[0.32em] text-[#E2E8F0] font-semibold mt-1">
              INTERIORS
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="navbar-links">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="navbar-link"
            >
              {link.name}
            </a>
          ))}

          <a href="/contact" className="quote-button">
            Get a Quote
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Open navigation menu"
        >
          {menuOpen ? "CLOSE" : "MENU"}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="mobile-menu">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="mobile-link"
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}

          <a
            href="/contact"
            className="mobile-quote"
            onClick={() => setMenuOpen(false)}
          >
            Get a Quote
          </a>
        </div>
      )}
    </header>
  );
}