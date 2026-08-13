"use client";

import Image from "next/image";
import { useState } from "react";

const links = [
  { name: "Home", href: "#home" },
  { name: "Projects", href: "#projects" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <nav className="navbar-container">

        {/* Logo */}
        <a href="#home" className="navbar-logo">
          <Image
            src="/sparklogo.png"
            alt="Spark Interiors"
            width={150}
            height={60}
            priority
            className="logo-image"
          />
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

          <a href="#contact" className="quote-button">
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
            href="#contact"
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