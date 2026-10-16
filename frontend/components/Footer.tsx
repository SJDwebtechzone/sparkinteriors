"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface FooterServiceItem {
  id: string;
  name: string;
}

const DEFAULT_SERVICES: FooterServiceItem[] = [
  { id: "kitchens", name: "Modular Kitchen" },
  { id: "crochery-unit", name: "Crockery Units" },
  { id: "wardrobes", name: "Wardrobes" },
  { id: "living-rooms", name: "Living Rooms" },
  { id: "pooja-units", name: "Pooja Units" },
  { id: "false-ceilings", name: "False Ceiling" },
  { id: "civil-work", name: "Civil Work" },
  { id: "office-work", name: "Office Work" },
  { id: "commercial-space", name: "Commercial Space" },
];

export default function Footer() {
  const [services, setServices] = useState<FooterServiceItem[]>(DEFAULT_SERVICES);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/services");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setServices(
              data.map((s: { id: string; name: string }) => ({
                id: s.id,
                name: s.name,
              }))
            );
          }
        }
      } catch {
        // Fallback to default services
      }
    };

    fetchServices();

    const handleUpdate = () => {
      fetchServices();
    };

    window.addEventListener("spark_services_updated", handleUpdate);
    window.addEventListener("focus", handleUpdate);
    
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "spark_services_updated") {
        fetchServices();
      }
    };
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("spark_services_updated", handleUpdate);
      window.removeEventListener("focus", handleUpdate);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const midpoint = Math.ceil(services.length / 2);
  const col1 = services.slice(0, midpoint);
  const col2 = services.slice(midpoint);
  return (
    <footer className="relative w-full overflow-hidden border-t border-[#E1D3C1]/80 text-[#2F352F]">
      
      {/* Full-bleed Background Interior Photography - Sharp & Clearly Visible */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <Image
          src="/footer-luxury-interior-bg.jpg"
          alt="Spark Interiors luxury modern living space"
          fill
          unoptimized
          className="object-cover object-right md:object-center brightness-[1] contrast-[1.05]"
          priority
        />
        {/* Soft, warm plaster gradient on the left to guarantee top banner text readability */}
        <div className="absolute inset-y-0 left-0 w-full sm:w-[56%] lg:w-[46%] bg-gradient-to-r from-[#FAF7F2] via-[#FAF7F2]/88 to-transparent z-0" />
      </div>

      {/* =========================================================
          TOP BANNER: EDITORIAL HEADING (Tightly Padded, Compact)
      ========================================================= */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 pt-8 pb-5">
        <div className="flex flex-col items-start max-w-xl">
          
          {/* Spaces That Label */}
          <div className="flex items-center gap-2 mb-2 select-none">
            <span className="h-[1.5px] w-5 bg-[#C08A4E]/80" />
            <span className="text-[10.5px] uppercase tracking-[0.25em] text-[#C08A4E] font-bold leading-none">
              Spaces That
            </span>
            <span className="text-[#C08A4E] text-xs">✦</span>
          </div>

          {/* Large Serif Heading */}
          <h3 className="font-serif text-[34px] sm:text-[44px] lg:text-[50px] leading-[1.1] text-neutral-900 font-normal">
            Inspire <br />
            <span className="text-[#D59318] italic font-serif">Beautiful Living.</span>
          </h3>

          <p className="mt-2 text-xs sm:text-sm text-neutral-700 leading-relaxed max-w-sm font-light">
            Thoughtful design. Timeless spaces.<br />
            Built around you.
          </p>

          <a 
            href="#design-brief" 
            className="group inline-flex items-center gap-2.5 mt-3.5 text-[11px] sm:text-xs font-bold tracking-[0.2em] text-[#C08A4E] hover:text-[#D59318] transition-colors border-b border-[#C08A4E] pb-0.5 uppercase"
          >
            <span>Let's create your space</span>
            <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
          </a>

        </div>
      </div>

      {/* =========================================================
          BOTTOM SECTION: 5 COLUMNS (Slightly Faded Image for Clear Text Readability)
      ========================================================= */}
      <div className="relative z-10 w-full bg-[#FAF6F0]/68 backdrop-blur-[2px] border-t border-[#E1D3C1]/50 pt-5 pb-3">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16">
          
          {/* 5 Columns Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-4 gap-x-6 sm:gap-x-8 lg:gap-8 items-start">
            
            {/* Column 1: Logo, Tagline & Follow Us */}
            <div className="flex flex-col items-start pr-0 lg:pr-4">
              <Link href="/" className="cursor-pointer flex items-center gap-3 group">
                <Image
                  src="/spark-logo-transparent.png"
                  alt="Spark Interiors Logo"
                  width={68}
                  height={68}
                  unoptimized
                  className="w-[66px] h-[66px] object-contain transition-transform duration-300 group-hover:scale-105"
                />
                <div className="flex flex-col justify-center leading-none select-none">
                  <span className="font-serif text-[20px] tracking-[0.14em] font-bold text-[#D59318]">
                    SPARK
                  </span>
                  <span className="text-[9.5px] uppercase tracking-[0.32em] text-[#252A24] font-semibold mt-1">
                    INTERIORS
                  </span>
                </div>
              </Link>
              
              <p className="font-serif text-[14px] sm:text-[15.5px] leading-snug text-neutral-900 font-medium mt-2 max-w-[260px]">
                Creating spaces with intention, warmth and character.
              </p>

              {/* Follow Us */}
              <div className="flex flex-col items-start gap-1 mt-3">
                <h5 className="text-[13.5px] sm:text-[15px] uppercase tracking-[0.2em] text-[#C08A4E] font-bold flex items-center gap-2">
                  <span className="text-[#D59318] text-sm font-bold">✦</span>
                  <span>Follow Us</span>
                </h5>

                <div className="flex gap-2 mt-1.5">
                  {/* YouTube */}
                  <a 
                    href="https://youtube.com/@spark-interiors8357?si=XdDkw-Gd2T-ACYqQ" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-7.5 h-7.5 rounded-full border border-neutral-400 bg-white/60 text-neutral-800 hover:text-white hover:bg-[#D59318] hover:border-[#D59318] flex items-center justify-center transition-all duration-300 active:scale-95 shadow-sm"
                    aria-label="YouTube"
                  >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>

                  {/* Instagram */}
                  <a 
                    href="#" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-7.5 h-7.5 rounded-full border border-neutral-400 bg-white/60 text-neutral-800 hover:text-white hover:bg-[#D59318] hover:border-[#D59318] flex items-center justify-center transition-all duration-300 active:scale-95 shadow-sm"
                    aria-label="Instagram"
                  >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                    </svg>
                  </a>

                  {/* LinkedIn */}
                  <a 
                    href="#" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-7.5 h-7.5 rounded-full border border-neutral-400 bg-white/60 text-neutral-800 hover:text-white hover:bg-[#D59318] hover:border-[#D59318] flex items-center justify-center transition-all duration-300 active:scale-95 shadow-sm"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.43c-1.14 0-2.06-.92-2.06-2.06 0-1.14.92-2.06 2.06-2.06 1.14 0 2.06.92 2.06 2.06 0 1.14-.92 2.06-2.06 2.06zM20.45 20.45h-3.56v-5.6c0-1.34-.03-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.95v5.7H9.33V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29z"/>
                    </svg>
                  </a>

                  {/* Mail */}
                  <a 
                    href="mailto:hello@sparkinteriors.com" 
                    className="w-7.5 h-7.5 rounded-full border border-neutral-400 bg-white/60 text-neutral-800 hover:text-white hover:bg-[#D59318] hover:border-[#D59318] flex items-center justify-center transition-all duration-300 active:scale-95 shadow-sm"
                    aria-label="Mail"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Column 2: Address */}
            <div className="flex flex-col items-start">
              <div className="flex flex-col items-start gap-1 mb-2">
                <h5 className="text-[14.5px] sm:text-[16px] uppercase tracking-[0.2em] text-[#C08A4E] font-bold flex items-center gap-2">
                  <svg className="w-4.5 h-4.5 text-[#D59318] shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Address</span>
                </h5>
                <div className="h-[2px] w-10 sm:w-12 bg-[#C08A4E]/70 mt-1" />
              </div>
              
              <address className="not-italic text-[13px] sm:text-[14px] text-neutral-900 font-semibold leading-relaxed mt-0.5">
                No.138/2 1st Floor,<br />
                Kundrathur main road, Mangadu,<br />
                Chennai, Tamil Nadu 600122
              </address>
            </div>

            {/* Column 3: Contact */}
            <div className="flex flex-col items-start">
              <div className="flex flex-col items-start gap-1 mb-2">
                <h5 className="text-[14.5px] sm:text-[16px] uppercase tracking-[0.2em] text-[#C08A4E] font-bold flex items-center gap-2">
                  <svg className="w-4.5 h-4.5 text-[#D59318] shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>Contact</span>
                </h5>
                <div className="h-[2px] w-10 sm:w-12 bg-[#C08A4E]/70 mt-1" />
              </div>
              
              <div className="flex flex-col gap-1.5 mt-0.5 text-[13px] sm:text-[14px] text-neutral-900 font-semibold">
                <a href="tel:+919500012200" className="hover:text-[#D59318] transition-colors duration-300">
                  +91 95000 12200
                </a>
                <a href="tel:+917200080418" className="hover:text-[#D59318] transition-colors duration-300">
                  +91 72000 80418
                </a>
                <a href="mailto:hello@sparkinteriors.com" className="hover:text-[#D59318] transition-colors duration-300 break-all sm:break-normal">
                  hello@sparkinteriors.com
                </a>
              </div>
            </div>

            {/* Column 4: Explore */}
            <div className="flex flex-col items-start">
              <div className="flex flex-col items-start gap-1 mb-2">
                <h5 className="text-[14.5px] sm:text-[16px] uppercase tracking-[0.2em] text-[#C08A4E] font-bold flex items-center gap-2">
                  <svg className="w-4.5 h-4.5 text-[#D59318] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 22C2 22 10 18 14 14C18 10 22 2 22 2C22 2 14 6 10 10C6 14 2 22 2 22Z" />
                    <path d="M9 15C9 15 12 11 15 11" />
                    <path d="M13 11C13 11 16 9 18 9" />
                  </svg>
                  <span>Explore</span>
                </h5>
                <div className="h-[2px] w-10 sm:w-12 bg-[#C08A4E]/70 mt-1" />
              </div>
              
              <ul className="flex flex-col gap-1.5 text-[13px] sm:text-[14px] text-neutral-900 font-semibold leading-relaxed mt-0.5">
                <li>
                  <Link href="/" className="hover:text-[#D59318] transition-colors duration-300">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-[#D59318] transition-colors duration-300">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/#projects" className="hover:text-[#D59318] transition-colors duration-300">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-[#D59318] transition-colors duration-300">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-[#D59318] transition-colors duration-300">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 5: Quick Links */}
            <div className="flex flex-col items-start">
              <div className="flex flex-col items-start gap-1 mb-2">
                <h5 className="text-[14.5px] sm:text-[16px] uppercase tracking-[0.2em] text-[#C08A4E] font-bold flex items-center gap-2">
                  <span className="text-[#D59318] text-sm font-bold">✦</span>
                  <span>Quick Links</span>
                </h5>
                <div className="h-[2px] w-10 sm:w-12 bg-[#C08A4E]/70 mt-1" />
              </div>
              
              <div className="grid grid-cols-2 gap-x-5 sm:gap-x-6 gap-y-1.5 text-[13px] sm:text-[14px] text-neutral-900 font-semibold leading-relaxed whitespace-nowrap w-full mt-0.5">
                <div className="flex flex-col gap-1.5">
                  {col1.map((item) => (
                    <Link
                      key={item.id}
                      href={`/portfolio?category=${encodeURIComponent(item.id)}`}
                      onClick={() => {
                        if (typeof window !== "undefined") {
                          window.dispatchEvent(new CustomEvent("spark_category_change", { detail: item.id }));
                        }
                      }}
                      className="hover:text-[#D59318] transition-colors duration-300"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="flex flex-col gap-1.5">
                  {col2.map((item) => (
                    <Link
                      key={item.id}
                      href={`/portfolio?category=${encodeURIComponent(item.id)}`}
                      onClick={() => {
                        if (typeof window !== "undefined") {
                          window.dispatchEvent(new CustomEvent("spark_category_change", { detail: item.id }));
                        }
                      }}
                      className="hover:text-[#D59318] transition-colors duration-300"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Bar: Compact Centered Copyright */}
          <div className="border-t border-[#D5C2AD]/70 pt-2.5 mt-4 text-[11px] sm:text-[11.5px] uppercase tracking-[0.25em] text-neutral-900 font-bold flex items-center justify-center gap-1.5">
            <span>&copy; 2026</span>
            <a
              href="https://devspectra.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-900 hover:text-[#D59318] transition-colors duration-300 underline underline-offset-4 decoration-neutral-500 hover:decoration-[#D59318] cursor-pointer"
            >
              DevSpectra
            </a>
          </div>

        </div>
      </div>

    </footer>
  );
}