"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface ServiceItem {
  number: string;
  name: string;
  category: string;
  headline: string;
  description: string;
  image: string;
  deliverables: string[];
}

/* Helper to provide unique, modern vibrant color themes for each service */
export interface ServiceTheme {
  activeBadge: string;
  inactiveBadge: string;
  activeText: string;
  hoverText: string;
}

export function getServiceTheme(name: string): ServiceTheme {
  const n = name.toLowerCase();

  // 1. Modular Kitchen - Flame Amber & Terracotta
  if (n.includes("kitchen")) {
    return {
      activeBadge: "bg-gradient-to-br from-[#FF6B00] to-[#E65100] text-white shadow-md shadow-[#FF6B00]/30 border-transparent scale-105",
      inactiveBadge: "bg-[#FF6B00]/12 text-[#FF5500] border-[#FF6B00]/35 group-hover:bg-[#FF6B00]/22 group-hover:border-[#FF6B00]/60 group-hover:scale-105",
      activeText: "text-[#FF5500]",
      hoverText: "group-hover:text-[#FF5500]"
    };
  }

  // 2. Wardrobes - Emerald Green & Mint
  if (n.includes("bedroom") || n.includes("wardrobe")) {
    return {
      activeBadge: "bg-gradient-to-br from-[#10B981] to-[#047857] text-white shadow-md shadow-[#10B981]/30 border-transparent scale-105",
      inactiveBadge: "bg-[#10B981]/12 text-[#059669] border-[#10B981]/35 group-hover:bg-[#10B981]/22 group-hover:border-[#10B981]/60 group-hover:scale-105",
      activeText: "text-[#059669]",
      hoverText: "group-hover:text-[#059669]"
    };
  }

  // 3. Living Room / Residential Interiors - Royal Sapphire & Indigo
  if (n.includes("living") || n.includes("residential")) {
    return {
      activeBadge: "bg-gradient-to-br from-[#6366F1] to-[#4338CA] text-white shadow-md shadow-[#6366F1]/30 border-transparent scale-105",
      inactiveBadge: "bg-[#6366F1]/12 text-[#4F46E5] border-[#6366F1]/35 group-hover:bg-[#6366F1]/22 group-hover:border-[#6366F1]/60 group-hover:scale-105",
      activeText: "text-[#4F46E5]",
      hoverText: "group-hover:text-[#4F46E5]"
    };
  }

  // 4. Pooja Unit - Sacred Amber & Sun Gold
  if (n.includes("pooja") || n.includes("mandir") || n.includes("temple")) {
    return {
      activeBadge: "bg-gradient-to-br from-[#F59E0B] to-[#B45309] text-white shadow-md shadow-[#F59E0B]/30 border-transparent scale-105",
      inactiveBadge: "bg-[#F59E0B]/14 text-[#D97706] border-[#F59E0B]/40 group-hover:bg-[#F59E0B]/24 group-hover:border-[#F59E0B]/65 group-hover:scale-105",
      activeText: "text-[#D97706]",
      hoverText: "group-hover:text-[#D97706]"
    };
  }

  // 5. False Ceiling & Lighting - Electric Cyan & Lighting Blue
  if (n.includes("ceiling") || n.includes("light")) {
    return {
      activeBadge: "bg-gradient-to-br from-[#0284C7] to-[#0369A1] text-white shadow-md shadow-[#0284C7]/30 border-transparent scale-105",
      inactiveBadge: "bg-[#0284C7]/12 text-[#0284C7] border-[#0284C7]/35 group-hover:bg-[#0284C7]/22 group-hover:border-[#0284C7]/60 group-hover:scale-105",
      activeText: "text-[#0284C7]",
      hoverText: "group-hover:text-[#0284C7]"
    };
  }

  // 6. Bespoke Design - Coral Rose & Crimson
  if (n.includes("bespoke") || n.includes("custom")) {
    return {
      activeBadge: "bg-gradient-to-br from-[#E11D48] to-[#9F1239] text-white shadow-md shadow-[#E11D48]/30 border-transparent scale-105",
      inactiveBadge: "bg-[#E11D48]/12 text-[#E11D48] border-[#E11D48]/35 group-hover:bg-[#E11D48]/22 group-hover:border-[#E11D48]/60 group-hover:scale-105",
      activeText: "text-[#E11D48]",
      hoverText: "group-hover:text-[#E11D48]"
    };
  }

  // 7. Styling & Decor - Royal Amethyst Violet
  if (n.includes("styling") || n.includes("decor") || n.includes("art")) {
    return {
      activeBadge: "bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] text-white shadow-md shadow-[#8B5CF6]/30 border-transparent scale-105",
      inactiveBadge: "bg-[#8B5CF6]/12 text-[#7C3AED] border-[#8B5CF6]/35 group-hover:bg-[#8B5CF6]/22 group-hover:border-[#8B5CF6]/60 group-hover:scale-105",
      activeText: "text-[#7C3AED]",
      hoverText: "group-hover:text-[#7C3AED]"
    };
  }

  // Fallback - Warm Luxury Gold
  return {
    activeBadge: "bg-gradient-to-br from-[#D59318] to-[#C08A4E] text-white shadow-md shadow-[#D59318]/30 border-transparent scale-105",
    inactiveBadge: "bg-[#D59318]/12 text-[#D59318] border-[#D59318]/35 group-hover:bg-[#D59318]/22 group-hover:border-[#D59318]/60 group-hover:scale-105",
    activeText: "text-[#D59318]",
    hoverText: "group-hover:text-[#D59318]"
  };
}

/* Helper to provide unique, premium architectural SVG icons for each service heading */
function getServiceIcon(name: string) {
  const n = name.toLowerCase();

  // 1. Modular Kitchen: Luxury Kitchen Island & Arch Faucet
  if (n.includes("kitchen")) {
    return (
      <svg className="w-5.5 h-5.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="9" rx="2" fill="currentColor" fillOpacity="0.22" />
        <path d="M3 11h18M9 11v9M15 11v9" />
        <path d="M7 11V7a3 3 0 0 1 6 0v1" />
        <circle cx="13" cy="8" r="0.8" fill="currentColor" />
      </svg>
    );
  }

  // 2. Wardrobes: Bespoke Wardrobe with sliding doors & shelves
  if (n.includes("bedroom") || n.includes("wardrobe")) {
    return (
      <svg className="w-5.5 h-5.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" fill="currentColor" fillOpacity="0.15" />
        <path d="M12 3v18M3 17h18M9 10v2M15 10v2" />
        <path d="M6 7h3M15 7h3" strokeWidth="1.5" />
      </svg>
    );
  }

  // 3. Living Room / Residential Interiors: Curved Sectional Lounge Sofa
  if (n.includes("living") || n.includes("residential")) {
    return (
      <svg className="w-5.5 h-5.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 8.5C4 7.12 5.12 6 6.5 6h11C18.88 6 20 7.12 20 8.5V11H4V8.5z" fill="currentColor" fillOpacity="0.25" />
        <rect x="2" y="11" width="20" height="6" rx="2" fill="currentColor" fillOpacity="0.15" />
        <path d="M5 17v3M19 17v3M2 11v2a2 2 0 0 0 2 2h0M22 11v2a2 2 0 0 1-2 2h0" />
      </svg>
    );
  }

  // 4. Pooja Unit: Sacred Temple Arch Dome & Diya Flame
  if (n.includes("pooja") || n.includes("mandir") || n.includes("temple")) {
    return (
      <svg className="w-5.5 h-5.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3C7 3 4 7 4 10v9h16v-9c0-3-3-7-8-7z" fill="currentColor" fillOpacity="0.15" />
        <path d="M12 6.5c1.3 1.8 2.2 3 2.2 4.5a2.2 2.2 0 1 1-4.4 0c0-1.5.9-2.7 2.2-4.5z" fill="currentColor" fillOpacity="0.4" />
        <path d="M7.5 15.5a4.5 4.5 0 0 0 9 0H7.5z" fill="currentColor" />
        <path d="M3 19h18" />
      </svg>
    );
  }

  // 5. False Ceiling & Lighting: Architectural Tray False Ceiling with Cove & Spotlights
  if (n.includes("ceiling") || n.includes("light")) {
    return (
      <svg className="w-5.5 h-5.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2.5" y="3" width="19" height="18" rx="2" fill="currentColor" fillOpacity="0.1" />
        <rect x="5.5" y="6" width="13" height="12" rx="1.5" strokeWidth="1.6" />
        <rect x="8.5" y="9" width="7" height="6" rx="1" fill="currentColor" fillOpacity="0.3" />
        <circle cx="4.2" cy="4.8" r="0.9" fill="currentColor" />
        <circle cx="19.8" cy="4.8" r="0.9" fill="currentColor" />
        <circle cx="4.2" cy="19.2" r="0.9" fill="currentColor" />
        <circle cx="19.8" cy="19.2" r="0.9" fill="currentColor" />
        <circle cx="12" cy="12" r="1.3" fill="currentColor" />
      </svg>
    );
  }

  // 7. Bespoke Design / Custom Joinery: Drafting Compass & T-Square Ruler
  if (n.includes("bespoke") || n.includes("custom")) {
    return (
      <svg className="w-5.5 h-5.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="5" r="2" fill="currentColor" fillOpacity="0.3" />
        <path d="M12 7L6 21M12 7l6 14M8.5 15h7" />
        <path d="M4 10h16" />
      </svg>
    );
  }

  // 8. Styling & Decor: Framed Canvas Art & Artisan Ceramic Vase
  if (n.includes("styling") || n.includes("decor") || n.includes("art")) {
    return (
      <svg className="w-5.5 h-5.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="11" height="13" rx="2" fill="currentColor" fillOpacity="0.15" />
        <circle cx="8.5" cy="8" r="2.5" fill="currentColor" fillOpacity="0.3" />
        <path d="M15 14c0-1.5 1-2.5 1.5-3.5h3c.5 1 1.5 2 1.5 3.5v4c0 1.5-1.3 3-3 3s-3-1.5-3-3v-4z" fill="currentColor" fillOpacity="0.25" />
      </svg>
    );
  }

  // Fallback
  return (
    <svg className="w-5.5 h-5.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" fill="currentColor" fillOpacity="0.2" />
      <path d="M12 8v8M8 12h8" />
    </svg>
  );
}

export default function ServicesPage() {
  // 1. Services data (For interactive tab showcase)
  const services: ServiceItem[] = [
    {
      number: "01",
      name: "Residential Interiors",
      category: "RESIDENTIAL INTERIORS",
      headline: "Homes that reflect you.",
      description: "Thoughtful homes designed with warmth, comfort and personality. We plan and craft spaces to match the way you live.",
      image: "/services-residential.jpg",
      deliverables: ["Personalized Space Layouts", "Tactile Plaster & Material Palettes", "Custom Millwork Drawings", "Furnishing & Lighting Curation"]
    },
    {
      number: "02",
      name: "False Ceiling & Lighting",
      category: "FALSE CEILING & LIGHTING",
      headline: "Ambient lighting & architectural ceilings.",
      description: "Custom architectural false ceiling designs integrated with concealed LED coving and magnetic track lighting systems.",
      image: "/about-living-curved-custom.jpg",
      deliverables: ["Architectural Gypsum Ceiling Layouts", "Concealed Warm LED Cove Profiles", "Magnetic Track & Spotlight Schemes", "Acoustic Insulation & Refinement"]
    },
    {
      number: "03",
      name: "Bespoke Design",
      category: "BESPOKE DESIGN",
      headline: "Crafted exclusively.",
      description: "Custom furniture, unique joinery, and custom architectural details tailored for spaces requiring an extraordinary touch.",
      image: "/services-bespoke.jpg",
      deliverables: ["Tailored Joinery Details", "Custom Furniture Mockups", "Stone & Metal Detailing", "Local Artisan Collaboration"]
    },
    {
      number: "04",
      name: "Styling & Decor",
      category: "STYLING & DECOR",
      headline: "The finishing touch.",
      description: "Carefully curated art, textiles, lighting, and decorative accessories that bring warmth, character, and cohesive style.",
      image: "/services-styling.jpg",
      deliverables: ["Art Curation & Placement", "Custom Linen & Soft Accessories", "Decorative Lighting Schemes", "Final Room Dressing & Styling"]
    }
  ];

  const [activeService, setActiveService] = useState<number>(0);
  const [isFading, setIsFading] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(0);


  const handleServiceChange = (idx: number) => {
    if (idx === activeService || isFading) return;
    setIsFading(true);
    setTimeout(() => {
      setActiveService(idx);
      setIsFading(false);
    }, 220);
  };

  // 2. Process steps data (For interactive slideshow stepper)
  const processSteps = [
    { num: "01", title: "Discover", desc: "We engage in deep discovery sessions to understand your daily routines, aesthetic preferences, and spatial inspirations, building a tailored brief." },
    { num: "02", title: "Concept", desc: "Our team develops initial spatial zoning plans and tactile moodboards, curating the overall design direction and materiality canvas." },
    { num: "03", title: "Design", desc: "We finalize detailed layout drafts, material selections, custom millwork drawings, and color schemes, refining every corner to perfection." },
    { num: "04", title: "Develop", desc: "We produce photorealistic 3D visualizations and comprehensive construction drawings, coordinating technical specs for execution." },
    { num: "05", title: "Deliver", desc: "Our dedicated project managers oversee construction, installation, final furniture placement, and styling, delivering a ready-to-live masterpiece." }
  ];

  return (
    <main className="min-h-screen bg-[#FAF6F0] text-[#2F352F] font-sans antialiased selection:bg-[#D59318]/10 selection:text-[#D59318]">
      <Navbar />
      
      {/* =========================================================
          SECTION 1: HERO (OUR EXPERTISE) - ASYMMETRIC GRID
      ========================================================= */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 pt-28 pb-0 md:pt-32 md:pb-0 relative overflow-hidden">
        
        {/* Background decorative parallel gold curve line matching mockup */}
        <div className="absolute right-[-100px] top-[-100px] w-[500px] h-[500px] sm:w-[650px] sm:h-[650px] lg:w-[750px] lg:h-[750px] border-l border-b border-[#E1D3C1]/50 rounded-bl-[200px] sm:rounded-bl-[320px] lg:rounded-bl-[420px] pointer-events-none -z-10 hidden sm:block" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          
          {/* Left Column: Heading Copy */}
          <div className="lg:col-span-5 flex flex-col items-start relative z-10">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-[1px] bg-[#D59318]" />
              <span className="text-[11.5px] sm:text-xs uppercase tracking-[0.3em] text-[#D59318] font-bold">
                Our Expertise
              </span>
            </div>
            
            <h1 className="font-serif text-[50px] sm:text-[62px] lg:text-[74px] leading-[1.08] text-neutral-900 font-normal tracking-tight">
              Designed <br />
              around <span className="text-[#D59318] italic font-serif font-medium">your</span> <br />
              <span className="text-[#D59318] italic font-serif font-medium">world.</span>
            </h1>
            
            <p className="mt-8 text-neutral-800 text-base sm:text-[17.5px] leading-relaxed max-w-md font-light" style={{ textAlign: "justify" }}>
              We blend creativity, functionality, and craftsmanship to create bespoke spatial experiences that feel uniquely yours. From initial spatial layouts and concept moodboards to fine architectural millwork and curated decor selections, our design approach honors natural light, premium organic textures, and functional elegance tailored to your modern lifestyle.
            </p>
            
            {/* Core interior design spatial specialties checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 mt-10 border-t border-[#E1D3C1]/40 pt-7 w-full max-w-md">
              <div className="flex flex-col">
                <span className="text-[12px] uppercase tracking-[0.2em] text-[#D59318] font-bold mb-2">Spatial Architecture</span>
                <p className="text-base sm:text-[17.5px] leading-relaxed text-neutral-800 font-light" style={{ textAlign: "justify" }}>Designing clean flows, optimal layout volumes and natural light paths.</p>
              </div>
              <div className="flex flex-col">
                <span className="text-[12px] uppercase tracking-[0.2em] text-[#D59318] font-bold mb-2">Tailored Finishes</span>
                <p className="text-base sm:text-[17.5px] leading-relaxed text-neutral-800 font-light" style={{ textAlign: "justify" }}>Handselecting premium plaster textures, warm timbers, stone and custom brass accents.</p>
              </div>
              <div className="flex flex-col">
                <span className="text-[12px] uppercase tracking-[0.2em] text-[#D59318] font-bold mb-2">Bespoke Millwork</span>
                <p className="text-base sm:text-[17.5px] leading-relaxed text-neutral-800 font-light" style={{ textAlign: "justify" }}>Crafting custom cabinetry, signature joinery, and tailored storage solutions.</p>
              </div>
              <div className="flex flex-col">
                <span className="text-[12px] uppercase tracking-[0.2em] text-[#D59318] font-bold mb-2">Artistic Curation</span>
                <p className="text-base sm:text-[17.5px] leading-relaxed text-neutral-800 font-light" style={{ textAlign: "justify" }}>Selecting signature lighting, tactile linens, stoneware, and bespoke art pieces.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Full-Screen Semicircle Curved Canvas */}
          <div className="lg:col-span-7 relative w-full h-[350px] sm:h-[480px] lg:h-full min-h-[400px] lg:min-h-[620px] rounded-bl-[200px] sm:rounded-bl-[320px] lg:rounded-bl-[420px] overflow-hidden border border-[#E1D3C1]/40 shadow-md bg-[#EEF0E9]/30 z-10">
            <Image
              src="/services-living-luxury-custom.jpg"
              alt="Spark Interiors custom marble TV accent wall luxury living room design"
              fill
              priority
              unoptimized
              className="object-cover object-center scale-[1.02] hover:scale-[1.05] transition-transform duration-[1.5s] ease-out"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
          </div>

        </div>
      </section>

      {/* =========================================================
          SECTION 2: HOW WE TRANSFORM SPACES (EDITORIAL SHOWCASE)
      ========================================================= */}
      <section id="services-showcase" className="border-t border-b border-[#E1D3C1]/50 bg-[#FAF7F2]/50 pt-6 pb-16 px-6 sm:px-12 lg:px-16 overflow-hidden">
        <div className="max-w-[1440px] mx-auto">
          
          {/* Header Title */}
          <div className="flex items-center justify-center gap-4 mb-16 text-center">
            <div className="h-[1.5px] w-8 sm:w-16 bg-[#D59318]" />
            <span className="text-[#D59318] text-[11px] sm:text-xs">✦</span>
            <span className="text-[12px] sm:text-[13.5px] uppercase tracking-[0.3em] text-[#C08A4E] font-bold">
              How We Transform Spaces
            </span>
            <span className="text-[#D59318] text-[11px] sm:text-xs">✦</span>
            <div className="h-[1.5px] w-8 sm:w-16 bg-[#D59318]" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Column: Interactive Expanded Cards */}
            <div className="lg:col-span-5 flex flex-col items-start gap-5 w-full">
              {services.map((svc, idx) => {
                const isActive = activeService === idx;
                const theme = getServiceTheme(svc.name);
                
                if (isActive) {
                  return (
                    <div 
                      key={svc.number} 
                      className="relative pl-6 sm:pl-8 transition-all duration-500 w-full text-left py-2"
                    >
                      {/* Vertical golden guide line anchor */}
                      <div className="absolute left-0 top-0 bottom-0 w-[2.5px] bg-[#D59318] rounded-full" />
                      
                      <div className="flex items-center gap-3.5 mt-1">
                        <div className={`flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-2xl border transition-all duration-300 shrink-0 ${theme.activeBadge}`}>
                          {getServiceIcon(svc.name)}
                        </div>
                        <h4 className={`font-serif text-xl sm:text-2xl lg:text-[25px] font-bold ${theme.activeText}`}>
                          {svc.name}
                        </h4>
                      </div>
                      
                      <p className="text-base sm:text-[17.5px] text-neutral-800 font-light mt-3 leading-relaxed">
                        {svc.description}
                      </p>

                      {/* Premium details checklist deliverables matching mockup */}
                      <ul className="mt-5 pt-5 border-t border-[#E1D3C1]/50 grid grid-cols-1 gap-2.5">
                        {svc.deliverables.map((item, dIdx) => (
                          <li key={dIdx} className="flex items-center gap-2 text-xs sm:text-[14px] text-neutral-800 font-medium">
                            <span className="text-[#D59318] text-[10px]">✦</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                }
                
                return (
                  <button 
                    key={svc.number}
                    onClick={() => handleServiceChange(idx)}
                    className="flex items-center justify-between w-full py-4.5 px-5 rounded-2xl hover:bg-white/60 transition-all duration-300 text-left border border-[#E1D3C1]/30 cursor-pointer group"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-2xl border transition-all duration-300 shrink-0 ${theme.inactiveBadge}`}>
                        {getServiceIcon(svc.name)}
                      </div>
                      <span className={`font-serif text-[20px] sm:text-[24px] text-neutral-700 ${theme.hoverText} font-light leading-none transition-colors duration-300`}>
                        {svc.name}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Column: Visual Swatches collage */}
            <div className="lg:col-span-7 flex justify-center w-full relative">
              <div className="relative w-full aspect-[16/10] rounded-[28px] overflow-hidden border border-[#E1D3C1]/40 shadow-lg bg-[#EEF0E9]/30">
                <Image
                  src={services[activeService].image}
                  alt={services[activeService].name}
                  fill
                  unoptimized
                  className={`object-cover object-center transition-all duration-500 ease-in-out transform ${
                    isFading ? "opacity-0 scale-98 blur-sm" : "opacity-100 scale-100 blur-0"
                  }`}
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================
           SECTION 3: OUR DESIGN JOURNEY (INTERACTIVE FADE STEPPER)
      ========================================================= */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 pt-12 pb-16 relative overflow-hidden">
        
        {/* Header Title */}
        <div className="flex items-center justify-center gap-4 mb-12 text-center">
          <div className="h-[1.5px] w-8 sm:w-16 bg-[#D59318]" />
          <span className="text-[#D59318] text-[11px] sm:text-xs">✦</span>
          <span className="text-[12px] sm:text-[13.5px] uppercase tracking-[0.3em] text-[#C08A4E] font-bold">
            Our Design Journey
          </span>
          <span className="text-[#D59318] text-[11px] sm:text-xs">✦</span>
          <div className="h-[1.5px] w-8 sm:w-16 bg-[#D59318]" />
        </div>

        {/* Continuous Scrolling Vertical Timeline Layout */}
        <div className="max-w-[750px] mx-auto flex flex-col gap-20 relative pl-8 border-l border-[#E1D3C1]/50 py-4 mt-8">
          
          {/* Step 1 */}
          <div className="relative flex flex-col items-start group transition-all duration-300">
            {/* Timeline Node Dot on the left vertical border line */}
            <div className="absolute left-[-41px] top-2.5 w-4 h-4 rounded-full bg-[#FAF6F0] border-2 border-[#C08A4E] group-hover:border-[#D59318] group-hover:bg-[#D59318] transition-all duration-300 shadow-sm" />
            
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#D59318] font-bold mb-1">
              Phase 01
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-neutral-900 font-normal mb-3">
              Initial Consultation
            </h3>
            <p className="text-base sm:text-[17.5px] text-neutral-800 leading-relaxed font-light" style={{ textAlign: "justify" }}>
              The journey begins with a free consultation. We take the time to understand your needs, preferences, budget, and vision for your space. Whether you're revamping a modular kitchen or planning an institutional design, we want to know your goals.
            </p>
          </div>

          {/* Step 2 */}
          <div className="relative flex flex-col items-start group transition-all duration-300">
            {/* Timeline Node Dot on the left vertical border line */}
            <div className="absolute left-[-41px] top-2.5 w-4 h-4 rounded-full bg-[#FAF6F0] border-2 border-[#C08A4E] group-hover:border-[#D59318] group-hover:bg-[#D59318] transition-all duration-300 shadow-sm" />
            
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#D59318] font-bold mb-1">
              Phase 02
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-neutral-900 font-normal mb-3">
              Design Proposal
            </h3>
            <p className="text-base sm:text-[17.5px] text-neutral-800 leading-relaxed font-light" style={{ textAlign: "justify" }}>
              After gathering your inputs, our expert designers create a customized design proposal. This will include layout options, material suggestions, color palettes, and furniture recommendations for spaces like wardrobes, living rooms, pooja units, and more. We also use 3D visualizations to give you a virtual tour of the proposed design.
            </p>
          </div>

          {/* Step 3 */}
          <div className="relative flex flex-col items-start group transition-all duration-300">
            {/* Timeline Node Dot on the left vertical border line */}
            <div className="absolute left-[-41px] top-2.5 w-4 h-4 rounded-full bg-[#FAF6F0] border-2 border-[#C08A4E] group-hover:border-[#D59318] group-hover:bg-[#D59318] transition-all duration-300 shadow-sm" />
            
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#D59318] font-bold mb-1">
              Phase 03
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-neutral-900 font-normal mb-3">
              Material Selection
            </h3>
            <p className="text-base sm:text-[17.5px] text-neutral-800 leading-relaxed font-light" style={{ textAlign: "justify" }}>
              We guide you in selecting premium quality materials, finishes, and furnishings. From kitchen countertops and cabinetry to living room décor, our team ensures each element fits your style and the overall theme. For pooja units and bespoke joinery, we also offer specific materials that enhance the spiritual and aesthetic aspects of the space.
            </p>
          </div>

          {/* Step 4 */}
          <div className="relative flex flex-col items-start group transition-all duration-300">
            {/* Timeline Node Dot on the left vertical border line */}
            <div className="absolute left-[-41px] top-2.5 w-4 h-4 rounded-full bg-[#FAF6F0] border-2 border-[#C08A4E] group-hover:border-[#D59318] group-hover:bg-[#D59318] transition-all duration-300 shadow-sm" />
            
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#D59318] font-bold mb-1">
              Phase 04
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-neutral-900 font-normal mb-3">
              Project Planning
            </h3>
            <p className="text-base sm:text-[17.5px] text-neutral-800 leading-relaxed font-light" style={{ textAlign: "justify" }}>
              Our dedicated project managers create a clear timeline, breaking down the process into phases. This includes sourcing materials, execution, and final installation for each area like the modular kitchen or wardrobes. We ensure timely delivery without compromising on quality.
            </p>
          </div>

          {/* Step 5 */}
          <div className="relative flex flex-col items-start group transition-all duration-300">
            {/* Timeline Node Dot on the left vertical border line */}
            <div className="absolute left-[-41px] top-2.5 w-4 h-4 rounded-full bg-[#FAF6F0] border-2 border-[#C08A4E] group-hover:border-[#D59318] group-hover:bg-[#D59318] transition-all duration-300 shadow-sm" />
            
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#D59318] font-bold mb-1">
              Phase 05
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-neutral-900 font-normal mb-3">
              Execution
            </h3>
            <p className="text-base sm:text-[17.5px] text-neutral-800 leading-relaxed font-light" style={{ textAlign: "justify" }}>
              Our skilled craftsmen and professional contractors bring the design to life. Whether it's installing modern cabinetry in the kitchen or crafting bespoke living room joinery, we handle the entire process. Our team ensures precision and care at every step.
            </p>
          </div>

          {/* Step 6 */}
          <div className="relative flex flex-col items-start group transition-all duration-300">
            {/* Timeline Node Dot on the left vertical border line */}
            <div className="absolute left-[-41px] top-2.5 w-4 h-4 rounded-full bg-[#FAF6F0] border-2 border-[#C08A4E] group-hover:border-[#D59318] group-hover:bg-[#D59318] transition-all duration-300 shadow-sm" />
            
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#D59318] font-bold mb-1">
              Phase 06
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-neutral-900 font-normal mb-3">
              Quality Checks
            </h3>
            <p className="text-base sm:text-[17.5px] text-neutral-800 leading-relaxed font-light" style={{ textAlign: "justify" }}>
              After installation, we conduct thorough inspections to guarantee everything meets our high-quality standards. We ensure every detail—from modular kitchen fittings to institutional layout designs—is perfect before handover.
            </p>
          </div>

          {/* Step 7 */}
          <div className="relative flex flex-col items-start group transition-all duration-300">
            {/* Timeline Node Dot on the left vertical border line */}
            <div className="absolute left-[-41px] top-2.5 w-4 h-4 rounded-full bg-[#FAF6F0] border-2 border-[#C08A4E] group-hover:border-[#D59318] group-hover:bg-[#D59318] transition-all duration-300 shadow-sm" />
            
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#D59318] font-bold mb-1">
              Phase 07
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-neutral-900 font-normal mb-3">
              Final Walkthrough & Handover
            </h3>
            <p className="text-base sm:text-[17.5px] text-neutral-800 leading-relaxed font-light" style={{ textAlign: "justify" }}>
              We schedule a final walkthrough with you to ensure everything is as per your expectations. We hand over the project once you are completely satisfied, providing you with a space that is both stylish and functional.
            </p>
          </div>

          {/* Step 8 */}
          <div className="relative flex flex-col items-start group transition-all duration-300">
            {/* Timeline Node Dot on the left vertical border line */}
            <div className="absolute left-[-41px] top-2.5 w-4 h-4 rounded-full bg-[#FAF6F0] border-2 border-[#C08A4E] group-hover:border-[#D59318] group-hover:bg-[#D59318] transition-all duration-300 shadow-sm" />
            
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#D59318] font-bold mb-1">
              Phase 08
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-neutral-900 font-normal mb-3">
              After-Service Support
            </h3>
            <p className="text-base sm:text-[17.5px] text-neutral-800 leading-relaxed font-light" style={{ textAlign: "justify" }}>
              Our relationship doesn't end after project completion. We provide post-project support for any adjustments or maintenance required. From modular kitchen tweaks to interior adjustments, Spark Interiors is here to help.
            </p>
          </div>

        </div>

      </section>

      {/* =========================================================
          SECTION 4: MOODBOARD (CRAFTED WITH INTENTION CAPSULE CARD)
      ========================================================= */}
      <section className="pt-12 pb-16 px-6 sm:px-12 lg:px-16 relative">
        <div className="max-w-[1280px] mx-auto bg-[#FAF7F2] border border-[#E1D3C1]/50 rounded-[32px] sm:rounded-[48px] lg:rounded-[64px] overflow-hidden relative min-h-[420px] grid grid-cols-1 lg:grid-cols-12 items-center">
          
          {/* Faint vertical division line matching mockup */}
          <div className="absolute left-[58%] top-0 bottom-0 w-[1px] bg-[#E1D3C1]/35 pointer-events-none hidden lg:block" />

          {/* Left Column: Semicircular Visual Capsule flush-aligned on the left and full height on desktop */}
          <div className="lg:col-span-5 relative w-full h-[320px] lg:h-full min-h-[350px] lg:min-h-[420px] rounded-r-[200px] sm:rounded-r-[260px] lg:rounded-r-[320px] overflow-hidden group">
            <Image 
              src="/services-moodboard.jpg"
              alt="Tactile luxury copper kitchen interior design detail"
              fill
              unoptimized
              className="object-cover object-center group-hover:scale-105 transition-transform duration-[1.5s]"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>

          {/* Right Column: Editorial Copy */}
          <div className="lg:col-span-4 flex flex-col items-start px-8 sm:px-12 lg:px-10 py-12 relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1.5px] w-6 bg-[#D59318]" />
              <span className="text-[#D59318] text-[10px]">✦</span>
              <span className="text-[12px] uppercase tracking-[0.25em] text-[#C08A4E] font-bold">
                Crafted With Intention
              </span>
              <span className="text-[#D59318] text-[10px]">✦</span>
              <div className="h-[1.5px] w-6 bg-[#D59318]" />
            </div>
            
            <h2 className="font-serif text-[38px] sm:text-[44px] leading-[1.1] text-neutral-900 font-normal">
              Where details <br />
              become <span className="text-[#D59318] italic font-serif">timeless.</span>
            </h2>
            
            <p className="mt-6 text-base sm:text-[17.5px] text-[#2F352F] leading-relaxed font-light max-w-sm">
              Every texture, every finish, every element is curated with care — because true luxury is in the details.
            </p>

            <a 
              href="/portfolio"
              className="group relative inline-flex items-center gap-3.5 mt-8 text-xs font-bold tracking-[0.22em] text-[#C08A4E] hover:text-[#D59318] transition-colors pb-1 uppercase"
            >
              <span>View our work</span>
              <span className="transform group-hover:translate-x-1.5 transition-transform duration-300">→</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#D59318] group-hover:w-full transition-all duration-300" />
            </a>
          </div>

          {/* Right Column: Semicircular Visual Capsule flush-aligned on the right and full height on desktop */}
          <div className="lg:col-span-3 relative w-full h-[320px] lg:h-full min-h-[320px] lg:min-h-[420px] rounded-l-[200px] sm:rounded-l-[260px] lg:rounded-l-[320px] overflow-hidden group">
            <Image 
              src="/services-chair-sketch.jpg"
              alt="Warm luxury apartment living room with fireplace and skyline views"
              fill
              unoptimized
              className="object-cover object-center group-hover:scale-105 transition-transform duration-[1.5s]"
              sizes="(max-width: 1024px) 100vw, 25vw"
            />
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
              alt="Ready to create your perfect space wide lounge visual"
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
              Ready to create your perfect space?
            </h2>
            
            <p className="mt-4 text-[#FAF6F0] text-sm sm:text-base font-light tracking-wide drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]">
              Let's bring your vision to life.
            </p>
            
            <div className="mt-10">
              <Link 
                href="/contact"
                className="inline-block bg-[#D59318] hover:bg-[#B87D0C] text-white text-[10px] sm:text-xs font-bold tracking-[0.25em] px-8 sm:px-10 py-4 rounded-full shadow-lg hover:shadow-xl active:scale-95 transition-all duration-300 uppercase cursor-pointer"
              >
                Start your project
              </Link>
            </div>
          </div>

        </div>
      </section>


      <Footer />
    </main>
  );
}
