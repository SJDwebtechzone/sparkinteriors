"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const heroLeftImages = [
  "/about-library-study.jpg",
  "/about-living-curved-custom.jpg",
  "/about-ganesha-pooja-custom.jpg"
];

const heroRightImages = [
  "/home-bedroom-luxury.jpg",
  "/about-kitchen-green-custom.jpg",
  "/about-kitchen-marble-custom.jpg"
];

export default function AboutPage() {
  const [heroIdx, setHeroIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIdx((prev) => (prev + 1) % heroLeftImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  return (
    <main className="min-h-screen bg-[#FAF6F0] text-neutral-900 font-sans selection:bg-[#D59318]/20 selection:text-[#D59318] overflow-x-hidden">
      <Navbar />

      {/* =========================================================
          SECTION 1: HERO (EDITORIAL SPLIT SCREEN)
      ========================================================= */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 pt-28 pb-8 md:pt-32 md:pb-12 relative overflow-hidden">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heading Copy */}
          <div className="lg:col-span-5 flex flex-col items-start relative z-10">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-[1px] bg-[#D59318]" />
              <span className="text-[11.5px] sm:text-xs uppercase tracking-[0.35em] text-[#D59318] font-bold">
                Established 2013
              </span>
            </div>
            
            <h1 className="font-serif text-[48px] sm:text-[60px] lg:text-[70px] leading-[1.1] text-neutral-900 font-normal tracking-tight">
              Designing <br />
              spaces that <br />
              <span className="text-[#D59318] italic font-serif font-medium">spark joy.</span>
            </h1>
            
            <p className="mt-8 text-neutral-800 text-base sm:text-[17.5px] leading-relaxed max-w-md font-light" style={{ textAlign: "justify" }}>
              Spark Interiors transforms spaces with innovative design solutions that reflect your personality and style. We believe in creating inspiring environments that harmonize aesthetics with practical living, bringing functionality and elegance to every corner of your home.
            </p>
          </div>

          {/* Right Column: Staggered Editorial Diptych Layout */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-4 sm:gap-6 relative w-full h-[380px] sm:h-[480px] lg:h-[560px] z-10 select-none pb-8">
            
            {/* Left Column Diptych (Tall offset top) */}
            <div className="relative w-full h-[90%] rounded-2xl overflow-hidden border border-[#E1D3C1]/30 bg-[#FAF6F0] shadow-md">
              {heroLeftImages.map((src, idx) => (
                <div
                  key={src}
                  className={`absolute inset-0 transition-all duration-[1200ms] ease-in-out ${
                    idx === heroIdx 
                      ? "opacity-100 scale-100 z-10" 
                      : "opacity-0 scale-[0.98] z-0 pointer-events-none"
                  }`}
                >
                  <Image
                    src={src}
                    alt="Spark Interiors custom architecture visual"
                    fill
                    priority={idx === 0}
                    unoptimized
                    className={`object-cover ${src.includes("pooja") || src.includes("ganesha") ? "object-bottom" : "object-center"}`}
                    sizes="(max-width: 1024px) 50vw, 28vw"
                  />
                </div>
              ))}
            </div>

            {/* Right Column Diptych (Tall offset bottom) */}
            <div className="relative w-full h-[90%] mt-8 rounded-2xl overflow-hidden border border-[#E1D3C1]/30 bg-[#FAF6F0] shadow-md">
              {heroRightImages.map((src, idx) => (
                <div
                  key={src}
                  className={`absolute inset-0 transition-all duration-[1200ms] ease-in-out delay-100 ${
                    idx === heroIdx 
                      ? "opacity-100 scale-100 z-10" 
                      : "opacity-0 scale-[0.98] z-0 pointer-events-none"
                  }`}
                >
                  <Image
                    src={src}
                    alt="Spark Interiors custom detail visual"
                    fill
                    priority={idx === 0}
                    unoptimized
                    className={`object-cover ${src.includes("pooja") || src.includes("ganesha") ? "object-bottom" : "object-center"}`}
                    sizes="(max-width: 1024px) 50vw, 28vw"
                  />
                </div>
              ))}
            </div>

            {/* Custom Navigation Playhead dots */}
            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-2">
              {heroLeftImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setHeroIdx(idx)}
                  className={`h-[3px] rounded-full transition-all duration-[600ms] cursor-pointer ${
                    idx === heroIdx ? "w-8 bg-[#D59318]" : "w-3 bg-[#E1D3C1]/50 hover:bg-[#D59318]/50"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================
          SECTION 2: ABOUT OUR COMPANY (EDITORIAL IMAGE & TEXT)
      ========================================================= */}
      <AboutOurCompany />

      {/* =========================================================
          SECTION 4: CORE SPECIALTIES (DOUBLE-CAPSULE SYMMETRIC SECTION)
      ========================================================= */}
      <section className="pt-8 sm:pt-10 pb-16 sm:pb-20 px-6 sm:px-12 lg:px-16 max-w-[1280px] mx-auto border-t border-[#E1D3C1]/20">
        
        {/* Centered Section Header */}
        <div className="w-full flex flex-col items-center mb-8 sm:mb-10">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="w-12 h-[1px] bg-[#D59318]/50" />
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-[#C27A32] font-semibold flex items-center gap-2">
              ✦ SPECIAL SERVICES ✦
            </span>
            <span className="w-12 h-[1px] bg-[#D59318]/50" />
          </div>
          <h2 className="font-serif text-[32px] sm:text-[40px] leading-tight text-[#252A24] font-normal mt-4 text-center">
            Curated for <span className="text-[#D59318] italic font-serif">sophisticated</span> living.
          </h2>
          <div className="w-10 h-[1px] bg-[#D7B98F] mt-6" />
        </div>

        {/* Content Box */}
        <div className="bg-[#FAF7F2] border border-[#E1D3C1]/50 rounded-[32px] sm:rounded-[48px] lg:rounded-[64px] overflow-hidden relative min-h-[420px] grid grid-cols-1 lg:grid-cols-12 items-center">
          
          {/* Faint vertical division line */}
          <div className="absolute left-[58%] top-0 bottom-0 w-[1px] bg-[#E1D3C1]/35 pointer-events-none hidden lg:block" />

          {/* Left Column: Semicircular Visual Capsule */}
          <div className="lg:col-span-5 relative w-full h-[320px] lg:h-full min-h-[350px] lg:min-h-[420px] rounded-r-[200px] sm:rounded-r-[260px] lg:rounded-r-[320px] overflow-hidden">
            <Image 
              src="/services-living-luxury-custom.jpg"
              alt="Spark Interiors custom lighting and interior space design"
              fill
              unoptimized
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>

          {/* Right Column: Editorial Copy */}
          <div className="lg:col-span-7 flex flex-col items-start px-8 sm:px-12 lg:px-14 py-12 relative z-10">
            {/* Core specialties checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 w-full">
              <div className="flex flex-col">
                <span className="text-[14.5px] sm:text-[16px] uppercase tracking-[0.2em] text-[#D59318] font-bold mb-2.5">Lighting Design</span>
                <p className="text-base sm:text-[17.5px] leading-relaxed text-neutral-800 font-light" style={{ textAlign: "justify" }}>
                  Creating tailored lighting solutions to enhance ambiance, functionality, and architectural style in every space.
                </p>
              </div>
              <div className="flex flex-col">
                <span className="text-[14.5px] sm:text-[16px] uppercase tracking-[0.2em] text-[#D59318] font-bold mb-2.5">Custom Furniture</span>
                <p className="text-base sm:text-[17.5px] leading-relaxed text-neutral-800 font-light" style={{ textAlign: "justify" }}>
                  Designing unique and personalized pieces that perfectly complement your spatial layouts and fit your aesthetic.
                </p>
              </div>
              <div className="flex flex-col">
                <span className="text-[14.5px] sm:text-[16px] uppercase tracking-[0.2em] text-[#D59318] font-bold mb-2.5">Furniture Sourcing</span>
                <p className="text-base sm:text-[17.5px] leading-relaxed text-neutral-800 font-light" style={{ textAlign: "justify" }}>
                  Offering expert sourcing to select high-quality, signature pieces that elevate the overall theme.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================
          SECTION 5: IMMERSIVE CALL TO ACTION (CTA BANNER CARD)
      ========================================================= */}
      <section className="py-16 px-6 sm:px-12 lg:px-16">
        <div className="max-w-[1280px] mx-auto rounded-[32px] sm:rounded-[48px] overflow-hidden relative py-24 md:py-32 flex items-center justify-center text-center shadow-lg">
          
          {/* Background Visual Banner */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/services-cta.jpg"
              alt="Ready to create your dream space visual"
              fill
              unoptimized
              suppressHydrationWarning
              className="object-cover object-center brightness-[0.78] contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/15 to-black/45 z-0 pointer-events-none" />
          </div>

          {/* Content Box */}
          <div className="relative z-10 px-6 sm:px-12 max-w-2xl flex flex-col items-center">
            <h2 className="font-serif text-[36px] sm:text-[48px] lg:text-[54px] leading-tight text-white font-normal drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
              Let's create a space you'll love
            </h2>
            
            <p className="mt-4 text-[#FAF6F0] text-sm sm:text-base font-light tracking-wide drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]">
              Collaborate with Spark Interiors to bring your vision to life.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Link 
                href="/contact"
                className="inline-block bg-[#D59318] hover:bg-[#B87D0C] text-white text-[10px] sm:text-xs font-bold tracking-[0.25em] px-8 sm:px-10 py-4 rounded-full shadow-lg hover:shadow-xl active:scale-95 transition-all duration-300 uppercase cursor-pointer"
              >
                Book a Consultation
              </Link>
              <Link 
                href="/portfolio"
                className="inline-block border border-white/60 hover:border-white text-white text-[10px] sm:text-xs font-bold tracking-[0.25em] px-8 sm:px-10 py-4 rounded-full hover:bg-white/10 active:scale-95 transition-all duration-300 uppercase cursor-pointer"
              >
                View Portfolio
              </Link>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}

const imagePairs = [
  {
    large: "/about-living-curved-custom.jpg",
    detail: "/about-studio-office.jpg"
  },
  {
    large: "/about-kitchen-green-custom.jpg",
    detail: "/about-kitchen-marble-custom.jpg"
  },
  {
    large: "/home-bedroom-luxury.jpg",
    detail: "/about-ganesha-pooja-custom.jpg"
  }
];

function AboutOurCompany() {
  const [currIdx, setCurrIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrIdx((prev) => (prev + 1) % imagePairs.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="pt-8 sm:pt-10 pb-12 sm:pb-16 max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 border-t border-[#E1D3C1]/30">
      
      {/* Centered Section Header */}
      <div className="w-full flex flex-col items-center mb-8 sm:mb-10">
        <div className="flex items-center justify-center gap-4 mb-4">
          <span className="w-12 h-[1px] bg-[#D59318]/50" />
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-[#C27A32] font-semibold flex items-center gap-2">
            ✦ ABOUT US ✦
          </span>
          <span className="w-12 h-[1px] bg-[#D59318]/50" />
        </div>
        <h2 className="font-serif text-[32px] sm:text-[40px] leading-tight text-[#252A24] font-normal mt-4 text-center">
          About Our Company
        </h2>
        <div className="w-10 h-[1px] bg-[#D7B98F] mt-6" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20 items-start max-w-[1240px] mx-auto">
        
        {/* Left Column: Overlapping Visual Collage with Transition Playheads (5 Cols) */}
        <div className="md:col-span-5 relative w-full aspect-[0.82] sm:max-w-[420px] md:max-w-none mx-auto group/collage mb-10 md:mb-0">
          
          {/* Large Main Frame */}
          <div className="w-[82%] h-[85%] absolute top-0 left-0 rounded-2xl overflow-hidden border border-[#E1D3C1]/30 bg-[#FAF6F0] shadow-[0_15px_40px_rgba(70,55,40,0.06)] transition-transform duration-700 ease-out group-hover/collage:translate-y-[-4px]">
            {imagePairs.map((pair, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 transition-all duration-[1200ms] ease-in-out ${
                  idx === currIdx 
                    ? "opacity-100 scale-100 z-10" 
                    : "opacity-0 scale-[0.98] z-0 pointer-events-none"
                }`}
              >
                <Image
                  src={pair.large}
                  alt="Spark Interiors custom premium design portfolio"
                  fill
                  unoptimized
                  className="object-cover object-center"
                />
              </div>
            ))}
          </div>

          {/* Small Overlapping Detail Frame */}
          <div className="w-[46%] h-[46%] absolute bottom-0 right-0 rounded-2xl overflow-hidden border-4 border-[#FAF6F0] bg-[#FAF6F0] shadow-[0_20px_45px_rgba(70,55,40,0.12)] transition-transform duration-700 ease-out group-hover/collage:translate-x-[6px] group-hover/collage:translate-y-[4px]">
            {imagePairs.map((pair, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 transition-all duration-[1200ms] ease-in-out delay-100 ${
                  idx === currIdx 
                    ? "opacity-100 scale-100 z-10" 
                    : "opacity-0 scale-[0.95] z-0 pointer-events-none"
                }`}
              >
                <Image
                  src={pair.detail}
                  alt="Spark Interiors custom premium detail"
                  fill
                  unoptimized
                  className={`object-cover ${pair.detail.includes("pooja") || pair.detail.includes("ganesha") ? "object-bottom" : "object-center"}`}
                />
              </div>
            ))}
          </div>

          {/* Custom Navigation Playhead dots */}
          <div className="absolute bottom-[-28px] left-0 flex items-center gap-2">
            {imagePairs.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrIdx(idx)}
                className={`h-[3px] rounded-full transition-all duration-[600ms] cursor-pointer ${
                  idx === currIdx ? "w-8 bg-[#D59318]" : "w-3 bg-[#E1D3C1]/50 hover:bg-[#D59318]/50"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

        </div>

        {/* Right Column: Editorial Copy (7 Cols) */}
        <div className="md:col-span-7 flex flex-col items-start mt-6 md:mt-0">
          <p className="text-neutral-800 text-base sm:text-[17.5px] leading-relaxed font-light mb-6 text-justify">
            Spark Interiors, we transform spaces with innovative design solutions that reflect your personality and style. Specializing in Modular Kitchens, Wardrobes, Living Rooms, and Pooja Units, we bring functionality and elegance to every corner of your home. Our expertise extends to creating inspiring and efficient environments for institutions, ensuring that each space we design is both beautiful and purposeful. With a passion for creativity and precision, Spark Interiors is your partner in crafting spaces that resonate with comfort and luxury.
          </p>
          
          <p className="text-neutral-800 text-base sm:text-[17.5px] leading-relaxed font-light mb-8 text-justify">
            With years of experience in the interior design industry, Spark Interiors is committed to exceeding client expectations through superior design solutions. Our vision is to create inspiring environments that harmonize aesthetics with practical living.
          </p>

          {/* Value Checklist Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 border-t border-[#E1D3C1]/30 pt-6 w-full">
            <div className="flex items-center text-neutral-800 text-[14.5px] font-medium">
              <span className="text-[#D59318] mr-2.5 font-bold text-lg">✓</span>
              Bespoke Interior Designs
            </div>
            <div className="flex items-center text-neutral-800 text-[14.5px] font-medium">
              <span className="text-[#D59318] mr-2.5 font-bold text-lg">✓</span>
              Expert Craftsmanship
            </div>
            <div className="flex items-center text-neutral-800 text-[14.5px] font-medium">
              <span className="text-[#D59318] mr-2.5 font-bold text-lg">✓</span>
              Complete Turnkey Execution
            </div>
            <div className="flex items-center text-neutral-800 text-[14.5px] font-medium">
              <span className="text-[#D59318] mr-2.5 font-bold text-lg">✓</span>
              Premium Quality Materials
            </div>
            <div className="flex items-center text-neutral-800 text-[14.5px] font-medium">
              <span className="text-[#D59318] mr-2.5 font-bold text-lg">✓</span>
              Transparent Collaboration
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
