"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export interface HeroConfig {
  type: "video" | "image";
  videoUrl: string;
  imageUrl: string;
  title: string;
}

const DEFAULT_HERO_CONFIG: HeroConfig = {
  type: "video",
  videoUrl: "/videos/hero-banner.mp4",
  imageUrl: "/hero-banner-image.jpg",
  title: "SPARK INTERIORS"
};

const ROTATING_PHRASES = [
  "warmth & character.",
  "timeless elegance.",
  "bespoke luxury.",
  "modern serenity."
];

/**
 * HeroBanner
 * Displays either a cinematic video loop or a high-resolution image as the hero background.
 * The active media type is controlled exclusively from the Admin Dashboard — no switcher on the live site.
 */
export default function HeroBanner() {
  const [config, setConfig] = useState<HeroConfig>(DEFAULT_HERO_CONFIG);
  const [isSwitching, setIsSwitching] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Rotate tagline phrase every 3.8s with smooth morph transition
  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setPhraseIndex((prev) => (prev + 1) % ROTATING_PHRASES.length);
        setIsTransitioning(false);
      }, 450);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  // Load configuration from API and localStorage
  useEffect(() => {
    // 1. Initial hydration from localStorage
    try {
      const cached = localStorage.getItem("spark_hero_config");
      if (cached) {
        const parsed = JSON.parse(cached);
        setConfig((prev) => ({ ...prev, ...parsed }));
      }
    } catch {
      // ignore JSON parse errors
    }

    // 2. Fetch latest configuration from backend API
    fetch("http://localhost:5000/api/hero")
      .then((res) => {
        if (!res.ok) throw new Error("Network response not ok");
        return res.json();
      })
      .then((data: Partial<HeroConfig>) => {
        if (data && (data.type || data.videoUrl || data.imageUrl)) {
          setConfig((prev) => {
            const updated = {
              ...prev,
              type: data.type || prev.type,
              videoUrl: data.videoUrl || prev.videoUrl,
              imageUrl: data.imageUrl || prev.imageUrl,
              title: data.title || prev.title
            };
            try {
              localStorage.setItem("spark_hero_config", JSON.stringify(updated));
            } catch {}
            return updated;
          });
        }
      })
      .catch(() => {
        // Fallback to default / localStorage gracefully
      });

    // 3. Listen for real-time updates dispatched from Admin Dashboard
    const handleCustomUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<HeroConfig>;
      if (customEvent.detail) {
        setIsSwitching(true);
        setConfig(customEvent.detail);
        setTimeout(() => setIsSwitching(false), 400);
      } else {
        try {
          const cached = localStorage.getItem("spark_hero_config");
          if (cached) setConfig(JSON.parse(cached));
        } catch {}
      }
    };

    window.addEventListener("spark_hero_update", handleCustomUpdate);
    window.addEventListener("storage", handleCustomUpdate);

    return () => {
      window.removeEventListener("spark_hero_update", handleCustomUpdate);
      window.removeEventListener("storage", handleCustomUpdate);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative w-full h-[calc(100vh-85px)] mt-[85px] min-h-[550px] max-h-[1050px] overflow-hidden bg-black select-none group"
    >

      {/* =========================================================
          DYNAMIC MEDIA RENDERER — controlled by Admin Dashboard
      ========================================================= */}
      <div className={`absolute inset-0 z-0 transition-opacity duration-700 ${isSwitching ? "opacity-30" : "opacity-100"}`}>

        {config.type === "video" ? (
          /* Cinematic Ambient Video Loop — 100% full original brightness, zero fade */
          <div className="relative w-full h-full">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              key={config.videoUrl}
              className="w-full h-full object-cover object-center"
            >
              <source src={config.videoUrl || "/videos/hero-banner.mp4"} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Video Watermark Logo — Bottom-Left Signature Placement */}
            <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-10 lg:bottom-10 lg:left-12 z-20 pointer-events-none select-none flex items-center drop-shadow-[0_4px_20px_rgba(0,0,0,0.85)] opacity-80 hover:opacity-100 transition-opacity">
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20">
                <Image
                  src="/spark-logo-transparent.png"
                  alt="Spark Interiors Watermark"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        ) : (
          /* Full-Bleed Luxury Interior Image — full brightness */
          <div className="relative w-full h-full overflow-hidden">
            <Image
              src={config.imageUrl || "/hero-banner-image.jpg"}
              alt="Spark Interiors luxury modern living space"
              fill
              priority
              unoptimized
              className="object-cover object-center scale-[1.01] group-hover:scale-[1.03] transition-transform duration-[3s] ease-out brightness-100"
            />
          </div>
        )}

      </div>

      {/* =========================================================
          PURE FLOATING CINEMATIC TYPOGRAPHY — Dynamic Luxury Transition
          100% Unobstructed Video — Elevated in airy upper zone
      ========================================================= */}
      <div className="absolute inset-x-0 top-12 sm:top-16 lg:top-20 z-20 pointer-events-none flex flex-col items-center text-center px-6 select-none animate-hero-float">
        <p className="animate-hero-slide-up animate-hero-delay-1 text-[10px] sm:text-xs uppercase tracking-[0.45em] text-[#021A26] font-extrabold drop-shadow-[0_1px_8px_rgba(255,255,255,0.7)] drop-shadow-[0_2px_14px_rgba(0,0,0,0.35)] mb-2 sm:mb-3">
          ✦ Interior Architecture &amp; Design ✦
        </p>
        <h1 className="animate-hero-slide-up animate-hero-delay-2 font-serif text-[32px] sm:text-[48px] lg:text-[58px] text-white font-normal leading-[1.14] tracking-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)] max-w-3xl">
          {config.title && config.title !== "SPARK INTERIORS" ? (
            config.title
          ) : (
            <>
              Crafting spaces with{" "}
              <span
                className={`inline-block italic font-serif text-[#021A26] transition-all duration-500 ease-out transform font-semibold ${
                  isTransitioning
                    ? "opacity-0 -translate-y-2.5 scale-95 blur-[2px]"
                    : "opacity-100 translate-y-0 scale-100 blur-0"
                }`}
                style={{
                  textShadow: "0 1px 10px rgba(255, 255, 255, 0.75), 0 0 2px rgba(255, 255, 255, 0.9), 0 4px 20px rgba(2, 26, 38, 0.4)"
                }}
              >
                {ROTATING_PHRASES[phraseIndex]}
              </span>
            </>
          )}
        </h1>
      </div>

    </section>
  );
}
