"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full overflow-hidden border-t border-[#E1D3C1]/80 text-[#2F352F]">
      
      {/* Full-bleed Background Interior Photography (Spanning the entire footer heights) */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <Image
          src="/wabisabi-lounge.jpg"
          alt="Curated contemporary plaster alcove lounge background"
          fill
          unoptimized
          className="object-cover object-center opacity-95 grayscale-[0.01] brightness-[0.92] contrast-[1.02] scale-[1.12] origin-right"
          priority
        />
        
        {/* Soft, warm plaster gradient overlay on the left to guarantee text readability, fading completely to transparent on the right */}
        <div className="absolute inset-y-0 left-0 w-full sm:w-[60%] lg:w-[50%] bg-gradient-to-r from-[#FAF7F2] via-[#FAF7F2]/80 to-transparent z-0" />
      </div>

      {/* =========================================================
          TOP BANNER: EDITORIAL HEADING (With horizontal padding)
      ========================================================= */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-7 sm:px-12 lg:px-16 pt-14 pb-8">
        
        <div className="flex flex-col items-start max-w-xl pb-4 px-2 sm:px-4">
          
          {/* Spaces That Label */}
          <div className="flex items-center gap-3 mb-4 select-none">
            <span className="h-[1.5px] w-6 bg-[#C08A4E]/60" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C08A4E] font-bold leading-none">
              Spaces That
            </span>
            <span className="text-[#C08A4E] text-xs">✦</span>
          </div>

          {/* Large Serif Heading */}
          <h3 className="font-serif text-[42px] sm:text-[54px] lg:text-[62px] leading-[1.08] text-neutral-900 font-normal">
            Inspire <br />
            <span className="text-[#F58216] italic font-serif">Beautiful Living.</span>
          </h3>

          <p className="mt-6 text-sm sm:text-base text-neutral-700 leading-relaxed max-w-sm font-light">
            Thoughtful design. Timeless spaces.<br />
            Built around you.
          </p>

          <a 
            href="#design-brief" 
            className="group inline-flex items-center gap-3.5 mt-8 text-xs font-bold tracking-[0.22em] text-[#C08A4E] hover:text-[#F58216] transition-colors border-b border-[#C08A4E] pb-1 uppercase"
          >
            <span>Let's create your space</span>
            <span className="transform group-hover:translate-x-1.5 transition-transform duration-300">→</span>
          </a>

        </div>

      </div>

      {/* =========================================================
          BOTTOM SECTION: FRAMELESS INTEGRATED 5 COLUMNS (Frosted Plinth)
      ========================================================= */}
      <div className="relative z-10 w-full bg-[#FAF6F0]/85 backdrop-blur-[2px] border-t border-[#E1D3C1]/50">
        
        <div className="max-w-[1440px] mx-auto px-7 sm:px-12 lg:px-16 pt-8 pb-4">
          
          {/* 5 columns grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10 lg:gap-0 pb-6 items-start">
            
            {/* Column 1: Logo Lockup & Tagline */}
            <div className="flex flex-col items-start pr-0 lg:pr-6 lg:border-r lg:border-[#E1D3C1]/40 h-full">
              <Link href="/" className="cursor-pointer">
                <Image
                  src="/sparklogo.png"
                  alt="Spark Interiors Logo"
                  width={130}
                  height={52}
                  unoptimized
                  className="object-contain"
                />
              </Link>
              
              {/* Tagline */}
              <p className="font-serif text-[13px] leading-relaxed text-neutral-700 mt-4 max-w-[220px]">
                Creating spaces with intention, warmth and character.
              </p>
            </div>

            {/* Column 2: Address */}
            <div className="flex flex-col items-start lg:pl-8 lg:pr-4 lg:border-r lg:border-[#E1D3C1]/40 h-full">
              <div className="flex flex-col items-start gap-1 mb-5">
                <h5 className="text-[11px] uppercase tracking-[0.25em] text-[#C08A4E] font-bold flex items-center gap-2.5">
                  <svg className="w-4 h-4 text-[#F58216] shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Address</span>
                </h5>
                <div className="h-[1.5px] w-8 bg-[#C08A4E]/60 mt-1" />
              </div>
              
              <address className="not-italic text-xs text-neutral-800 font-semibold leading-relaxed mt-1">
                No.138/2 1st Floor,<br />
                Kundrathur main road, Mangadu,<br />
                Chennai, Tamil Nadu 600122
              </address>
            </div>

            {/* Column 3: Contact */}
            <div className="flex flex-col items-start lg:pl-10 lg:pr-4 lg:border-r lg:border-[#E1D3C1]/40 h-full">
              <div className="flex flex-col items-start gap-1 mb-5">
                <h5 className="text-[11px] uppercase tracking-[0.25em] text-[#C08A4E] font-bold flex items-center gap-2.5">
                  <svg className="w-4 h-4 text-[#F58216] shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>Contact</span>
                </h5>
                <div className="h-[1.5px] w-8 bg-[#C08A4E]/60 mt-1" />
              </div>
              
              <div className="flex flex-col gap-2 mt-1">
                <a href="tel:+919500012200" className="text-xs text-neutral-800 font-semibold hover:text-[#F58216] transition-colors duration-300">
                  +91 95000 12200
                </a>
                <a href="mailto:hello@sparkinteriors.com" className="text-xs text-neutral-800 font-semibold hover:text-[#F58216] transition-colors duration-300">
                  hello@sparkinteriors.com
                </a>
              </div>
            </div>

            {/* Column 4: Explore */}
            <div className="flex flex-col items-start lg:pl-10 lg:pr-4 lg:border-r lg:border-[#E1D3C1]/40 h-full">
              <div className="flex flex-col items-start gap-1 mb-5">
                <h5 className="text-[11px] uppercase tracking-[0.25em] text-[#C08A4E] font-bold flex items-center gap-2.5">
                  <svg className="w-4 h-4 text-[#F58216] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 22C2 22 10 18 14 14C18 10 22 2 22 2C22 2 14 6 10 10C6 14 2 22 2 22Z" />
                    <path d="M9 15C9 15 12 11 15 11" />
                    <path d="M13 11C13 11 16 9 18 9" />
                  </svg>
                  <span>Explore</span>
                </h5>
                <div className="h-[1.5px] w-8 bg-[#C08A4E]/60 mt-1" />
              </div>
              
              <ul className="flex flex-col gap-2.5 text-xs text-neutral-800 font-semibold leading-relaxed">
                <li>
                  <Link href="#" className="hover:text-[#F58216] transition-colors duration-300">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#F58216] transition-colors duration-300">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#F58216] transition-colors duration-300">
                  Services
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#F58216] transition-colors duration-300">
                    
                    Projects
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#F58216] transition-colors duration-300">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 5: Follow Us */}
            <div className="flex flex-col items-start lg:pl-10 h-full">
              <div className="flex flex-col items-start gap-1 mb-5">
                <h5 className="text-[11px] uppercase tracking-[0.25em] text-[#C08A4E] font-bold flex items-center gap-2.5">
                  <svg className="w-3.5 h-3.5 text-[#F58216] shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l2.4 7.2L22 12l-7.6 2.4L12 22l-2.4-7.2L2 12l7.6-2.4L12 2z" />
                  </svg>
                  <span>Follow Us</span>
                </h5>
                <div className="h-[1.5px] w-8 bg-[#C08A4E]/60 mt-1" />
              </div>
              
              <div className="flex gap-3 mt-1.5">
                
                {/* Instagram */}
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-8 h-8 rounded-full border border-neutral-400 text-neutral-700 hover:text-white hover:bg-[#F58216] hover:border-[#F58216] flex items-center justify-center transition-all duration-300 active:scale-95 shadow-sm"
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
                  className="w-8 h-8 rounded-full border border-neutral-400 text-neutral-700 hover:text-white hover:bg-[#F58216] hover:border-[#F58216] flex items-center justify-center transition-all duration-300 active:scale-95 shadow-sm"
                  aria-label="LinkedIn"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.43c-1.14 0-2.06-.92-2.06-2.06 0-1.14.92-2.06 2.06-2.06 1.14 0 2.06.92 2.06 2.06 0 1.14-.92 2.06-2.06 2.06zM20.45 20.45h-3.56v-5.6c0-1.34-.03-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.95v5.7H9.33V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29z"/>
                  </svg>
                </a>

                {/* Mail */}
                <a 
                  href="mailto:hello@sparkinteriors.com" 
                  className="w-8 h-8 rounded-full border border-neutral-400 text-neutral-700 hover:text-white hover:bg-[#F58216] hover:border-[#F58216] flex items-center justify-center transition-all duration-300 active:scale-95 shadow-sm"
                  aria-label="Mail"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>

              </div>
            </div>

          </div>

          {/* Bottom Bar: Copyright & Centered Spark Divider */}
          <div className="border-t border-[#E1D3C1]/50 pt-3.5 text-[10px] uppercase tracking-[0.2em] text-[#8E8B82] font-bold flex items-center justify-between gap-4">
            
            {/* Left aligned copyright (fixed width for balancing) */}
            <p className="w-[150px] shrink-0 text-left">
              &copy; 2026 DevSpectra
            </p>
            
            {/* Extended gold lines with spark icon (centered) */}
            <div className="hidden sm:flex items-center gap-4 flex-grow">
              <div className="h-[1px] flex-grow bg-[#E1D3C1]/40" />
              <span className="text-[#F58216] text-xs select-none">✦</span>
              <div className="h-[1px] flex-grow bg-[#E1D3C1]/40" />
            </div>
            
            {/* Right spacer (same width as copyright for perfect centering of the spark divider) */}
            <div className="w-[150px] shrink-0 hidden sm:block" />

          </div>

        </div>

      </div>

    </footer>
  );
}