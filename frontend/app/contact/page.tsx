"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function ContactPage() {
  const carouselImages = [
    "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=80"
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const [briefState, setBriefState] = useState({
    designing: "",
    projectType: "",
    preferredStyle: "",
    investment: "",
    vision: "",
  });

  const [expandedStep, setExpandedStep] = useState<number>(0);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const steps = [
    {
      id: 0,
      num: "01",
      label: "Which type of space are we designing?",
      category: "designing",
      options: [
        "Apartment",
        "Villa / Bungalow",
        "Office / Workspace",
        "Hospitality",
        "Retail / Commercial",
        "Other"
      ]
    },
    {
      id: 1,
      num: "02",
      label: "How can we help transform your space?",
      category: "projectType",
      options: [
        "New Interior",
        "Renovation",
        "Styling & Decor",
        "Space Planning",
        "Turnkey Project"
      ]
    },
    {
      id: 2,
      num: "03",
      label: "Which design aesthetic matches your vision?",
      category: "preferredStyle",
      options: [
        "Modern Minimal",
        "Contemporary",
        "Luxury",
        "Classic / Traditional",
        "Industrial",
        "Other"
      ]
    },
    {
      id: 3,
      num: "04",
      label: "What is your planned investment range?",
      category: "investment",
      options: [
        "Below ₹10 Lakhs",
        "₹10 - ₹25 Lakhs",
        "₹25 - ₹50 Lakhs",
        "₹50 Lakhs & Above"
      ]
    }
  ];

  const handleSelectOption = (category: string, value: string) => {
    setBriefState((prev) => ({
      ...prev,
      [category]: value,
    }));
    
    // Auto-advance to the next step
    if (category === "designing") setExpandedStep(1);
    else if (category === "projectType") setExpandedStep(2);
    else if (category === "preferredStyle") setExpandedStep(3);
    else if (category === "investment") setExpandedStep(4);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBriefState((prev) => ({
      ...prev,
      vision: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      alert("Design Brief Submitted Successfully!");
      setBriefState({
        designing: "",
        projectType: "",
        preferredStyle: "",
        investment: "",
        vision: "",
      });
      setExpandedStep(0);
      setFormSubmitted(false);
    }, 1500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-white text-neutral-800 min-h-screen flex flex-col font-sans selection:bg-spark-gold selection:text-black overflow-x-hidden">
      
      {/* Shared Fixed Navbar */}
      <Navbar />

      {/* =========================================================
          PREMIUM VISION HERO
          Warm Ivory + Sage + Champagne Gold
      ========================================================= */}
      <section className="relative overflow-hidden bg-white pt-[85px]">
        <div className="relative min-h-[calc(100vh-85px)] grid grid-cols-1 lg:grid-cols-[54%_46%]">

          {/* Soft editorial background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div
               className="absolute -left-24 bottom-[-180px] w-[520px] h-[520px] rounded-full opacity-35"
               style={{
                 background:
                   "radial-gradient(circle, rgba(245,130,22,0.16) 0%, transparent 68%)",
               }}
            />

            <div className="absolute right-[40%] top-20 w-72 h-72 rounded-full blur-3xl opacity-20 bg-[#D9C8A9]" />

            {/* Fine architectural lines */}
            <svg
              className="absolute left-0 bottom-0 w-[260px] h-[360px] opacity-20"
              viewBox="0 0 260 360"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M0 340C65 270 88 200 88 120C88 55 118 20 178 0"
                stroke="#B58D5A"
                strokeWidth="1"
              />
              <path
                d="M0 360C76 285 110 210 110 125C110 55 142 22 205 0"
                stroke="#B58D5A"
                strokeWidth="1"
              />
              <path
                d="M0 310C46 255 65 196 65 132"
                stroke="#B58D5A"
                strokeWidth="0.8"
              />
            </svg>
          </div>

          {/* =====================================================
              LEFT — TYPOGRAPHY
          ===================================================== */}
          <div className="relative z-10 flex items-center px-7 sm:px-12 lg:pl-24 xl:pl-28 lg:pr-12 py-20 lg:py-24">
            <div className="max-w-[680px]">

              {/* Eyebrow */}
              <div className="flex items-center gap-4 mb-8">
                <span className="w-10 h-px bg-[#F58216]" />

                <span className="text-[#F58216] text-lg leading-none">
                  ✦
                </span>

                <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-[#F58216] font-semibold">
                  Let&apos;s create your space
                </p>
              </div>

              {/* Main heading */}
              <h1 className="font-serif-luxury text-[58px] sm:text-[76px] lg:text-[82px] xl:text-[92px] leading-[0.92] font-normal text-[#20251F]">
                <span className="block animate-text-reveal [animation-delay:0.15s]">
                  Your vision.
                </span>

                <span className="block mt-3 text-[#F58216] italic animate-text-reveal [animation-delay:0.3s]">
                  Our expertise.
                </span>
              </h1>

              {/* Decorative divider */}
              <div className="flex items-center gap-4 mt-9 mb-8">
                <span className="w-20 h-px bg-[#F58216]" />

                <svg
                  width="52"
                  height="16"
                  viewBox="0 0 52 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M1 8H19M33 8H51M19 8C22 8 24 5 26 2C28 5 30 8 33 8C30 8 28 11 26 14C24 11 22 8 19 8Z"
                    stroke="#F58216"
                    strokeWidth="1"
                  />
                </svg>
              </div>

              {/* Description */}
              <p className="max-w-lg text-neutral-900 text-base sm:text-lg leading-8 font-medium animate-text-reveal [animation-delay:0.45s]">
                Every beautiful space begins with a conversation.
                Tell us what you imagine, and we&apos;ll turn it into
                something beautifully yours.
              </p>

              {/* CTA */}
              <div className="mt-10 animate-text-reveal [animation-delay:0.6s]">
                <a
                  href="#design-brief"
                  className="group inline-flex items-center justify-center gap-5 min-w-[245px] px-8 py-4 bg-[#F58216] text-white rounded-sm text-[10px] font-bold tracking-[0.22em] uppercase shadow-[0_14px_35px_rgba(62,74,52,0.18)] hover:bg-[#E0720F] hover:-translate-y-0.5 transition-all duration-300"
                >
                  <span>Start Your Project</span>

                  <span className="text-lg transform group-hover:translate-x-1.5 transition-transform duration-300">
                    →
                  </span>
                </a>
              </div>

              {/* Trust line */}
              <div className="flex items-center gap-3 mt-7">
                <span className="w-5 h-5 rounded-full bg-[#E2E7DC] flex items-center justify-center text-[#586650] text-[9px]">
                  ✓
                </span>

                <p className="text-[9px] uppercase tracking-[0.18em] text-neutral-700 font-bold">
                  Personalised design • Thoughtful details • Timeless spaces
                </p>
              </div>
            </div>
          </div>

          {/* =====================================================
              RIGHT — ARCHITECTURAL IMAGE
          ===================================================== */}
          <div className="relative min-h-[520px] lg:min-h-[calc(100vh-85px)]">

            {/* Main arch-shaped image */}
            <div className="absolute inset-y-0 right-0 w-[94%] sm:w-[90%] lg:w-[92%] overflow-hidden rounded-l-[170px] sm:rounded-l-[210px]">

              <Image
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=90"
                alt="Warm contemporary interior designed by Spark Interiors"
                fill
                priority
                unoptimized
                className="object-cover object-center transition-transform duration-[1.5s] hover:scale-[1.025]"
                sizes="(max-width: 1024px) 100vw, 46vw"
              />

              {/* Warm image treatment */}
              <div className="absolute inset-0 bg-[#A78E69]/10 mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#F8F5EE]/35 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2D332B]/20 via-transparent to-transparent" />
            </div>

            {/* Overlapping floating image */}
            <div className="absolute left-[-15px] sm:left-[-35px] bottom-14 sm:bottom-20 z-20 w-[150px] h-[190px] sm:w-[210px] sm:h-[260px] rounded-2xl overflow-hidden border-4 border-white shadow-[0_20px_45px_rgba(42,43,37,0.18)] hover:scale-105 transition-transform duration-500 hidden sm:block">
              <Image
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=600&q=80"
                alt="Luxury kitchen design by Spark Interiors"
                fill
                unoptimized
                className="object-cover"
              />
            </div>

            {/* =================================================
                FLOATING SIGNATURE SEAL
            ================================================= */}
            <div className="absolute left-0 sm:left-4 lg:left-[-12px] top-1/2 -translate-y-1/2 z-20 w-[112px] h-[112px] sm:w-[128px] sm:h-[128px] rounded-full bg-[#FBF9F4] border border-[#F58216]/60 shadow-[0_18px_45px_rgba(57,55,46,0.14)] flex items-center justify-center">

              <div className="absolute inset-2 rounded-full border border-[#D8C5A7]" />

              <svg
                className="absolute inset-0 w-full h-full animate-spin-slow"
                viewBox="0 0 100 100"
                aria-hidden="true"
              >
                <defs>
                  <path
                    id="heroSealPath"
                    d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0"
                  />
                </defs>

                <text
                  fill="#F58216"
                  fontSize="6.7"
                  letterSpacing="1.4"
                  className="uppercase font-semibold"
                >
                  <textPath href="#heroSealPath">
                    TIMELESS DESIGN • CURATED SPACES •
                  </textPath>
                </text>
              </svg>

              <div className="relative z-10 flex flex-col items-center justify-center text-[#F58216]">
                <span className="text-2xl leading-none">✦</span>
                <span className="text-[7px] uppercase tracking-[0.18em] mt-1">
                  Spark
                </span>
              </div>
            </div>

            {/* Small floating material card */}
            <div className="absolute bottom-8 right-5 sm:right-8 lg:right-10 z-20 hidden sm:block">
              <div className="bg-[#FBF9F4]/95 backdrop-blur-md border border-white/70 shadow-[0_15px_35px_rgba(42,43,37,0.12)] px-5 py-4 min-w-[185px]">
                <p className="text-[8px] uppercase tracking-[0.22em] text-[#F58216] font-bold">
                  The Spark Approach
                </p>

                <p className="font-serif-luxury text-lg text-[#30372F] mt-1">
                  Warm. Personal. Timeless.
                </p>
              </div>
            </div>

            {/* Vertical side label */}
            <div className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 hidden xl:block">
              <p className="rotate-90 origin-center text-[8px] uppercase tracking-[0.35em] text-white/80 whitespace-nowrap">
                Residential • Commercial • Bespoke
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          PREMIUM DESIGN BRIEF
      ========================================================= */}
      <section
        id="design-brief"
        className="relative overflow-hidden bg-white pt-24 pb-8 sm:pt-28 sm:pb-10 lg:pt-32 lg:pb-12 px-5 sm:px-8"
      >
        {/* Soft background atmosphere */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full blur-3xl opacity-35"
            style={{
              background:
                "radial-gradient(circle, rgba(245,130,22,0.14) 0%, transparent 65%)",
            }}
          />

          {/* Top-right botanical decoration */}
          <div className="absolute -top-10 right-[-40px] opacity-20">
            <svg width="300" height="300" viewBox="0 0 300 300" fill="none">
              <path
                d="M20 260C90 210 130 120 270 20"
                stroke="#66735D"
                strokeWidth="1.2"
              />
              <path d="M82 210C55 190 43 164 45 138" stroke="#66735D" />
              <path d="M130 155C162 150 185 130 195 104" stroke="#66735D" />
              <path d="M185 105C220 98 245 75 255 45" stroke="#66735D" />
              <ellipse
                cx="46"
                cy="138"
                rx="10"
                ry="25"
                transform="rotate(-45 46 138)"
                fill="#89977D"
                fillOpacity="0.55"
              />
              <ellipse
                cx="195"
                cy="104"
                rx="10"
                ry="25"
                transform="rotate(45 195 104)"
                fill="#89977D"
                fillOpacity="0.55"
              />
              <ellipse
                cx="255"
                cy="45"
                rx="9"
                ry="23"
                transform="rotate(45 255 45)"
                fill="#89977D"
                fillOpacity="0.55"
              />
            </svg>
          </div>

          {/* Left architectural arch */}
          <div className="absolute left-[-110px] top-[38%] w-[300px] h-[430px] opacity-[0.10]">
            <div className="absolute inset-0 rounded-[50%] border border-[#8B7659]" />
            <div className="absolute left-[100px] top-[65px] w-[100px] h-[280px] rounded-t-[60px] border border-[#8B7659]" />
            <div className="absolute left-[125px] top-[105px] w-[50px] h-[200px] rounded-t-[30px] border border-[#8B7659]" />
          </div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-14 sm:mb-16">
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="w-10 h-px bg-[#F58216]" />
              <span className="text-[#F58216] text-lg">✦</span>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#A67C49] font-bold">
                Fill In Your Design Brief
              </p>
              <span className="text-[#F58216] text-lg">✦</span>
              <span className="w-10 h-px bg-[#F58216]" />
            </div>

            <h2 className="font-serif-luxury text-4xl sm:text-5xl lg:text-[58px] leading-tight text-[#29352D] font-normal">
              Create your project profile
            </h2>

            <div className="flex justify-center items-center gap-3 mt-5">
              <span className="w-16 h-px bg-[#C39A64]/60" />
              <span className="text-[#F58216] text-sm">❧</span>
              <span className="w-16 h-px bg-[#C39A64]/60" />
            </div>

            <p className="max-w-xl mx-auto mt-6 text-sm sm:text-base leading-7 text-neutral-800 font-semibold">
              Help us understand your vision and preferences so we can create a
              space that truly reflects you.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Steps 1–4 */}
            {steps.map((step) => {
              const selectedVal =
                briefState[step.category as keyof typeof briefState];
              const isExpanded = expandedStep === step.id;

              return (
                <div
                  key={step.id}
                  className={`group relative overflow-hidden rounded-2xl border transition-all duration-500 ${
                    isExpanded
                      ? "bg-[#FBF9F4] border-[#C9A675] shadow-[0_18px_45px_rgba(83,72,54,0.08)]"
                      : "bg-white/85 border-[#E5DED2] hover:border-[#C8B99F] hover:shadow-[0_12px_30px_rgba(83,72,54,0.05)]"
                  }`}
                >
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-[3px] bg-[#F58216] transition-opacity duration-500 ${
                      isExpanded ? "opacity-100" : "opacity-0"
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setExpandedStep(isExpanded ? -1 : step.id)
                    }
                    className="w-full flex items-center justify-between text-left px-6 sm:px-8 py-6 sm:py-7 cursor-pointer"
                  >
                    <div className="flex items-center gap-5">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                          isExpanded
                            ? "bg-[#F58216] text-white shadow-md"
                            : "bg-[#EEF0E9] text-[#65715B]"
                        }`}
                      >
                        <span className="font-serif-luxury text-lg">
                          {step.num}
                        </span>
                      </div>

                      <div>
                        <h3 className="font-serif-luxury text-lg sm:text-xl text-[#2F352F] font-normal">
                          {step.label}
                        </h3>

                        {selectedVal && (
                          <p className="flex items-center gap-2 mt-1.5 text-[9px] uppercase tracking-[0.15em] text-[#A67C49] font-bold">
                            <span className="w-4 h-4 rounded-full bg-[#F58216] text-white flex items-center justify-center text-[8px]">
                              ✓
                            </span>
                            {selectedVal}
                          </p>
                        )}
                      </div>
                    </div>

                    <span
                      className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isExpanded
                          ? "border-[#F58216] text-[#F58216] rotate-180"
                          : "border-[#DED8CD] text-[#8B8B83]"
                      }`}
                    >
                      <span className="text-xs">↓</span>
                    </span>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      isExpanded
                        ? "max-h-[600px] opacity-100"
                        : "max-h-0 opacity-0 pointer-events-none"
                    }`}
                  >
                    <div className="mx-6 sm:mx-8 border-t border-[#E7E0D5]" />

                    <div className="px-6 sm:px-8 py-7">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-600 font-bold mb-5">
                        Select the option that best describes your project
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {step.options.map((option, index) => {
                          const isSelected = selectedVal === option;

                          return (
                            <button
                              key={option}
                              type="button"
                              onClick={() =>
                                handleSelectOption(step.category, option)
                              }
                              className={`group/option relative min-h-[64px] px-5 rounded-xl border text-left transition-all duration-300 flex items-center justify-between ${
                                isSelected
                                  ? "bg-[#F58216] border-[#F58216] text-white shadow-lg"
                                  : "bg-[#FCFAF6] border-[#E4DDD2] text-neutral-800 hover:border-[#BDA77F] hover:bg-white font-semibold"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-9 h-9 rounded-full flex items-center justify-center border text-sm ${
                                    isSelected
                                      ? "border-white/30 bg-white/10 text-white"
                                      : "border-[#DDD2C0] text-[#F58216]"
                                  }`}
                                >
                                  {index === 0 && "⌂"}
                                  {index === 1 && "⌂"}
                                  {index === 2 && "▥"}
                                  {index === 3 && "♧"}
                                  {index === 4 && "▤"}
                                  {index === 5 && "•••"}
                                </div>

                                <span className="text-xs sm:text-sm font-medium">
                                  {option}
                                </span>
                              </div>

                              {isSelected && (
                                <span className="w-6 h-6 rounded-full bg-white text-[#F58216] flex items-center justify-center text-xs font-bold">
                                  ✓
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Step 5 — Vision */}
            <div
              className={`group relative overflow-hidden rounded-2xl border transition-all duration-500 ${
                expandedStep === 4
                  ? "bg-[#FBF9F4] border-[#C9A675] shadow-[0_18px_45px_rgba(83,72,54,0.08)]"
                  : "bg-white/85 border-[#E5DED2]"
              }`}
            >
              <div
                className={`absolute left-0 top-0 bottom-0 w-[3px] bg-[#F58216] ${
                  expandedStep === 4 ? "opacity-100" : "opacity-0"
                }`}
              />

              <button
                type="button"
                onClick={() =>
                  setExpandedStep(expandedStep === 4 ? -1 : 4)
                }
                className="w-full flex items-center justify-between text-left px-6 sm:px-8 py-6 sm:py-7 cursor-pointer"
              >
                <div className="flex items-center gap-5">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      expandedStep === 4
                        ? "bg-[#F58216] text-white"
                        : "bg-[#EEF0E9] text-[#65715B]"
                    }`}
                  >
                    <span className="font-serif-luxury text-lg">05</span>
                  </div>

                  <div>
                    <h3 className="font-serif-luxury text-lg sm:text-xl text-[#2F352F] font-normal">
                      Describe the vision for your space.
                    </h3>

                    {briefState.vision && (
                      <p className="text-[9px] uppercase tracking-[0.15em] text-[#A67C49] font-bold mt-1">
                        ✓ Design notes added
                      </p>
                    )}
                  </div>
                </div>

                <span
                  className={`w-8 h-8 rounded-full border flex items-center justify-center transition-transform duration-300 ${
                    expandedStep === 4
                      ? "rotate-180 border-[#F58216] text-[#F58216]"
                      : "border-[#DED8CD] text-[#8B8B83]"
                  }`}
                >
                  ↓
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ${
                  expandedStep === 4
                    ? "max-h-[450px] opacity-100"
                    : "max-h-0 opacity-0 pointer-events-none"
                }`}
              >
                <div className="mx-6 sm:mx-8 border-t border-[#E7E0D5]" />

                <div className="px-6 sm:px-8 py-7">
                  <textarea
                    rows={5}
                    maxLength={500}
                    placeholder="Tell us about your lifestyle, ideas, layout preferences or anything you'd like our designers to know..."
                    value={briefState.vision}
                    onChange={handleTextChange}
                    className="w-full min-h-[150px] rounded-xl bg-[#FCFAF6] border border-[#E4DDD2] px-5 py-4 text-sm text-[#3F443F] placeholder:text-[#AAA69E] focus:outline-none focus:border-[#F58216] focus:ring-1 focus:ring-[#F58216]/20 resize-none transition-all"
                  />

                  <div className="flex justify-between mt-2">
                    <span className="text-[10px] text-[#AAA69E]">
                      Your ideas help us understand your vision.
                    </span>
                    <span className="text-[10px] text-[#AAA69E]">
                      {briefState.vision.length} / 500
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Privacy reassurance */}
            <div className="mt-1 rounded-2xl border border-[#E4DDD2] bg-[#F4F1E9] px-6 py-5 flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-[#E1E6DA] flex items-center justify-center text-[#586650] shrink-0">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M12 3l7 4v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V7l7-4z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M9 12l2 2 4-4"
                  />
                </svg>
              </div>

              <div>
                <p className="text-sm font-medium text-[#3E463C]">
                  Your information is safe with us.
                </p>
                <p className="text-xs text-[#85867E] mt-1">
                  We respect your privacy and will never share your details.
                </p>
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-center mt-8">
              <button
                type="submit"
                disabled={formSubmitted}
                className="group min-w-[230px] rounded-xl bg-[#F58216] hover:bg-[#E0720F] disabled:opacity-50 text-white px-8 py-4 text-[10px] font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-4 shadow-[0_12px_30px_rgba(57,70,49,0.18)] hover:shadow-[0_18px_35px_rgba(57,70,49,0.25)] transition-all duration-300 cursor-pointer"
              >
                <span>
                  {formSubmitted ? "Submitting..." : "Submit Design Brief"}
                </span>

                {!formSubmitted && (
                  <span className="text-lg transform group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                )}
              </button>
            </div>

            <p className="text-center text-[9px] uppercase tracking-[0.18em] text-[#AAA59B] mt-1">
              Let&apos;s create something beautiful together
            </p>
          </form>
        </div>
      </section>

    {/* =========================================================
    PREMIUM CONTACT / DESIGN CONCIERGE SECTION
========================================================= */}
<section className="relative w-full overflow-hidden bg-white pt-8 pb-20 sm:pt-10 sm:pb-24 lg:pt-12 lg:pb-28">

  {/* Soft decorative background */}
  <div className="absolute inset-0 pointer-events-none overflow-hidden">

    {/* Gold organic line */}
    <div className="absolute -top-20 right-[8%] w-[500px] h-[500px] rounded-full border border-[#C49A62]/20" />

    <div className="absolute top-20 right-[3%] w-[620px] h-[620px] rounded-full border border-[#C49A62]/10" />

    {/* Soft sage glow */}
    <div
      className="absolute right-0 top-0 w-[550px] h-[700px] opacity-35 blur-3xl"
      style={{
        background:
          "radial-gradient(circle, rgba(245,130,22,0.12) 0%, transparent 70%)",
      }}
    />

    {/* Botanical decoration */}
    <div className="absolute bottom-[-30px] left-[25%] opacity-20 rotate-[-20deg]">
      <svg
        width="180"
        height="240"
        viewBox="0 0 180 240"
        fill="none"
      >
        <path
          d="M90 230C85 170 87 110 115 40"
          stroke="#65705A"
          strokeWidth="1.5"
        />

        <path
          d="M91 190C60 170 40 150 27 125"
          stroke="#65705A"
          strokeWidth="1.5"
        />

        <path
          d="M92 155C120 140 140 120 151 95"
          stroke="#65705A"
          strokeWidth="1.5"
        />

        <path
          d="M88 115C65 100 48 82 42 63"
          stroke="#65705A"
          strokeWidth="1.5"
        />

        <ellipse
          cx="39"
          cy="120"
          rx="9"
          ry="23"
          transform="rotate(-45 39 120)"
          fill="#8B9A7A"
          fillOpacity="0.5"
        />

        <ellipse
          cx="145"
          cy="98"
          rx="9"
          ry="23"
          transform="rotate(45 145 98)"
          fill="#8B9A7A"
          fillOpacity="0.5"
        />

        <ellipse
          cx="49"
          cy="73"
          rx="8"
          ry="20"
          transform="rotate(-40 49 73)"
          fill="#8B9A7A"
          fillOpacity="0.5"
        />

        <ellipse
          cx="118"
          cy="48"
          rx="8"
          ry="20"
          transform="rotate(35 118 48)"
          fill="#8B9A7A"
          fillOpacity="0.5"
        />
      </svg>
    </div>
  </div>


  <div className="relative z-10 max-w-[1500px] mx-auto px-5 sm:px-8 lg:px-12">

    <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.45fr_0.9fr] min-h-[650px]">


      {/* =====================================================
          LEFT — CONTACT INFORMATION
      ===================================================== */}
      <div className="relative bg-white px-7 sm:px-10 lg:px-12 py-12 lg:py-16 flex flex-col justify-between border border-[#F0EAE1]">

        {/* Top heading */}
        <div>

          <div className="flex items-center gap-3 mb-7">

            <span className="w-12 h-px bg-[#B58A55]" />

            <p className="text-[10px] uppercase tracking-[0.3em] text-[#A67C49] font-semibold">
              Design Concierge
            </p>

          </div>


          <h2 className="font-serif-luxury text-[42px] sm:text-[50px] lg:text-[55px] leading-[1.05] font-normal text-[#283329]">

            We'd love to

            <br />

            <span className="italic text-[#F58216]">
              hear from you.
            </span>

          </h2>


          <p className="mt-7 max-w-[390px] text-sm sm:text-[15px] leading-7 text-neutral-800 font-medium">
            Share your ideas, ask questions, or simply say hello —
            our team is here to help you create something
            extraordinary.
          </p>

        </div>


        {/* Contact details */}
        <div className="mt-12 space-y-5">

          {/* Phone */}
          <div className="flex items-center gap-4 group">

            <div className="w-12 h-12 rounded-full border border-[#E1D5C3] bg-[#FCFAF6] flex items-center justify-center text-[#F58216] transition-all duration-300 group-hover:bg-[#F58216] group-hover:text-white">

              <svg
                className="w-[18px] h-[18px]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.4"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>

            </div>


            <div>
              <p className="text-[9px] uppercase tracking-[0.22em] text-[#F58216] font-semibold">
                Call Us
              </p>

              <p className="text-sm text-[#373B36] mt-1">
                +91 95000 12200
              </p>
            </div>

          </div>


          {/* Email */}
          <div className="flex items-center gap-4 group">

            <div className="w-12 h-12 rounded-full border border-[#E1D5C3] bg-[#FCFAF6] flex items-center justify-center text-[#F58216] transition-all duration-300 group-hover:bg-[#F58216] group-hover:text-white">

              <svg
                className="w-[18px] h-[18px]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.4"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>

            </div>


            <div>

              <p className="text-[9px] uppercase tracking-[0.22em] text-[#F58216] font-semibold">
                Email Us
              </p>

              <a
                href="mailto:hello@sparkinteriors.com"
                className="text-sm text-[#373B36] mt-1 block hover:text-[#F58216] transition-colors"
              >
                hello@sparkinteriors.com
              </a>

            </div>

          </div>


          {/* Address */}
          <div className="flex items-center gap-4 group">

            <div className="w-12 h-12 rounded-full border border-[#E1D5C3] bg-[#FCFAF6] flex items-center justify-center text-[#F58216]">

              <svg
                className="w-[18px] h-[18px]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.4"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.4"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>

            </div>


            <div>

              <p className="text-[9px] uppercase tracking-[0.22em] text-[#F58216] font-semibold">
                Studio Address
              </p>

              <p className="text-xs leading-5 text-neutral-900 mt-1 max-w-[290px] font-semibold">
                No.138/2 1st Floor Kundrathur main road, Mangadu, Chennai Tamil Nadu 600122.
              </p>

            </div>

          </div>


          {/* Working hours */}
          <div className="flex items-center gap-4 group">

            <div className="w-12 h-12 rounded-full border border-[#E1D5C3] bg-[#FCFAF6] flex items-center justify-center text-[#F58216]">

              <svg
                className="w-[18px] h-[18px]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.4"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

            </div>


            <div>

              <p className="text-[9px] uppercase tracking-[0.22em] text-[#F58216] font-semibold">
                Working Hours
              </p>

              <p className="text-xs text-[#555850] mt-1">
                Mon - Sat : 10:00 AM - 7:00 PM
              </p>

            </div>

          </div>

        </div>


        {/* Brand */}
        <div className="mt-12 flex items-center gap-4">

          <div className="w-12 h-12 rounded-full bg-[#33402F] border-[3px] border-[#C59A62] flex items-center justify-center">

            <span className="font-serif-luxury text-2xl text-white">
              S
            </span>

          </div>


          <div>

            <p className="font-serif-luxury tracking-[0.25em] text-sm text-[#344033]">
              SPARK INTERIORS
            </p>

            <p className="text-[9px] tracking-[0.12em] uppercase text-[#F58216] mt-1">
              Curated spaces. Timeless living.
            </p>

          </div>

        </div>

      </div>



      {/* =====================================================
          CENTER — INTERIOR IMAGE CAROUSEL
      ===================================================== */}
      <div className="relative min-h-[500px] lg:min-h-[650px] overflow-hidden group">

        {carouselImages.map((src, idx) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={src}
              alt={`Luxury Spark Interiors Design ${idx + 1}`}
              fill
              unoptimized
              className="object-cover transition-transform duration-[4s] scale-[1.01]"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </div>
        ))}

        {/* Soft overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-[#F58216]/5 z-20 pointer-events-none" />

        {/* Left/Right Arrow controls - visible on hover */}
        <button
          onClick={handlePrev}
          className="absolute left-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-[#F58216] flex items-center justify-center shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer opacity-0 group-hover:opacity-100"
          aria-label="Previous slide"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={handleNext}
          className="absolute right-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-[#F58216] flex items-center justify-center shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer opacity-0 group-hover:opacity-100"
          aria-label="Next slide"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Bottom Slide Dot Indicators */}
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-30 flex gap-2.5">
          {carouselImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentSlide ? "bg-[#F58216] w-6" : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Curved decorative edge (matching the bright white background) */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-white [clip-path:ellipse(100%_50%_at_0%_50%)] hidden lg:block z-20" />

      </div>



      {/* =====================================================
          RIGHT — VISIT STUDIO CARD
      ===================================================== */}
      <div className="relative bg-[#FFF5EB] px-6 sm:px-10 lg:px-10 py-12 flex items-center justify-center overflow-hidden">


        {/* Decorative botanical background */}
        <div className="absolute right-[-60px] top-[-30px] opacity-30">

          <svg
            width="280"
            height="300"
            viewBox="0 0 280 300"
            fill="none"
          >

            <path
              d="M40 270C100 220 130 130 240 30"
              stroke="#F58216"
              strokeWidth="1"
            />

            <path
              d="M105 210C75 190 60 165 58 140"
              stroke="#F58216"
              strokeWidth="1"
            />

            <path
              d="M145 160C175 150 195 130 205 105"
              stroke="#F58216"
              strokeWidth="1"
            />

            <path
              d="M185 105C215 100 235 80 242 55"
              stroke="#F58216"
              strokeWidth="1"
            />

            <ellipse
              cx="61"
              cy="140"
              rx="12"
              ry="27"
              transform="rotate(-45 61 140)"
              fill="#77836B"
              fillOpacity="0.45"
            />

            <ellipse
              cx="205"
              cy="105"
              rx="12"
              ry="27"
              transform="rotate(45 205 105)"
              fill="#77836B"
              fillOpacity="0.45"
            />

          </svg>

        </div>


        {/* Card */}
        <div className="relative z-10 w-full max-w-[360px] bg-white border border-[#F5EFE6] rounded-[22px] p-8 sm:p-10 shadow-[0_25px_60px_rgba(50,60,45,0.12)]">


          {/* Flower icon */}
          <div className="w-12 h-12 mx-auto mb-8 flex items-center justify-center">

            <svg
              width="45"
              height="45"
              viewBox="0 0 45 45"
              fill="none"
            >

              <circle
                cx="22.5"
                cy="22.5"
                r="20"
                stroke="#F58216"
                strokeWidth="1"
              />

              <path
                d="M22.5 12C25 17 28 19 33 20"
                stroke="#F58216"
                strokeWidth="1.2"
              />

              <path
                d="M22.5 12C20 17 17 19 12 20"
                stroke="#F58216"
                strokeWidth="1.2"
              />

              <path
                d="M22.5 33C25 28 28 26 33 25"
                stroke="#F58216"
                strokeWidth="1.2"
              />

              <path
                d="M22.5 33C20 28 17 26 12 25"
                stroke="#F58216"
                strokeWidth="1.2"
              />

              <circle
                cx="22.5"
                cy="22.5"
                r="3"
                fill="#F58216"
              />

            </svg>

          </div>


          <p className="text-[10px] uppercase tracking-[0.28em] text-[#F58216] font-bold mb-4">
            Visit Our Studio
          </p>


          <h3 className="font-serif-luxury text-3xl sm:text-[34px] leading-tight text-[#30402F]">

            Let's meet over

            <br />

            <span className="italic text-[#F58216]">
              coffee & ideas.
            </span>

          </h3>


          <div className="w-12 h-px bg-[#F58216] mt-7 mb-6" />


          <p className="text-sm leading-6 text-[#72756D] font-light">
            Experience our studio, explore materials and
            finishes, and discuss your project in detail
            with our design experts.
          </p>


          {/* CTA */}
          <Link
            href="mailto:hello@sparkinteriors.com"
            className="group mt-8 w-full bg-[#F58216] hover:bg-[#E0720F] text-white rounded-xl px-5 py-4 flex items-center justify-between transition-all duration-300 shadow-lg"
          >

            <span className="text-[10px] uppercase tracking-[0.16em] font-semibold">
              Book a Studio Visit
            </span>

            <span className="text-lg transform group-hover:translate-x-1 transition-transform duration-300">
              →
            </span>

          </Link>


          {/* Appointment */}
          <div className="mt-8 pt-6 border-t border-[#E4DCCE] flex items-center gap-4">

            <div className="w-11 h-11 rounded-full border border-[#DCCEBB] flex items-center justify-center text-[#F58216]">

              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.4"
                  d="M8 7V3m8 4V3m-9 8h10M5 5h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z"
                />
              </svg>

            </div>


            <div>

              <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#495242]">
                By Appointment Only
              </p>

              <p className="text-xs text-neutral-800 mt-1 font-semibold">
                We look forward to welcoming you.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

    {/* Full-Width Google Map Row */}
    <div className="mt-12 w-full h-[400px] border border-[#F0EAE1] rounded-2xl overflow-hidden relative shadow-md hover:shadow-lg transition-all duration-300">
      <iframe
        src="https://maps.google.com/maps?q=No.138/2%201st%20Floor%20Kundrathur%20main%20road%20Mangadu%20Chennai%20Tamil%20Nadu%20600122&t=&z=16&ie=UTF8&iwloc=&output=embed"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="grayscale-[0.2] opacity-90 contrast-[1.05]"
        title="Spark Interiors Chennai Studio Map"
      ></iframe>
    </div>

  </div>

</section>
      

     <Footer />


      {/* Floating Bespoke Actions Console */}
      <div
        className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 flex flex-col gap-3 items-center transition-all duration-500 transform ${
          showScrollTop ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
        }`}
      >
        {/* WhatsApp Button */}
        <a
          href="https://wa.me/919500012200?text=Hi%20Spark%20Interiors%2C%20I%20would%20like%20to%20inquire%20about%20interior%20design%20services."
          target="_blank"
          rel="noopener noreferrer"
          className="group relative w-12 h-12 rounded-full bg-white border border-[#EBE8E2] text-[#25D366] hover:bg-[#25D366] hover:text-white flex items-center justify-center shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 active:scale-95"
          aria-label="Chat on WhatsApp"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.018 0C5.396 0 .02 5.366.02 11.974c0 2.112.551 4.17 1.6 6.0l-1.7 6.194 6.344-1.662a11.835 11.835 0 0 0 5.754 1.488c6.622 0 11.998-5.366 11.998-11.974C24.016 5.366 18.64 0 12.018 0zm6.208 17.02c-.25.706-1.468 1.282-2.022 1.366-.5.076-1.146.136-3.238-.724-2.67-1.1-4.386-3.822-4.52-4.002-.134-.18-1.13-1.5-1.13-2.868 0-1.368.706-2.038.956-2.316.25-.278.552-.346.736-.346.184 0 .368.002.52.01.156.008.368-.06.576.444.208.504.714 1.74.776 1.866.062.126.104.272.02.44-.084.168-.168.278-.294.42-.126.142-.266.318-.38.442-.114.12-.25.252-.108.498.142.246.632 1.042 1.356 1.684.934.828 1.72 1.084 1.966 1.206.246.12.39.102.534-.06.144-.162.614-.714.778-.956.164-.242.33-.204.556-.12.226.084 1.436.678 1.686.804.25.126.416.186.478.294.062.108.062.63-.188 1.336z"/>
          </svg>
          {/* Tooltip */}
          <span className="absolute right-14 top-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 transition-all duration-200 bg-neutral-900 text-white text-[9px] uppercase tracking-wider font-semibold py-1.5 px-3 rounded-md shadow-lg pointer-events-none whitespace-nowrap">
            Chat on WhatsApp
          </span>
        </a>

        {/* Call Button */}
        <a
          href="tel:+919500012200"
          className="group relative w-12 h-12 rounded-full bg-white border border-[#EBE8E2] text-[#F58216] hover:bg-[#F58216] hover:text-white flex items-center justify-center shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 active:scale-95"
          aria-label="Call Studio"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          {/* Tooltip */}
          <span className="absolute right-14 top-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 transition-all duration-200 bg-neutral-900 text-white text-[9px] uppercase tracking-wider font-semibold py-1.5 px-3 rounded-md shadow-lg pointer-events-none whitespace-nowrap">
            Call Studio
          </span>
        </a>

        {/* Scroll To Top Button */}
        <button
          onClick={scrollToTop}
          className="group relative w-12 h-12 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white flex items-center justify-center shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 active:scale-95 cursor-pointer"
          aria-label="Scroll to Top"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
          {/* Tooltip */}
          <span className="absolute right-14 top-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 transition-all duration-200 bg-neutral-900 text-white text-[9px] uppercase tracking-wider font-semibold py-1.5 px-3 rounded-md shadow-lg pointer-events-none whitespace-nowrap">
            Scroll to Top
          </span>
        </button>
      </div>

    </div>
  );
}
