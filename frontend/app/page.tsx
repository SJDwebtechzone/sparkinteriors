"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroBanner from "@/components/HeroBanner";

/* =========================================================
   DATA
========================================================= */

const stats = [
  { value: 16, suffix: "+", label: "Years in Practice" },
  { value: 180, suffix: "+", label: "Homes Delivered" },
  { value: 4, suffix: "", label: "Cities Served" },
  { value: 92, suffix: "%", label: "Referred by Past Clients" },
];

interface FeaturedProject {
  id: string;
  title: string;
  location: string;
  category: string;
  spec: string; // shown in the blueprint hover chip
  image: string;
  size: "lg" | "md"; // bento sizing
}

const featuredProjects: FeaturedProject[] = [
  {
    id: "01",
    title: "The Alcove Residence",
    location: "Chennai",
    category: "Residential Interiors",
    spec: "Living & Dining — 640 sq ft",
    image: "/home-residential-luxury-tv.jpg",
    size: "lg",
  },
  {
    id: "02",
    title: "Copperleaf Villa",
    location: "Coimbatore",
    category: "Bespoke Design",
    spec: "Kitchen & Pooja Unit — 310 sq ft",
    image: "/copperleaf-luxury-kitchen.jpg",
    size: "md",
  },
  {
    id: "03",
    title: "The Teak Shrine",
    location: "Bengaluru",
    category: "Pooja Unit Design",
    spec: "Teak & Marble Shrine — 280 sq ft",
    image: "/home-pooja-unit.jpg",
    size: "md",
  },
  {
    id: "04",
    title: "The Wabi Apartment",
    location: "Chennai",
    category: "Styling & Decor",
    spec: "Primary Suite — 420 sq ft",
    image: "/footer-luxury-interior-bg.jpg",
    size: "lg",
  },
];

interface ServiceSummary {
  number: string;
  name: string;
  description: string;
  image: string;
}

const serviceSummariesFallback: ServiceSummary[] = [
  {
    number: "01",
    name: "Modular Kitchens",
    description: "Tailored modular kitchens blending ergonomic storage, soft-close hardware, and heat-resistant quartz surfaces for seamless culinary experiences.",
    image: "/home-kitchen-luxury.jpg",
  },
  {
    number: "02",
    name: "Wardrobes",
    description: "Bespoke floor-to-ceiling walk-in and sliding wardrobe systems with fluted glass doors, smart sensor lighting, and custom organizers.",
    image: "/home-bedroom-luxury-wardrobe-green.jpg",
  },
  {
    number: "03",
    name: "Living Rooms",
    description: "Welcoming and elegant living room layouts featuring custom wall paneling, acoustic integration, and bespoke architectural TV media consoles.",
    image: "/home-residential-luxury-tv.jpg",
  },
  {
    number: "04",
    name: "Pooja Units",
    description: "Sacred prayer alcoves designed with authentic Burma teak carving, backlit brass jali panels, and concealed bell alcoves.",
    image: "/home-pooja-unit.jpg",
  },
  {
    number: "05",
    name: "False Ceilings",
    description: "Architectural false ceiling layouts with concealed warm LED cove illumination, acoustic refinement, and flush magnetic spotlights.",
    image: "/about-living-curved-custom.jpg",
  },
  {
    number: "06",
    name: "Crockery Unit",
    description: "Transform your dining space with a beautifully designed minimalist crockery unit that combines modern elegance with everyday functionality.",
    image: "/uploads/1791866196623-701128140.png",
  },
  {
    number: "07",
    name: "Civil Work",
    description: "We build modern, durable, and elegant homes with a focus on quality craftsmanship, thoughtful design, and long-lasting structural strength.",
    image: "/uploads/1792055409170-300976094.png",
  },
  {
    number: "08",
    name: "Office Work",
    description: "We design and develop modern office spaces that combine functionality, comfort, and professional aesthetics.",
    image: "/uploads/1792060886090-274025143.png",
  },
  {
    number: "09",
    name: "Commercial Space",
    description: "From retail outlets to business complexes, our focus is on quality construction, smart space planning, and modern architectural design that supports business growth.",
    image: "/uploads/1792062649340-103344752.png",
  },
];

interface Testimonial {
  quote: string;
  name: string;
  project: string;
}

const testimonialsFallback: Testimonial[] = [
  {
    quote:
      "Spark spent more time listening than presenting. Six months in, our home still feels like it was always meant to look this way.",
    name: "Ramya & Karthik",
    project: "4BHK Villa, Chennai",
  },
  {
    quote:
      "They handled our pooja unit and the modular kitchen with the same care as the living room. Nothing felt like an afterthought.",
    name: "Divya Menon",
    project: "Apartment Renovation, Bengaluru",
  },
  {
    quote:
      "Our home finally looks like the sanctuary we always dreamed of. The craftsmanship and material choices held up beautifully.",
    name: "Aravind & Family",
    project: "Penthouse Residence, Coimbatore",
  },
];

/* =========================================================
   MAIN EXPORT PAGE Component
 ========================================================= */

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#FAF6F0] text-[#2F352F] font-sans antialiased selection:bg-[#D59318]/10 selection:text-[#D59318]">
      <Navbar />

      {/* Untouched Hero Banner component */}
      <HeroBanner />

      <PhilosophyStrip />
      <WhyChooseUs />
      <FeaturedWork />
      <ServicesStrip />
      <Testimonials />
      <FAQ />
      <ClosingCTA />

      <Footer />
    </main>
  );
}

/* =========================================================
   HELPER COMPONENT: ANIMATED COUNTER (Viewport Triggered)
========================================================= */

function AnimatedCounter({ 
  target, 
  duration = 1500, 
  formatter = (v: number) => String(v) 
}: { 
  target: number; 
  duration?: number; 
  formatter?: (v: number) => string 
}) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTimestamp: number | null = null;
          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            setCount(Math.floor(progress * target));
            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          };
          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={elementRef}>{formatter(count)}</span>;
}

/* =========================================================
   SECTION: PHILOSOPHY STRIP (Our Vision - Premium Sculptural UI)
========================================================= */

const visionImages = [
  { src: "/home-pooja-unit.jpg", label: "Pooja unit / details" },
  { src: "/home-kitchen-minimalist-custom.jpg", label: "Kitchen & dining" },
  { src: "/home-bedroom-luxury-wardrobe-green.jpg", label: "Wardrobes" },
  { src: "/home-residential-luxury-tv.jpg", label: "Living room" },
];

const statsData = [
  {
    value: 16,
    suffix: "+",
    label: "Years of Experience",
    icon: (
      <svg className="w-6 h-6 text-[#D59318]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    )
  },
  {
    value: 180,
    suffix: "+",
    label: "Projects Completed",
    icon: (
      <svg className="w-6 h-6 text-[#D59318]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
        <path d="M14 2v4a2 2 0 0 0 2 2h4" />
        <path d="M10 9H8" />
        <path d="M16 13H8" />
        <path d="M16 17H8" />
      </svg>
    )
  },
  {
    value: 1200,
    suffix: "+",
    label: "Happy Clients",
    formatter: (v: number) => v >= 1000 ? (v / 1000).toFixed(1) + "K" : String(v),
    icon: (
      <svg className="w-6 h-6 text-[#D59318]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    )
  }
];

function PhilosophyStrip() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(3); // Default to Living room
  const [userInteracted, setUserInteracted] = useState(false);

  useEffect(() => {
    if (userInteracted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          // Play sequence: Detail (0) -> Kitchen (1) -> Wardrobes (2) -> Living Room (3)
          let currentStep = 0;
          setActiveIndex(0);

          const interval = setInterval(() => {
            currentStep++;
            if (currentStep <= 3) {
              setActiveIndex(currentStep);
            } else {
              clearInterval(interval);
            }
          }, 1800);

          return () => clearInterval(interval);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [userInteracted]);

  const handleThumbnailHover = (index: number) => {
    setUserInteracted(true);
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(3); // Revert to Living room default
  };

  return (
    <section ref={sectionRef} className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 pt-24 pb-6 sm:pt-32 sm:pb-8 overflow-hidden">
      
      {/* Centered Header (Creative Domains Style) */}
      <div className="flex flex-col items-center justify-center text-center mb-8 w-full">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-[1.5px] w-8 sm:w-16 bg-[#D59318]" />
          <span className="text-[#D59318] text-[11px] sm:text-xs">✦</span>
          <span className="text-[12px] sm:text-[13.5px] uppercase tracking-[0.3em] text-[#C08A4E] font-bold">
            Our Vision
          </span>
          <span className="text-[#D59318] text-[11px] sm:text-xs">✦</span>
          <div className="h-[1.5px] w-8 sm:w-16 bg-[#D59318]" />
        </div>
        <h2 className="font-serif text-[36px] sm:text-[46px] lg:text-[50px] leading-[1.15] text-neutral-900 font-normal tracking-tight max-w-4xl">
          We believe a home should slow down to the <span className="text-[#D59318] italic font-serif font-medium">pace of the people</span> who live in it.
        </h2>
        <div className="w-12 h-[1.5px] bg-[#D59318] mt-6" />
      </div>

      {/* 3-Column Top Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        
        {/* Column 1 (Left): Editorial Info */}
        <div className="lg:col-span-5 flex flex-col items-start">
          
          <p className="text-neutral-800 text-base sm:text-[18px] leading-relaxed max-w-xl font-light text-justify">
            We approach modular joinery, custom stone details, and luxury residential space planning as quiet, functional choreography. By integrating natural travertine, hand-applied plasters, and solid oak finishes, we design high-end spaces that prioritize silent simplicity, warmth, and honest materiality.
          </p>

          {/* Outline capsule button */}
          <Link
            href="/about"
            className="mt-8 inline-flex items-center justify-center px-6 py-3 border border-[#D59318]/60 text-[#D59318] rounded-full text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-[#D59318] hover:text-white transition-all duration-300"
          >
            Discover Our Story
            <span className="ml-2">→</span>
          </Link>
        </div>

        {/* Column 2 (Center): Thumbnail Stack with SVG Wavy Line */}
        <div className="lg:col-span-2 flex flex-row lg:flex-col justify-between gap-4 lg:gap-0 h-auto lg:h-[420px] sm:lg:h-[480px] relative pl-0 lg:pl-12 w-full">
          
          {/* SVG Vertical Curved Wave Connector (Hidden on mobile/tablet) */}
          <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-8 pointer-events-none">
            <svg className="w-full h-full text-[#D59318]" viewBox="0 0 40 380" fill="none">
              {/* Wavy line path */}
              <path
                d="M 30,20 C 10,80 10,140 30,190 C 10,240 10,300 30,360"
                stroke="#D59318"
                strokeWidth="1"
                fill="none"
                opacity="0.35"
              />
              
              {/* Inactive anchor dots */}
              <circle cx="30" cy="20" r="3" fill="#FAF6F0" stroke="#D59318" strokeWidth="1.2" />
              <circle cx="30" cy="190" r="3" fill="#FAF6F0" stroke="#D59318" strokeWidth="1.2" />
              <circle cx="30" cy="360" r="3" fill="#FAF6F0" stroke="#D59318" strokeWidth="1.2" />

              {/* Active pulsing dot */}
              {activeIndex === 0 && <circle cx="30" cy="20" r="5.5" fill="#D59318" className="animate-pulse" />}
              {activeIndex === 1 && <circle cx="30" cy="190" r="5.5" fill="#D59318" className="animate-pulse" />}
              {activeIndex === 2 && <circle cx="30" cy="360" r="5.5" fill="#D59318" className="animate-pulse" />}
            </svg>
          </div>

          {/* 3 Smaller Thumbnail Cards */}
          {visionImages.slice(0, 3).map((img, idx) => (
            <div
              key={idx}
              onMouseEnter={() => handleThumbnailHover(idx)}
              onMouseLeave={handleMouseLeave}
              className={`relative flex-1 lg:flex-none aspect-[1.3/1] lg:w-[125px] lg:h-[92px] rounded-[16px] overflow-hidden border-2 cursor-pointer transition-all duration-500 ease-out ${
                activeIndex === idx ? "border-[#D59318] scale-[1.06] shadow-md z-10" : "border-transparent opacity-85 hover:opacity-100"
              }`}
            >
              <Image
                src={img.src}
                alt={img.label}
                fill
                unoptimized
                className="object-cover object-center"
                sizes="125px"
              />
            </div>
          ))}

        </div>

        {/* Column 3 (Right): Large Panoramic Display Window */}
        <div className="lg:col-span-5 relative w-full h-[320px] sm:h-[420px] lg:h-[480px] overflow-hidden rounded-tl-[100px] sm:rounded-tl-[120px] rounded-br-[100px] sm:rounded-br-[120px] rounded-tr-[20px] sm:rounded-tr-[24px] rounded-bl-[20px] sm:rounded-bl-[24px] border border-[#E1D3C1]/35 bg-white p-3 shadow-md">
          <div className="relative w-full h-full rounded-tl-[86px] sm:rounded-tl-[106px] rounded-br-[86px] sm:rounded-br-[106px] rounded-tr-[16px] sm:rounded-tr-[20px] rounded-bl-[16px] sm:rounded-bl-[20px] overflow-hidden">
            {visionImages.map((img, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 transition-all duration-[900ms] cubic-bezier(0.25, 1, 0.5, 1) ${
                  activeIndex === idx ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-105 pointer-events-none"
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.label}
                  fill
                  unoptimized
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Ledger: 3 Icon-based Stats (Enhanced Highlighted View) */}
      <div className="mt-8 border-2 border-[#D59318]/35 rounded-[32px] bg-gradient-to-br from-[#FAF7F2] via-[#FAF7F2] to-[#D59318]/5 py-10 px-6 sm:px-12 w-full grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 items-center shadow-[0_16px_48px_-12px_rgba(213, 147, 24,0.12)]">
        {statsData.map((stat, idx) => (
          <div 
            key={idx} 
            className="flex items-center gap-5 md:gap-6 px-6 sm:px-12 md:px-8 lg:px-12 border-[#E1D3C1]/60 last:border-0 md:border-r"
          >
            {/* Architectural Highlighted Icon Frame */}
            <div className="flex-shrink-0 w-13 h-13 rounded-[16px] border border-[#D59318]/30 bg-[#FAF7F2] flex items-center justify-center shadow-[0_4px_12px_-2px_rgba(213, 147, 24,0.06)]">
              {stat.icon}
            </div>
            {/* Stat Numbers and Details */}
            <div className="flex flex-col">
              <span className="font-serif text-3xl sm:text-4xl text-neutral-900 font-normal leading-none mb-1.5">
                <AnimatedCounter target={stat.value} formatter={stat.formatter} />
                <span className="text-[#D59318] font-bold ml-1">{stat.suffix}</span>
              </span>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#D59318] font-extrabold leading-tight">
                {stat.label}
              </span>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}

/* =========================================================
   SECTION: WHY CHOOSE US (Premium Editorial Layout)
========================================================= */

const whyChooseUsImages = [
  { src: "/about-us-img.jpg", alt: "Bespoke stone courtyard design with water feature" },
  { src: "/home-tv-unit-grey-custom.jpg", alt: "Modern custom TV console with marble back panel and grey fluting" },
  { src: "/home-pooja-unit.jpg", alt: "Luxury modular backlit jaali Pooja unit" }
];

function WhyChooseUs() {
  const [currentImgIdx, setCurrentImgIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImgIdx((prev) => (prev + 1) % whyChooseUsImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const points = [
    {
      title: "Bespoke Designs",
      desc: "Tailored entirely around your lifestyle, daily routines, and aesthetic preferences.",
    },
    {
      title: "Expert Craftsmanship",
      desc: "Impeccable construction, premium material selections, and attention to details.",
    },
    {
      title: "Complete Solutions",
      desc: "A smooth, stress-free project lifecycle from initial concept sketch to final handover.",
    },
  ];

  return (
    <section className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 pt-6 pb-6 sm:pt-8 sm:pb-8 overflow-hidden">
      
      {/* Centered Header (Creative Domains Style) */}
      <div className="flex flex-col items-center justify-center text-center mb-8 w-full">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-[1.5px] w-8 sm:w-16 bg-[#D59318]" />
          <span className="text-[#D59318] text-[11px] sm:text-xs">✦</span>
          <span className="text-[12px] sm:text-[13.5px] uppercase tracking-[0.3em] text-[#C08A4E] font-bold">
            The Spark Difference
          </span>
          <span className="text-[#D59318] text-[11px] sm:text-xs">✦</span>
          <div className="h-[1.5px] w-8 sm:w-16 bg-[#D59318]" />
        </div>
        <h2 className="font-serif text-[36px] sm:text-[44px] leading-[1.15] text-neutral-900 font-normal tracking-tight max-w-4xl">
          We will help you decide why you must <span className="text-[#D59318] italic font-serif font-medium">choose us.</span>
        </h2>
        <div className="w-12 h-[1.5px] bg-[#D59318] mt-6" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        
        {/* Left Column: Text & Features (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col items-start">
          
          {/* Premium Interactive Checklist Cards */}
          <div className="space-y-4 w-full">
            {points.map((pt, idx) => (
              <div 
                key={idx} 
                className="group/item relative flex items-start gap-5 p-5 rounded-[24px] border border-transparent hover:border-[#E1D3C1]/50 hover:bg-[#FAF7F2] hover:shadow-md transition-all duration-500 ease-out"
              >
                {/* Architectural Target Marker */}
                <div className="flex-shrink-0 w-6 h-6 rounded-full border border-[#D59318]/30 flex items-center justify-center bg-white mt-1 group-hover/item:border-[#D59318] transition-colors duration-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D59318]" />
                </div>
                
                {/* Description */}
                <div>
                  <h4 className="font-serif text-xl sm:text-[22px] text-[#D59318] font-normal mb-2 transition-colors duration-300">
                    {pt.title}
                  </h4>
                  <p className="text-neutral-800 text-base sm:text-[17.5px] leading-relaxed font-light text-justify">
                    {pt.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Right Column: Premium Framed Asymmetric Image Slideshow (7 Cols) */}
        <div className="lg:col-span-7 relative w-full aspect-[4/3] transition-all duration-700 ease-out hover:-translate-y-2 group">
          {/* Double-layer architectural backing shadow frame */}
          <div className="absolute inset-0 border border-[#D59318]/15 rounded-tr-[140px] rounded-bl-[140px] rounded-tl-[32px] rounded-br-[32px] translate-x-2.5 translate-y-2.5 bg-[#D59318]/5 transition-all duration-700 ease-out group-hover:translate-x-0 group-hover:translate-y-0 -z-10" />
          
          <div className="w-full h-full rounded-tr-[140px] rounded-bl-[140px] rounded-tl-[32px] rounded-br-[32px] overflow-hidden border border-[#E1D3C1]/50 bg-white p-3.5 shadow-2xl transition-all duration-700 ease-out group-hover:shadow-[0_25px_60px_-15px_rgba(213, 147, 24,0.15)] relative">
            <div className="relative w-full h-full rounded-tr-[128px] rounded-bl-[128px] rounded-tl-[22px] rounded-br-[22px] overflow-hidden bg-neutral-100">
              
              {whyChooseUsImages.map((img, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-all duration-[1200ms] cubic-bezier(0.25, 1, 0.25, 1) ${
                    idx === currentImgIdx 
                      ? "opacity-100 scale-100 pointer-events-auto" 
                      : "opacity-0 scale-[1.05] pointer-events-none"
                  }`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    unoptimized
                    className="object-cover object-center scale-[1.01] group-hover:scale-[1.06] transition-transform duration-[3s] ease-out"
                    sizes="(max-width: 1024px) 100vw, 55vw"
                  />
                </div>
              ))}

              {/* Ambient vignette backing overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/15 via-transparent to-transparent pointer-events-none z-10" />
              
              {/* Slideshow dot indicators inside bottom corner */}
              <div className="absolute bottom-5 right-6 z-20 flex gap-2">
                {whyChooseUsImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImgIdx(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-500 border border-[#D59318]/50 ${
                      idx === currentImgIdx 
                        ? "bg-[#D59318] scale-110 shadow-sm" 
                        : "bg-white/80 hover:bg-white"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}



/* =========================================================
   SECTION: FEATURED WORK (Signature Bento Gallery with Parallax Hover)
========================================================= */

function FeaturedWork() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section id="projects" className="border-t border-b border-[#E1D3C1]/50 bg-[#FAF7F2]/50 pt-8 pb-6 sm:pt-10 sm:pb-8 px-6 sm:px-12 lg:px-16">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Centered Header (Creative Domains Style) */}
        <div className="flex flex-col items-center justify-center text-center mb-8 w-full">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[1.5px] w-8 sm:w-16 bg-[#D59318]" />
            <span className="text-[#D59318] text-[11px] sm:text-xs">✦</span>
            <span className="text-[12px] sm:text-[13.5px] uppercase tracking-[0.3em] text-[#C08A4E] font-bold">
              Selected Portfolios
            </span>
            <span className="text-[#D59318] text-[11px] sm:text-xs">✦</span>
            <div className="h-[1.5px] w-8 sm:w-16 bg-[#D59318]" />
          </div>
          <h2 className="font-serif text-[36px] sm:text-[46px] leading-[1.15] text-neutral-900 font-normal max-w-4xl">
            A closer look <span className="italic text-[#D59318] font-serif font-medium">at the craftsmanship.</span>
          </h2>
          <div className="w-12 h-[1.5px] bg-[#D59318] mt-6" />
        </div>

        {/* Filmstrip Accordion Row */}
        <div className="flex flex-col md:flex-row w-full h-[520px] md:h-[500px] lg:h-[560px] gap-4 md:gap-5">
          {featuredProjects.map((p, idx) => {
            const isActive = idx === activeIdx;
            return (
              <div
                key={p.id}
                onMouseEnter={() => setActiveIdx(idx)}
                onClick={() => setActiveIdx(idx)}
                className={`relative rounded-[28px] overflow-hidden border border-[#E1D3C1]/50 bg-white transition-all duration-[850ms] cubic-bezier(0.25, 1, 0.22, 1) cursor-pointer select-none ${
                  isActive 
                    ? "flex-[3.5] md:flex-[4.2] h-[250px] md:h-full shadow-2xl z-10" 
                    : "flex-[1] h-[80px] md:h-full opacity-100 scale-[0.99] md:scale-100"
                }`}
              >
                
                {/* Background Project Image (Original High-Res, 100% Brightness & Clarity) */}
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  unoptimized
                  className="object-cover object-center scale-[1.01] transition-transform duration-[2s] ease-out opacity-100"
                  sizes="(max-width: 768px) 100vw, 30vw"
                />

                {/* Subtle bottom-only text gradient backdrop (leaves original image bright and clear) */}
                <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-black/85 via-black/35 to-transparent z-10 pointer-events-none" />

                {/* Details layout container */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end items-start z-20">
                  
                  {/* Category Eyebrow */}
                  <span className="text-[#D59318] text-[9.5px] uppercase tracking-[0.25em] font-bold mb-1.5 leading-none drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                    {p.category}
                  </span>

                  {/* Title */}
                  <h3 className="font-serif text-lg sm:text-xl lg:text-2xl text-white font-normal leading-snug mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                    {p.title}
                  </h3>

                  {/* Expandable Specifications Box (reveals on active) */}
                  <div 
                    className={`transition-all duration-700 ease-out overflow-hidden ${
                      isActive ? "max-h-36 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    {/* Specs text details */}
                    <div className="flex flex-col gap-1.5 border-t border-white/25 pt-2.5 mt-1">
                      <span className="text-white/90 text-xs font-light drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                        Location: <span className="font-medium text-[#D59318]">{p.location}</span>
                      </span>
                      <span className="text-white text-[10px] sm:text-[10.5px] font-bold tracking-wider uppercase bg-black/40 backdrop-blur-sm rounded-full px-3 py-1 mt-1 border border-white/20 inline-block w-fit">
                        {p.spec}
                      </span>
                    </div>

                    {/* Quick Link Button */}
                    <Link
                      href="/portfolio"
                      className="mt-4 inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.22em] text-[#D59318] font-bold hover:text-white transition-colors"
                    >
                      EXPLORE PROJECT <span className="text-xs">→</span>
                    </Link>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Full-Index CTA Link */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/portfolio"
            className="group relative inline-flex items-center gap-4 text-xs font-bold tracking-[0.25em] text-[#D59318] pb-1.5 uppercase cursor-pointer"
          >
            <span>View full project index</span>
            <span className="transform group-hover:translate-x-1.5 transition-transform duration-300">
              →
            </span>
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#D59318] group-hover:w-full transition-all duration-300" />
          </Link>
        </div>

      </div>
    </section>
  );
}

/* =========================================================
   SECTION: SERVICES STRIP (Luxury Grid Showcase)
========================================================= */

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

  // 7. Civil Work - Terracotta & Slate Rust
  if (n.includes("civil") || n.includes("construction") || n.includes("structure")) {
    return {
      activeBadge: "bg-gradient-to-br from-[#D97706] to-[#92400E] text-white shadow-md shadow-[#D97706]/30 border-transparent scale-105",
      inactiveBadge: "bg-[#D97706]/12 text-[#B45309] border-[#D97706]/35 group-hover:bg-[#D97706]/22 group-hover:border-[#D97706]/60 group-hover:scale-105",
      activeText: "text-[#B45309]",
      hoverText: "group-hover:text-[#B45309]"
    };
  }

  // 8. Styling & Decor - Royal Amethyst Violet
  if (n.includes("styling") || n.includes("decor") || n.includes("art")) {
    return {
      activeBadge: "bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] text-white shadow-md shadow-[#8B5CF6]/30 border-transparent scale-105",
      inactiveBadge: "bg-[#8B5CF6]/12 text-[#7C3AED] border-[#8B5CF6]/35 group-hover:bg-[#8B5CF6]/22 group-hover:border-[#8B5CF6]/60 group-hover:scale-105",
      activeText: "text-[#7C3AED]",
      hoverText: "group-hover:text-[#7C3AED]"
    };
  }

  // Crockery Unit - Warm Cinnamon Bronze
  if (n.includes("crockery") || n.includes("crochery")) {
    return {
      activeBadge: "bg-gradient-to-br from-[#B45309] to-[#78350F] text-white shadow-md shadow-[#B45309]/30 border-transparent scale-105",
      inactiveBadge: "bg-[#B45309]/12 text-[#92400E] border-[#B45309]/35 group-hover:bg-[#B45309]/22 group-hover:border-[#B45309]/60 group-hover:scale-105",
      activeText: "text-[#92400E]",
      hoverText: "group-hover:text-[#92400E]"
    };
  }

  // Office Work / Commercial - Executive Navy / Cobalt
  if (n.includes("office") || n.includes("commercial") || n.includes("work")) {
    return {
      activeBadge: "bg-gradient-to-br from-[#2563EB] to-[#1E3A8A] text-white shadow-md shadow-[#2563EB]/30 border-transparent scale-105",
      inactiveBadge: "bg-[#2563EB]/12 text-[#1D4ED8] border-[#2563EB]/35 group-hover:bg-[#2563EB]/22 group-hover:border-[#2563EB]/60 group-hover:scale-105",
      activeText: "text-[#1D4ED8]",
      hoverText: "group-hover:text-[#1D4ED8]"
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

  // 6. Civil Work: Turnkey Architecture & Structural Masonry
  if (n.includes("civil") || n.includes("construction") || n.includes("structure")) {
    return (
      <svg className="w-5.5 h-5.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M5 21V7l8-4v18M13 11l6 3v7" />
        <path d="M9 9v.01M9 13v.01M9 17v.01M17 17v.01" />
      </svg>
    );
  }

  // 7. Crockery Unit: Minimalist Glass Display Cabinet & Stemware
  if (n.includes("crockery") || n.includes("crochery")) {
    return (
      <svg className="w-5.5 h-5.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" fill="currentColor" fillOpacity="0.12" />
        <path d="M12 3v18M3 12h18" />
        <path d="M6 7h3M15 7h3M6 16h3M15 16h3" strokeWidth="1.5" />
      </svg>
    );
  }

  // 8. Office Work / Commercial: Modern Architectural Workstation Desk & Monitor
  if (n.includes("office") || n.includes("commercial") || n.includes("work")) {
    return (
      <svg className="w-5.5 h-5.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="4" width="14" height="10" rx="1.5" fill="currentColor" fillOpacity="0.15" />
        <path d="M9 14v4M15 14v4M6 18h12M2 20h20" />
      </svg>
    );
  }

  // 9. Bespoke Design / Custom Joinery: Drafting Compass & T-Square Ruler
  if (n.includes("bespoke") || n.includes("custom")) {
    return (
      <svg className="w-5.5 h-5.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="5" r="2" fill="currentColor" fillOpacity="0.3" />
        <path d="M12 7L6 21M12 7l6 14M8.5 15h7" />
        <path d="M4 10h16" />
      </svg>
    );
  }

  // 10. Styling & Decor: Framed Canvas Art & Artisan Ceramic Vase
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

function getServiceImage(service: { id?: string; name?: string; image?: string } | undefined): string {
  if (!service) return "/home-residential-luxury-tv.jpg";
  const n = (service.name || service.id || "").toLowerCase();

  // If service has a valid uploaded image that is NOT the old placeholder kitchen:
  if (service.image && service.image.trim() !== "" && service.image !== "/about-us-img.jpg") {
    if (service.image.includes("false-ceiling")) return "/about-living-curved-custom.jpg";
    return service.image;
  }

  // Exact fallback matching the title name
  if (n.includes("office") || n.includes("commercial") || n.includes("work")) {
    return "/about-studio-office.jpg";
  }
  if (n.includes("ceiling") || n.includes("light")) {
    return "/about-living-curved-custom.jpg";
  }
  if (n.includes("civil") || n.includes("construction")) {
    return "/civil-residential-construction.jpg";
  }
  if (n.includes("living") || n.includes("residential") || n.includes("hall") || n.includes("licin")) {
    return "/home-residential-luxury-tv.jpg";
  }
  if (n.includes("kitchen")) {
    return "/home-kitchen-luxury.jpg";
  }
  if (n.includes("wardrobe") || n.includes("bedroom")) {
    return "/home-bedroom-luxury-wardrobe-green.jpg";
  }
  if (n.includes("pooja") || n.includes("mandir") || n.includes("temple")) {
    return "/home-pooja-unit.jpg";
  }
  if (n.includes("crockery") || n.includes("crochery")) {
    return "/uploads/1791866196623-701128140.png";
  }
  return "/home-residential-luxury-tv.jpg";
}

function ServicesStrip() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [list, setList] = useState<any[]>([]);

  const fetchServices = () => {
    fetch("http://localhost:5000/api/services")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const formatted = data.map((item, idx) => ({
            ...item,
            number: String(idx + 1).padStart(2, "0")
          }));
          setList(formatted);
        } else {
          setList(serviceSummariesFallback);
        }
      })
      .catch(() => {
        setList(serviceSummariesFallback);
      });
  };

  useEffect(() => {
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

  if (list.length === 0) {
    return null;
  }

  const currentIdx = Math.min(activeIdx, list.length - 1);
  const currentService = list[currentIdx] || list[0];
  const currentServiceName = currentService?.name || "Interior Design";
  const currentServiceImage = getServiceImage(currentService);

  return (
    <section 
      id="services" 
      className="relative overflow-hidden bg-[#FAF6F0] pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 border-t border-[#E1D3C1]/30 scroll-mt-24 sm:scroll-mt-28"
    >
      
      {/* Centered Section Header (Spans across the top) */}
      <div className="w-full flex flex-col items-center mb-10 sm:mb-14 max-w-[1240px] mx-auto">
        {/* Eyebrow Label */}
        <div className="flex items-center justify-center gap-4 mb-6 sm:mb-8">
          <span className="w-12 h-[1px] bg-[#D59318]/50" />
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-[#C27A32] font-semibold flex items-center gap-2">
            ✦ What We Design ✦
          </span>
          <span className="w-12 h-[1px] bg-[#D59318]/50" />
        </div>

        {/* Heading */}
        <h2 className="font-serif text-[34px] sm:text-[46px] lg:text-[50px] leading-[1.15] tracking-tight text-[#252A24] text-center max-w-4xl mx-auto font-normal">
          Spaces tailored <br className="sm:hidden" /> to the way <span className="text-[#D59318] italic font-serif">you live.</span>
        </h2>

        {/* Accent thin line divider */}
        <div className="w-16 h-[1px] bg-[#D7B98F] mt-7 mx-auto" />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch w-full max-w-[1240px] mx-auto">
        
        {/* Left Column: List Menu (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between items-start w-full">
          {/* Subtitle */}
          <p className="text-base sm:text-[17px] leading-[1.85] text-neutral-800 font-light mb-6 text-justify max-w-md">
            Every space we create is a balance of beauty, function and feeling — designed around your lifestyle, your routines and your story.
          </p>

          {/* Vertical Menu stack with unique colorful modern icons */}
          <div className="flex flex-col w-full border-t border-[#E1D3C1]/30">
            {list.map((s, idx) => {
              const isActive = idx === currentIdx;
              const theme = getServiceTheme(s.name);
              return (
                <div
                  key={s.id || idx}
                  onClick={() => setActiveIdx(idx)}
                  onMouseEnter={() => setActiveIdx(idx)}
                  className="group flex flex-col py-3.5 sm:py-4 border-b border-[#E1D3C1]/20 cursor-pointer select-none transition-all duration-300 w-full"
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3.5">
                      {/* Unique Premium Architectural Colorful Modern Icon Badge */}
                      <div className={`flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-2xl border transition-all duration-300 shrink-0 ${
                        isActive ? theme.activeBadge : theme.inactiveBadge
                      }`}>
                        {getServiceIcon(s.name)}
                      </div>

                      <h3 className={`font-serif text-lg sm:text-[22px] transition-all duration-300 ${
                        isActive 
                          ? `${theme.activeText} font-medium translate-x-1` 
                          : `text-neutral-700 ${theme.hoverText}`
                      }`}>
                        {s.name}
                      </h3>
                    </div>

                    <span className={`font-light text-xl transition-all duration-300 mr-2 ${
                      isActive ? `rotate-45 ${theme.activeText}` : `text-neutral-400 ${theme.hoverText}`
                    }`}>
                      +
                    </span>
                  </div>
                  
                  {/* Expanding Description Panel */}
                  <div className={`transition-all duration-500 ease-out overflow-hidden pl-[52px] sm:pl-[58px] ${
                    isActive ? "max-h-96 opacity-100 mt-2.5" : "max-h-0 opacity-0"
                  }`}>
                    <p className="text-neutral-700 text-sm sm:text-[15.5px] leading-relaxed font-light text-justify max-w-md">
                      {s.description}
                    </p>

                    {/* Mobile Image preview (only visible on mobile/tablet when active) */}
                    <div className="block lg:hidden mt-3 relative w-full h-44 rounded-xl overflow-hidden border border-[#E1D3C1]/50 shadow-sm">
                      <Image
                        src={getServiceImage(s)}
                        alt={s.name}
                        fill
                        unoptimized
                        className="object-cover object-center"
                      />
                      <div className="absolute bottom-2.5 right-3 z-10 pointer-events-none">
                        <span className="px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-xs text-[10px] text-[#FAF6F0] uppercase tracking-wider font-semibold border border-[#D59318]/40">
                          ✦ {s.name}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Explore all CTA */}
          <Link
            href="/portfolio"
            className="mt-8 inline-flex items-center gap-3 text-[11px] font-bold tracking-[0.25em] text-[#D59318] hover:text-[#B87D0C] transition-colors uppercase cursor-pointer"
          >
            <span>Explore All Services</span>
            <span className="transition-transform duration-300 hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* Right Column: Visual Collage (7 Cols, dynamically stretches to full height of section) */}
        <div className="hidden lg:block lg:col-span-7 relative w-full h-full min-h-[640px] select-none rounded-2xl overflow-hidden shadow-sm">
          {/* Slot 1: Top Left Showcase */}
          <div 
            style={{ clipPath: "polygon(0% 0%, 100% 0%, 77% 100%, 0% 100%)" }}
            className={`absolute top-0 left-0 w-[61.2%] h-[54%] transition-all duration-[700ms] ease-out ${
              currentServiceName.toLowerCase().includes("pooja")
                ? "opacity-100 scale-100 z-10 saturate-100" 
                : "opacity-45 scale-[0.98] z-0 blur-[0.2px]"
            }`}
          >
            <Image
              src="/home-pooja-unit.jpg"
              alt="Pooja Unit"
              fill
              unoptimized
              className="object-cover object-center"
            />
          </div>

          {/* Slot 2: Top Right Showcase */}
          <div 
            style={{ clipPath: "polygon(26.5% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
            className={`absolute top-0 right-0 w-[53.1%] h-[58%] transition-all duration-[700ms] ease-out ${
              currentServiceName.toLowerCase().includes("wardrobe")
                ? "opacity-100 scale-100 z-10 saturate-100" 
                : "opacity-45 scale-[0.98] z-0 blur-[0.2px]"
            }`}
          >
            <Image
              src="/home-bedroom-luxury-wardrobe-green.jpg"
              alt="Wardrobe Showcase"
              fill
              unoptimized
              className="object-cover object-center"
            />
          </div>

          {/* Slot 3: Bottom Left Showcase */}
          <div 
            className={`absolute bottom-0 left-0 w-[35.1%] h-[46%] transition-all duration-[700ms] ease-out ${
              currentServiceName.toLowerCase().includes("crockery") || currentServiceName.toLowerCase().includes("crochery")
                ? "opacity-100 scale-100 z-10 saturate-100" 
                : "opacity-45 scale-[0.98] z-0 blur-[0.2px]"
            }`}
          >
            <Image
              src="/uploads/1791866196623-701128140.png"
              alt="Crockery Unit Showcase"
              fill
              unoptimized
              className="object-cover object-center"
            />
          </div>

          {/* Slot 4: Craftsmanship Wood Detail (Bottom Middle Accent) */}
          <div 
            style={{ clipPath: "polygon(33% 0%, 73.7% 0%, 35.3% 100%, 33% 100%)" }}
            className="absolute bottom-0 left-[25%] w-[30%] h-[46%] transition-all duration-[700ms] ease-out opacity-35 scale-[0.98] z-0 blur-[0.4px]"
          >
            <Image
              src="/home-furniture-detail.jpg"
              alt="Craftsmanship Joinery Detail"
              fill
              unoptimized
              className="object-cover object-center"
            />
          </div>

          {/* Slot 5: Active Service Dynamic Feature Showcase (Bottom Right Wedge) */}
          <div 
            style={{ clipPath: "polygon(17.8% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
            className="absolute bottom-0 right-0 w-[64.6%] h-[42%] transition-all duration-[700ms] ease-out opacity-100 scale-100 z-10 saturate-100 shadow-2xl overflow-hidden"
          >
            <Image
              key={currentServiceImage}
              src={currentServiceImage}
              alt={`${currentServiceName} Showcase`}
              fill
              unoptimized
              className="object-cover object-center transition-all duration-700 ease-out hover:scale-105"
            />
            {/* Floating Glass Pill explicitly displaying the active category name */}
            <div className="absolute bottom-3 right-4 z-30 pointer-events-none">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/65 backdrop-blur-md border border-[#D59318]/50 text-white shadow-md">
                <span className="text-[#D59318] text-[9.5px]">✦</span>
                <span className="uppercase tracking-[0.18em] font-semibold text-[10.5px] text-[#FAF6F0]">
                  {currentServiceName}
                </span>
              </div>
            </div>
          </div>

          {/* Vector Overlay Masks: Drawing borders between shapes exactly as requested */}
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none z-20" 
            viewBox="0 0 100 100" 
            preserveAspectRatio="none"
          >
            {/* Main Diagonal divider */}
            <line x1="61" y1="0" x2="35.5" y2="100" stroke="#FAF6F0" strokeWidth="1.2" />
            {/* Left Horizontal line */}
            <line x1="0" y1="54" x2="47" y2="54" stroke="#FAF6F0" strokeWidth="1.2" />
            {/* Right Horizontal line */}
            <line x1="46" y1="58" x2="100" y2="58" stroke="#FAF6F0" strokeWidth="1.2" />
            {/* Bottom vertical divider */}
            <line x1="35" y1="54" x2="35" y2="100" stroke="#FAF6F0" strokeWidth="1.2" />
          </svg>
        </div>

      </div>
    </section>
  );
}



/* =========================================================
   SECTION: TESTIMONIALS (Interactive Slider Board)
========================================================= */

function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [list, setList] = useState<any[]>([]);

  // Form State variables
  const [formName, setFormName] = useState("");
  const [formRole, setFormRole] = useState("");
  const [formQuote, setFormQuote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/testimonials?approved=1")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map((item) => ({
            ...item,
            project: item.role // Map backend 'role' to local display 'project'
          }));
          setList(mapped);
        } else {
          setList(testimonialsFallback);
        }
      })
      .catch((err) => {
        setList(testimonialsFallback);
      });
  }, []);

  const changeSlide = (idx: number) => {
    setFade(false);
    setTimeout(() => {
      setActiveIndex(idx);
      setFade(true);
    }, 250);
  };

  const handleNext = () => {
    if (list.length === 0) return;
    const nextIdx = (activeIndex + 1) % list.length;
    changeSlide(nextIdx);
  };

  const handlePrev = () => {
    if (list.length === 0) return;
    const prevIdx = (activeIndex - 1 + list.length) % list.length;
    changeSlide(prevIdx);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formRole || !formQuote) return;

    setIsSubmitting(true);
    setSubmitStatus("");

    let uploadedImageUrl = "/about-team.jpg"; // default fallback

    // If an image file is selected, upload it first
    if (selectedFile) {
      setUploadingImage(true);
      setSubmitStatus("Uploading project image...");
      try {
        const formData = new FormData();
        formData.append("image", selectedFile);

        const uploadRes = await fetch("http://localhost:5000/api/upload", {
          method: "POST",
          body: formData
        });

        if (uploadRes.ok) {
          const uploadData = await uploadRes.json();
          uploadedImageUrl = uploadData.imageUrl;
        } else {
          console.error("Image upload failed");
        }
      } catch (err) {
        console.error("Upload error:", err);
      } finally {
        setUploadingImage(false);
      }
    }

    setSubmitStatus("Saving your review...");

    const newTestimonial = {
      id: `t_${Date.now()}`,
      name: formName,
      role: formRole,
      quote: formQuote,
      image: uploadedImageUrl,
      avatar: uploadedImageUrl,
      approved: 0
    };

    try {
      const res = await fetch("http://localhost:5000/api/testimonials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newTestimonial)
      });

      if (res.ok) {
        setSubmitStatus("Success! Your review has been submitted for admin approval.");
        setFormName("");
        setFormRole("");
        setFormQuote("");
        setSelectedFile(null);
        
        // Auto-close modal on success
        setTimeout(() => {
          setShowFeedbackModal(false);
          setSubmitStatus("");
        }, 3000);
      } else {
        setSubmitStatus("Error: Failed to submit testimonial.");
      }
    } catch (err) {
      setSubmitStatus("Error: Unable to connect to server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (list.length === 0) {
    return null;
  }

  const activeItem = list[activeIndex];

  // Helper fallbacks for detail images inside collage
  const detailImages = [
    "/home-furniture-detail.jpg",
    "/home-pooja-unit.jpg",
    "/home-tv-unit-grey-custom.jpg"
  ];
  const detailImage = activeItem.avatar && activeItem.avatar.trim() !== "" && activeItem.avatar !== activeItem.image 
    ? activeItem.avatar 
    : detailImages[activeIndex % detailImages.length];

  return (
    <section className="relative overflow-hidden bg-[#FAF6F0] pt-10 sm:pt-12 pb-12 sm:pb-16 border-t border-[#E1D3C1]/20">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-12 lg:px-16">
        
        {/* Header */}
        <div className="flex items-center justify-center gap-4 mb-16 sm:mb-20 text-center">
          <div className="h-[1px] w-12 bg-[#D59318]/50" />
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-[#C27A32] font-semibold flex items-center gap-2">
            ✦ Client Journals ✦
          </span>
          <div className="h-[1px] w-12 bg-[#D59318]/50" />
        </div>

        {/* Double-Image Collage Split Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20 items-center w-full">
          
          {/* Left Side: Overlapping Photo Collage (5 Cols) */}
          <div className="md:col-span-5 relative w-full aspect-[0.82] sm:max-w-[420px] md:max-w-none mx-auto group/collage">
            
            {/* Large Main Portrait Frame */}
            <div className="w-[82%] h-[85%] absolute top-0 left-0 rounded-2xl overflow-hidden border border-[#E1D3C1]/30 bg-[#FAF6F0] shadow-[0_15px_40px_rgba(70,55,40,0.06)] transition-transform duration-700 ease-out group-hover/collage:translate-y-[-4px]">
              <div className={`w-full h-full relative transition-all duration-[600ms] ease-in-out ${fade ? "opacity-100 scale-100" : "opacity-0 scale-98"}`}>
                <Image
                  src={activeItem.image && activeItem.image.trim() !== "" ? activeItem.image : "/about-us-img.jpg"}
                  alt={`Project layout - ${activeItem.project}`}
                  fill
                  unoptimized
                  className="object-cover object-center"
                />
              </div>
            </div>

            {/* Small Overlapping Detail Frame */}
            <div className="w-[46%] h-[46%] absolute bottom-0 right-0 rounded-2xl overflow-hidden border-4 border-[#FAF6F0] bg-[#FAF6F0] shadow-[0_20px_45px_rgba(70,55,40,0.12)] transition-transform duration-700 ease-out group-hover/collage:translate-x-[6px] group-hover/collage:translate-y-[4px]">
              <div className={`w-full h-full relative transition-all duration-[600ms] ease-in-out delay-75 ${fade ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
                <Image
                  src={detailImage}
                  alt={`Tactile detail - ${activeItem.project}`}
                  fill
                  unoptimized
                  className="object-cover object-center"
                />
              </div>
            </div>

          </div>

          {/* Right Side: Editorial Content & Controls (7 Cols) */}
          <div className="md:col-span-7 flex flex-col justify-center items-start">
            
          
            {/* Review text */}
            <div className={`transition-all duration-[400ms] ease-in-out ${fade ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <p className="font-serif text-xl sm:text-2xl lg:text-[28px] leading-relaxed text-[#252A24] font-light italic">
                “{activeItem.quote}”
              </p>

              {/* Accent Line */}
              <div className="w-12 h-[1px] bg-[#D7B98F] my-8" />

              {/* Identity */}
              <div className="flex flex-col">
                <h4 className="font-serif text-lg sm:text-[21px] text-[#252A24] font-normal leading-tight">
                  {activeItem.name}
                </h4>
                <p className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#D59318] font-semibold mt-2.5">
                  {activeItem.project}
                </p>
              </div>
            </div>

            {/* Controls (Navigation bar) */}
            <div className="flex flex-wrap items-center justify-between gap-6 mt-12 sm:mt-16 w-full">
              <div className="flex items-center gap-6">
                {/* Pagination text indicator */}
                <span className="font-serif text-sm text-[#C27A32] tracking-wider font-light">
                  {String(activeIndex + 1).padStart(2, "0")} <span className="text-[#E1D3C1]/60 mx-1">/</span> {String(list.length).padStart(2, "0")}
                </span>

                {/* Pagination line progress */}
                <div className="flex-1 min-w-[80px] sm:min-w-[120px] h-[1px] bg-[#E1D3C1]/50 relative overflow-hidden">
                  <div 
                    className="absolute top-0 left-0 h-full bg-[#D59318] transition-all duration-[600ms] ease-in-out"
                    style={{ width: `${((activeIndex + 1) / list.length) * 100}%` }}
                  />
                </div>

                {/* Circular navigation rings */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={handlePrev}
                    className="w-10 h-10 rounded-full border border-[#E1D3C1]/50 flex items-center justify-center text-[#C27A32] text-xs hover:border-[#D59318] hover:bg-[#D59318]/5 transition-all duration-300 active:scale-95 cursor-pointer"
                    aria-label="Previous journal entry"
                  >
                    ←
                  </button>
                  <button
                    onClick={handleNext}
                    className="w-10 h-10 rounded-full border border-[#E1D3C1]/50 flex items-center justify-center text-[#C27A32] text-xs hover:border-[#D59318] hover:bg-[#D59318]/5 transition-all duration-300 active:scale-95 cursor-pointer"
                    aria-label="Next journal entry"
                  >
                    →
                  </button>
                </div>
              </div>

              {/* Add Testimonial Trigger Button */}
              <button
                onClick={() => setShowFeedbackModal(true)}
                className="bg-[#D59318] hover:bg-[#B87D0C] text-white text-[10px] sm:text-xs font-bold tracking-[0.2em] px-6 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 uppercase cursor-pointer flex items-center gap-2"
              >
                <span>Write a Review</span>
                <span className="text-xs">✍</span>
              </button>
            </div>

          </div>

        </div>

        {/* Testimonial Submission Form Modal overlay */}
        {showFeedbackModal && (
          <div className="fixed inset-0 flex items-center justify-center z-[9999] p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop Blur overlay */}
            <div
              onClick={() => setShowFeedbackModal(false)}
              className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm transition-opacity duration-500"
            />

            {/* Centered Modal Card */}
            <div className="relative w-full max-w-[460px] bg-[#FAF6F0] border border-[#E1D3C1]/50 rounded-[36px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.2)] p-8 sm:p-10 text-left z-10 animate-blur-reveal">
              
              {/* Close Button Trigger */}
              <button
                onClick={() => setShowFeedbackModal(false)}
                className="absolute top-6 right-6 w-8 h-8 rounded-full border border-[#E1D3C1]/60 flex items-center justify-center bg-[#FAF6F0] hover:bg-neutral-950 hover:text-white transition-all duration-300 hover:rotate-90 active:scale-90 text-[#555B55] text-sm z-20 shadow-sm cursor-pointer"
                aria-label="Close modal"
              >
                ✕
              </button>

              <div className="text-center mb-8 mt-2">
                <span className="text-[#D59318] text-xs font-semibold block mb-2 tracking-[0.3em]">✦ JOIN OUR JOURNAL ✦</span>
                <h3 className="font-serif text-3xl text-neutral-900 font-normal">
                  Share your <span className="text-[#D59318] italic font-serif font-medium">experience.</span>
                </h3>
                <p className="text-neutral-500 text-[13px] mt-2.5 font-light leading-relaxed">
                  We would love to hear how your design journey went.
                </p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div>
                  <label className="block text-[10px] sm:text-xs uppercase tracking-wider text-neutral-500 font-bold mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full px-4 py-3.5 bg-white/70 backdrop-blur-xs border border-[#E1D3C1]/50 rounded-2xl focus:border-[#D59318] focus:ring-4 focus:ring-[#D59318]/10 focus:outline-none text-sm text-neutral-800 transition-all duration-300 placeholder:text-neutral-400"
                    placeholder="e.g. Rahul Sharma"
                  />
                </div>

                <div>
                  <label className="block text-[10px] sm:text-xs uppercase tracking-wider text-neutral-500 font-bold mb-2">
                    Project Detail
                  </label>
                  <input
                    type="text"
                    required
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value)}
                    className="w-full px-4 py-3.5 bg-white/70 backdrop-blur-xs border border-[#E1D3C1]/50 rounded-2xl focus:border-[#D59318] focus:ring-4 focus:ring-[#D59318]/10 focus:outline-none text-sm text-neutral-800 transition-all duration-300 placeholder:text-neutral-400"
                    placeholder="e.g. Kitchen Renovation, Chennai"
                  />
                </div>

                <div>
                  <label className="block text-[10px] sm:text-xs uppercase tracking-wider text-neutral-500 font-bold mb-2">
                    Project Image (Finished Interior)
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          setSelectedFile(e.target.files[0]);
                        }
                      }}
                      className="hidden"
                      id="testimonial-image-upload"
                    />
                    <label
                      htmlFor="testimonial-image-upload"
                      className="w-full flex items-center justify-between px-4 py-3.5 bg-white/70 backdrop-blur-xs border border-[#E1D3C1]/50 rounded-2xl cursor-pointer hover:border-[#D59318] transition-all duration-300 text-sm text-neutral-500"
                    >
                      <span className="truncate max-w-[280px]">
                        {selectedFile ? selectedFile.name : "Choose an image of your space..."}
                      </span>
                      <span className="text-neutral-400">📁</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] sm:text-xs uppercase tracking-wider text-neutral-500 font-bold mb-2">
                    Your Feedback
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formQuote}
                    onChange={(e) => setFormQuote(e.target.value)}
                    className="w-full px-4 py-3.5 bg-white/70 backdrop-blur-xs border border-[#E1D3C1]/50 rounded-2xl focus:border-[#D59318] focus:ring-4 focus:ring-[#D59318]/10 focus:outline-none text-sm text-neutral-800 transition-all duration-300 placeholder:text-neutral-400 resize-none"
                    placeholder="How did Spark Interiors transform your space?"
                  />
                </div>

                {submitStatus && (
                  <p className={`text-xs text-center font-medium ${submitStatus.startsWith("Success") ? "text-green-600 animate-pulse" : "text-red-500"}`}>
                    {submitStatus}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#D59318] hover:bg-[#B87D0C] text-white text-[11px] sm:text-xs font-bold tracking-[0.25em] py-4 rounded-2xl shadow-[0_12px_30px_-5px_rgba(213, 147, 24,0.25)] hover:shadow-[0_15px_35px_-5px_rgba(213, 147, 24,0.35)] active:scale-[0.98] transition-all duration-300 uppercase cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? "Submitting..." : "Submit Review"}
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}



/* =========================================================
   SECTION: FAQ (Premium Accordion Timeline)
========================================================= */

const faqItems = [
  {
    q: "What is your design philosophy?",
    a: "We practice a wabi-sabi inspired philosophy — prioritizing raw authenticity, functional simplicity, and spaces that feel warm, natural, and timeless."
  },
  {
    q: "How long does a typical home interior project take?",
    a: "A complete residential design project typically ranges from 12 to 18 weeks. This includes detailed spatial planning, material selection, custom fabrication, and final on-site installation."
  },
  {
    q: "Do you provide customized modular solutions?",
    a: "Yes, we design and build fully bespoke modular kitchens, pooja units, and wardrobe systems. Everything is fabricated to order in our local facilities to ensure absolute quality control."
  },
  {
    q: "How do we collaborate on material selection?",
    a: "We guide you through a curated tactile journey. You will inspect physical samples of stone, wood finishes, fabrics, and metals from our Material Vault before any final decisions are made."
  },
  {
    q: "Can you work within my budget?",
    a: "We tailormake our scope of work to fit your design intentions. By focusing on essential quality and avoiding unnecessary ornamentation, we deliver maximum value for your investment."
  }
];

function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggleFAQ = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="relative overflow-hidden bg-[#FAF6F0] pt-8 sm:pt-10 pb-24 sm:pb-28 border-t border-[#E1D3C1]/20">
      <div className="max-w-[1000px] mx-auto px-6 sm:px-12">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-16 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="w-12 h-[1px] bg-[#D59318]/50" />
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-[#C27A32] font-semibold flex items-center gap-2">
              ✦ FAQ ✦
            </span>
            <span className="w-12 h-[1px] bg-[#D59318]/50" />
          </div>
          <h2 className="font-serif text-[32px] sm:text-[40px] leading-tight text-[#252A24] font-normal mt-4">
            Common Inquiries
          </h2>
          <div className="w-10 h-[1px] bg-[#D7B98F] mt-6" />
        </div>

        {/* Accordion Stack */}
        <div className="flex flex-col w-full border-t border-[#E1D3C1]/30">
          {faqItems.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx}
                className="border-b border-[#E1D3C1]/20 py-8 transition-all duration-300 w-full"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="flex items-center justify-between text-left w-full group cursor-pointer focus:outline-none select-none"
                >
                  <div className="flex items-center flex-1">
                    {/* Question text */}
                    <h3 className={`font-serif text-lg sm:text-[21px] transition-all duration-300 leading-snug pr-4 ${
                      isOpen ? "text-[#D59318] font-medium" : "text-[#252A24] hover:text-[#D59318]/80"
                    }`}>
                      {item.q}
                    </h3>
                  </div>
                  {/* Plus/Close Icon */}
                  <span className={`text-2xl font-light transition-all duration-300 mr-2 ${
                    isOpen ? "rotate-45 text-[#D59318]" : "text-[#E1D3C1] group-hover:text-neutral-500"
                  }`}>
                    +
                  </span>
                </button>

                {/* Accordion Answer Content */}
                <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  isOpen ? "max-h-40 opacity-100 mt-5" : "max-h-0 opacity-0"
                }`}>
                  <p className="text-[#555B55] text-sm sm:text-base leading-relaxed font-light text-justify max-w-3xl">
                    {item.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}



/* =========================================================
   SECTION: CLOSING CTA (Visual Splendor Capsule)
========================================================= */

function ClosingCTA() {
  return (
    <section className="py-14 sm:py-20 px-4 sm:px-10 lg:px-16 max-w-[1440px] mx-auto">
      <div className="max-w-[1360px] mx-auto rounded-[28px] sm:rounded-[44px] overflow-hidden bg-[#021A26] border border-[#E1D3C1]/25 shadow-2xl relative group">
        
        {/* Full Showcase with Modern Architectural Interior & Highlight Callouts */}
        <div className="relative w-full aspect-[16/11] sm:aspect-[16/9] overflow-hidden select-none">
          {/* 100% Bright, Crisp Modern Interior Photography */}
          <Image
            src="/home-residential-luxury-tv.jpg"
            alt="Spark Interiors modern architectural residence with custom media wall and ambient cove ceiling"
            fill
            unoptimized
            priority
            className="object-cover object-center brightness-100 contrast-[1.02] scale-[1.0] group-hover:scale-[1.02] transition-transform duration-[3s] ease-out"
          />

          {/* Modern Text Model INSIDE The Image: Floating Frosted Glass Architectural Dock */}
          <div className="absolute bottom-4 sm:bottom-7 left-4 sm:left-8 right-4 sm:right-8 z-20">
            <div className="max-w-[1040px] mx-auto bg-[#021A26]/85 backdrop-blur-xl border border-[#E1D3C1]/35 rounded-2xl sm:rounded-full px-6 sm:px-10 py-4 sm:py-5 shadow-[0_20px_50px_rgba(0,0,0,0.75)] flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-8">
              
              {/* Left Column: Eyebrow + Modern Headline */}
              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-1.5">
                  <span className="w-4 h-[1px] bg-[#D59318]" />
                  <span className="text-[#F3C33D] text-[10px]">✦</span>
                  <span className="text-[10px] uppercase tracking-[0.28em] text-[#F3C33D] font-bold">
                    Designed for Living
                  </span>
                  <span className="w-4 h-[1px] bg-[#D59318]" />
                </div>
                <h3 className="font-serif text-lg sm:text-2xl text-white font-normal tracking-tight">
                  Thoughtful details. <span className="italic font-serif text-[#F3C33D]">Timeless modern luxury.</span>
                </h3>
              </div>

              {/* Right Column: CTA Buttons */}
              <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                <Link
                  href="/contact"
                  className="bg-[#F58216] hover:bg-[#D76D0E] text-white text-[11px] sm:text-xs font-bold tracking-[0.2em] px-7 sm:px-8 py-3.5 rounded-full shadow-lg hover:shadow-orange-500/30 active:scale-95 transition-all uppercase cursor-pointer"
                >
                  Book a consultation
                </Link>
                <Link
                  href="/portfolio"
                  className="group inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-white/90 hover:text-[#F3C33D] transition-colors py-2 uppercase cursor-pointer"
                >
                  <span>Explore Projects</span>
                  <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
