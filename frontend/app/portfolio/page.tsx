"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// =========================================================
// DATASET
// =========================================================

interface MaterialSample {
  name: string;
  colorCode: string;
}

interface Project {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  image: string; // Finished room photo
  location: string;
  year: string;
  area: string;
  scope: string;
  materials: string[];
  materialSamples: MaterialSample[];
  description: string;
}


const projectsData: Project[] = [
  {
    id: "travertine-hearth",
    title: "The Travertine Hearth",
    category: "kitchens",
    categoryLabel: "Modular Kitchen",
    image: "/home-kitchen-luxury.jpg",
    location: "Benscon, Chennai",
    year: "2025",
    area: "3,200 sq.ft",
    scope: "Modular Kitchen Design",
    materials: ["White Travertine", "Smoked Oak", "Brushed Brass"],
    materialSamples: [
      { name: "White Travertine", colorCode: "bg-[#EBE5DB]" },
      { name: "Smoked Oak", colorCode: "bg-[#3E352C]" },
      { name: "Brushed Brass", colorCode: "bg-[#CBB08C]" }
    ],
    description: "A custom modular kitchen layout designed around a massive natural travertine island. Hand-applied plaster walls and warm wood panels frame the concealed storage solutions. All appliances are integrated flush into wall paneling for a silent architectural statement."
  },
  {
    id: "linen-sanctuary",
    title: "The Linen Sanctuary",
    category: "wardrobes",
    categoryLabel: "Wardrobes",
    image: "/home-bedroom-luxury.jpg",
    location: "Adyar, Chennai",
    year: "2024",
    area: "4,500 sq.ft",
    scope: "Luxury Suite Interior",
    materials: ["Belgium Linen", "Bleached Maple", "Honed Plaster"],
    materialSamples: [
      { name: "Belgium Linen", colorCode: "bg-[#E8E2D7]" },
      { name: "Bleached Maple", colorCode: "bg-[#F0EAE1]" },
      { name: "Honed Plaster", colorCode: "bg-[#E2DDD3]" }
    ],
    description: "A peaceful master suite focusing on soft textures, built-in floating bed frame, and hidden cabinetry. Belgium linens in soft natural oatmeal tones cover the walls and bed frame, creating an atmosphere of silent luxury."
  },
  {
    id: "teak-shrine",
    title: "The Teak Shrine",
    category: "pooja-units",
    categoryLabel: "Pooja Unit",
    image: "/home-pooja-unit.jpg",
    location: "ECR, Chennai",
    year: "2025",
    area: "150 sq.ft",
    scope: "Burma Teak Prayer Shrine",
    materials: ["Burma Teak", "Indian White Marble", "Hammered Brass"],
    materialSamples: [
      { name: "Burma Teak", colorCode: "bg-[#4A2E16]" },
      { name: "White Marble", colorCode: "bg-[#FDFDFD]" },
      { name: "Hammered Brass", colorCode: "bg-[#D4AF37]" }
    ],
    description: "A serene prayer unit crafted from solid Burma teak. The design integrates backlit brass panels and traditional carvings reinterpreted for modern living, with built-in storage compartments concealed beneath the marble step."
  },
  {
    id: "wabi-sabi-nook",
    title: "The Wabi-Sabi Nook",
    category: "living-rooms",
    categoryLabel: "Living Room",
    image: "/footer-luxury-interior-bg.jpg",
    location: "Anna Nagar, Chennai",
    year: "2024",
    area: "1,800 sq.ft",
    scope: "Organic Sunken Lounge",
    materials: ["Raw Clay Plaster", "Jute Fiber", "Reclaimed Teak"],
    materialSamples: [
      { name: "Raw Clay Plaster", colorCode: "bg-[#D2C5B3]" },
      { name: "Jute Fiber", colorCode: "bg-[#C2B280]" },
      { name: "Reclaimed Teak", colorCode: "bg-[#5C4033]" }
    ],
    description: "A cozy, low-profile lounge space focusing on irregular organic silhouettes, natural fabrics, and raw textured wall surfaces. Custom cushions upholstered in flax linen sit directly on a raised wood plinth."
  },
  {
    id: "ganesha-shrine",
    title: "The Ganesha Shrine",
    category: "pooja-units",
    categoryLabel: "Pooja Unit",
    image: "/about-ganesha-pooja-custom.jpg",
    location: "Kotturpuram, Chennai",
    year: "2025",
    area: "180 sq.ft",
    scope: "Custom Pooja Hallway",
    materials: ["Burma Teak", "Indian White Marble", "Hammered Brass"],
    materialSamples: [
      { name: "Burma Teak", colorCode: "bg-[#4A2E16]" },
      { name: "White Marble", colorCode: "bg-[#FDFDFD]" },
      { name: "Hammered Brass", colorCode: "bg-[#D4AF37]" }
    ],
    description: "An elegant, warm-lit Pooja shrine designed in a residential hallway, centering Ganesha on a Burma teak platform with suspended brass bells and illuminated floating timber shelves."
  },
  {
    id: "curved-cove-ceiling",
    title: "The Curved Cove Ceiling",
    category: "false-ceilings",
    categoryLabel: "False Ceiling",
    image: "/about-living-curved-custom.jpg",
    location: "Alwarpet, Chennai",
    year: "2025",
    area: "2,400 sq.ft",
    scope: "Acoustic False Ceiling Design",
    materials: ["Gypsum Board", "Micro-plaster", "Warm Cove LED"],
    materialSamples: [
      { name: "Gypsum Board", colorCode: "bg-[#EAEAEA]" },
      { name: "Micro-plaster", colorCode: "bg-[#F3EFE9]" },
      { name: "Warm Cove LED", colorCode: "bg-[#FFE8CC]" }
    ],
    description: "A gorgeous, custom-sculpted organic false ceiling featuring layered circular coves, seamless micro-plaster finishes, and dimmable warm cove lighting designed to reduce room echoes."
  },
  {
    id: "minimalist-linen-wardrobe",
    title: "The Minimalist Linen Wardrobe",
    category: "wardrobes",
    categoryLabel: "Wardrobes",
    image: "/home-bedroom-luxury-wardrobe-beige.jpg",
    location: "Adyar, Chennai",
    year: "2025",
    area: "320 sq.ft",
    scope: "Bespoke Wardrobe Fitting",
    materials: ["Laminated Glass", "Fluted Oak", "Leather Pulls"],
    materialSamples: [
      { name: "Laminated Glass", colorCode: "bg-[#ECEFF1]" },
      { name: "Fluted Oak", colorCode: "bg-[#8B5A2B]" },
      { name: "Leather Pulls", colorCode: "bg-[#7E57C2]" }
    ],
    description: "An elegant, full-height walk-in wardrobe system integrating custom fluted oak profiles, frosted glass paneled doors, and warm internal sensor lighting."
  },
  {
    id: "residential-construction",
    title: "Residential Construction",
    category: "civil-work",
    categoryLabel: "Civil Work",
    image: "/civil-residential-construction.jpg",
    location: "ECR, Chennai",
    year: "2025",
    area: "4,200 sq.ft",
    scope: "Turnkey Civil Construction",
    materials: ["Reinforced Concrete", "Red Wire-cut Bricks", "River Sand"],
    materialSamples: [
      { name: "Reinforced Concrete", colorCode: "bg-[#B0BEC5]" },
      { name: "Wire-cut Brick", colorCode: "bg-[#BF360C]" },
      { name: "M-Sand & Plaster", colorCode: "bg-[#ECEFF1]" }
    ],
    description: "Complete turnkey residential construction from deep earth foundation, RCC frame, and brick masonry to weatherproof external plastering, executed with certified structural engineering standards."
  },
  {
    id: "interior-exterior-work",
    title: "Interior & Exterior Work",
    category: "civil-work",
    categoryLabel: "Civil Work",
    image: "/civil-interior-exterior-work.jpg",
    location: "Adyar, Chennai",
    year: "2025",
    area: "3,800 sq.ft",
    scope: "Architectural Finishing & Facades",
    materials: ["Weather-shield Coatings", "Textured Plaster", "Structural Glass"],
    materialSamples: [
      { name: "Textured Plaster", colorCode: "bg-[#ECEFF1]" },
      { name: "Weather Shield", colorCode: "bg-[#B0BEC5]" },
      { name: "Architectural Metal", colorCode: "bg-[#37474F]" }
    ],
    description: "Comprehensive civil finishing including external facade rendering, compound walls, precision plastering, damp-proofing, and seamless indoor-outdoor architectural transitions."
  },
  {
    id: "flooring-tiling",
    title: "Flooring & Tiling",
    category: "civil-work",
    categoryLabel: "Civil Work",
    image: "/civil-flooring-tiling.jpg",
    location: "Anna Nagar, Chennai",
    year: "2025",
    area: "2,600 sq.ft",
    scope: "Premium Stone & Vitrified Tiling",
    materials: ["Italian Marble", "Granite Slabs", "Vitrified Grout"],
    materialSamples: [
      { name: "Italian Marble", colorCode: "bg-[#F5F5F5]" },
      { name: "Honed Granite", colorCode: "bg-[#424242]" },
      { name: "Epoxy Grout", colorCode: "bg-[#E0E0E0]" }
    ],
    description: "Laser-leveled precision flooring installation covering large-format Italian marble, anti-skid bathroom vitrified tiles, polished granite treads, and durable epoxy grouting."
  },
  {
    id: "plumbing-drainage",
    title: "Plumbing & Drainage",
    category: "civil-work",
    categoryLabel: "Civil Work",
    image: "/civil-plumbing-drainage.jpg",
    location: "Kotturpuram, Chennai",
    year: "2025",
    area: "Entire Residence",
    scope: "Concealed Sanitary & Drainage Lines",
    materials: ["CPVC Pipelines", "Cast Iron Drainage", "Brass Diverters"],
    materialSamples: [
      { name: "CPVC Pipe", colorCode: "bg-[#CFD8DC]" },
      { name: "Acoustic Drainage", colorCode: "bg-[#78909C]" },
      { name: "Pressure Regulators", colorCode: "bg-[#B0BEC5]" }
    ],
    description: "Concealed pressurized plumbing, multi-stage water filtration lines, acoustic drainage pipes, and pressure-tested sanitary fittings designed for lifelong leak-free performance."
  },
  {
    id: "painting-services",
    title: "Painting Services",
    category: "civil-work",
    categoryLabel: "Civil Work",
    image: "/civil-painting-services.jpg",
    location: "Nungambakkam, Chennai",
    year: "2025",
    area: "5,000 sq.ft",
    scope: "Luxury Emulsion & Texture Painting",
    materials: ["Royale Luxury Emulsion", "Lime Wash", "Stucco Finish"],
    materialSamples: [
      { name: "Warm Off-White", colorCode: "bg-[#FAF7F2]" },
      { name: "Venetian Stucco", colorCode: "bg-[#E0D7C6]" },
      { name: "Exterior Silicone", colorCode: "bg-[#ECEFF1]" }
    ],
    description: "Multi-coat luxury interior emulsion, hand-applied lime plaster and Venetian stucco accent walls, complemented by weather-resistant exterior silicone coating."
  },
  {
    id: "sage-glass-crockery",
    title: "The Sage & Brass Crockery Unit",
    category: "crochery-unit",
    categoryLabel: "Crockery Unit",
    image: "/uploads/1791866196623-701128140.png",
    location: "Boat Club Road, Chennai",
    year: "2025",
    area: "180 sq.ft",
    scope: "Custom Dining Crockery Cabinet",
    materials: ["Fluted Flushed Glass", "Sage Matt PU", "Backlit Warm Oak"],
    materialSamples: [
      { name: "Sage Matt PU", colorCode: "bg-[#8A9A86]" },
      { name: "Backlit Warm Oak", colorCode: "bg-[#C49A6C]" },
      { name: "Brushed Brass Handles", colorCode: "bg-[#D4AF37]" }
    ],
    description: "A bespoke minimalist dining room crockery unit combining sage green matte cabinetry, warm natural wood internal shelving, concealed LED profile lighting, and fluted glass display cabinets designed to showcase heirloom chinaware with modern elegance."
  }
];


function normalizeCategory(cat: string | null): string {
  if (!cat) return "all";
  const c = cat.toLowerCase().trim();
  if (c === "all" || c.includes("collection")) return "all";
  if (c.includes("kitchen")) return "kitchens";
  if (c.includes("wardrobe")) return "wardrobes";
  if (c.includes("civil")) return "civil-work";
  if (c.includes("crockery") || c.includes("crochery")) return "crochery-unit";
  if (c.includes("pooja") || c.includes("mandir")) return "pooja-units";
  if (c.includes("living")) return "living-rooms";
  if (c.includes("ceiling") || c.includes("false")) return "false-ceilings";
  return c;
}

function PortfolioContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams ? searchParams.get("category") : null;
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>(projectsData);
  const [categories, setCategories] = useState<{ value: string; label: string }[]>([
    { value: "all", label: "All Collections" },
    { value: "kitchens", label: "Modular Kitchens" },
    { value: "civil-work", label: "Civil Work" },
    { value: "crochery-unit", label: "Crockery Unit" },
    { value: "pooja-units", label: "Pooja Units" },
    { value: "living-rooms", label: "Living Rooms" },
    { value: "false-ceilings", label: "False Ceilings" },
    { value: "wardrobes", label: "Wardrobes" }
  ]);

  // Sync category whenever search param changes (e.g. from footer links or URL navigation)
  useEffect(() => {
    if (categoryParam) {
      const target = normalizeCategory(categoryParam);
      setActiveCategory(target);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setActiveCategory("all");
    }
  }, [categoryParam]);

  // Filter projects based on room type with normalization
  const filteredProjects = activeCategory === "all"
    ? projects
    : projects.filter((p) => normalizeCategory(p.category) === normalizeCategory(activeCategory));

  // Initialize data, parse URL category param, and Close modal on Escape key press
  useEffect(() => {
    const handleCustomCategory = (e: any) => {
      const cat = e.detail;
      if (cat) {
        const target = normalizeCategory(cat);
        setActiveCategory(target);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    window.addEventListener("spark_category_change", handleCustomCategory);

    // Fetch projects only for portfolio page
    fetch("http://localhost:5000/api/projects")
      .then((r) => r.json())
      .then((projectsResult) => {
        if (Array.isArray(projectsResult) && projectsResult.length > 0) {
          setProjects(projectsResult);
        } else {
          setProjects(projectsData);
        }

        const source = (Array.isArray(projectsResult) && projectsResult.length > 0)
          ? projectsResult
          : projectsData;

        // Canonical portfolio project categories
        const CORE_CATEGORIES = [
          { value: "all", label: "All Collections" },
          { value: "kitchens", label: "Modular Kitchens" },
          { value: "civil-work", label: "Civil Work" },
          { value: "crochery-unit", label: "Crockery Unit" },
          { value: "pooja-units", label: "Pooja Units" },
          { value: "living-rooms", label: "Living Rooms" },
          { value: "false-ceilings", label: "False Ceilings" },
          { value: "wardrobes", label: "Wardrobes" }
        ];

        // Gather unique normalized categories present in projects
        const projectCatSet = new Set(source.map((p: any) => normalizeCategory(p.category)));
        const finalCategories = [...CORE_CATEGORIES];

        // Append any extra unique project category from project database if not already present
        projectCatSet.forEach((cat) => {
          if (!finalCategories.some((c) => c.value === cat)) {
            finalCategories.push({
              value: cat,
              label: cat.replace(/-/g, " ").replace(/\b\w/g, (ch: string) => ch.toUpperCase())
            });
          }
        });

        setCategories(finalCategories);
      })
      .catch(() => {
        setProjects(projectsData);
      });

    // 3. Close modal on Escape key press
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("spark_category_change", handleCustomCategory);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#FAF6F0] text-[#252A24] font-sans selection:bg-[#D59318]/20 selection:text-[#D59318] flex flex-col justify-between overflow-x-hidden relative">
      <Navbar />

      {/* =========================================================
          SECTION 1: HERO HEADER
      ========================================================= */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 pt-32 pb-4 text-center">
        <div className="flex items-center justify-center gap-4 mb-3">
          <span className="w-12 h-[1px] bg-[#D59318]/50" />
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-[#C27A32] font-semibold">
            ✦ CHOSEN PROJECTS ✦
          </span>
          <span className="w-12 h-[1px] bg-[#D59318]/50" />
        </div>

        <h1 className="font-serif text-[38px] sm:text-[48px] lg:text-[56px] leading-tight text-[#252A24] font-normal tracking-tight">
          Spatial Work & <span className="text-[#D59318] italic font-serif">Living Portfolios</span>
        </h1>

        <p className="mt-5 text-neutral-800 text-base sm:text-[17.5px] leading-relaxed max-w-xl mx-auto font-light">
          A curated gallery of our modular interiors, spatial layouts, and architectural transformations. Click any design card to enlarge the photograph.
        </p>

        {/* Filter Navigation */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mt-6 border-b border-[#E1D3C1]/30 pb-3 max-w-4xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => {
                setActiveCategory(cat.value);
              }}
              className={`relative py-1 text-xs uppercase tracking-[0.2em] font-semibold transition-colors duration-300 cursor-pointer ${
                activeCategory === cat.value ? "text-[#D59318]" : "text-[#555B55] hover:text-[#D59318]"
              }`}
            >
              {cat.label}
              {activeCategory === cat.value && (
                <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#D59318] rounded-full" />
              )}
            </button>
          ))}
        </div>
      </section>

      {/* =========================================================
          SECTION 2: BALANCED PROJECTS GRID (All Collections & Categories)
      ========================================================= */}
      {filteredProjects.length > 0 && (
        <section id="projects-grid" className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 pb-16 w-full flex-grow">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6 max-w-[1200px] mx-auto mt-4">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="relative group cursor-pointer overflow-hidden rounded-[20px] border border-[#E1D3C1]/30 bg-white shadow-[0_8px_24px_rgba(70,55,40,0.03)] transition-all duration-500 hover:shadow-[0_12px_32px_rgba(70,55,40,0.07)] hover:-translate-y-1"
              >
                {/* Image Frame - Reduced size with sleek 16:10 aspect ratio */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-neutral-50">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
                    style={{ objectPosition: project.category === "pooja-units" ? "center 68%" : "center" }}
                  />
                  {/* Visual overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#252A24]/75 via-[#252A24]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4" />
                </div>

                {/* Grid Metadata Footer */}
                <div className="p-4 sm:p-5 flex flex-col justify-between border-t border-[#E1D3C1]/30 relative z-10 bg-white">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[9.5px] uppercase tracking-[0.2em] text-[#D59318] font-bold">
                      {project.categoryLabel}
                    </span>
                    <span className="text-[9.5px] font-bold tracking-widest text-[#C27A32] uppercase group-hover:translate-x-1 transition-transform duration-300">
                      View Project →
                    </span>
                  </div>
                  <h3 className="font-serif text-base text-[#252A24] font-normal group-hover:text-[#D59318] transition-colors duration-300 truncate">
                    {project.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* =========================================================
          SECTION 3: PORTFOLIO IMAGE LIGHTBOX (ENLARGED PHOTO)
      ========================================================= */}
      {selectedProject && (
        <div
          onClick={() => setSelectedProject(null)}
          className="fixed inset-0 bg-black/85 backdrop-blur-md z-[9999] flex items-center justify-center p-4 sm:p-8 transition-opacity duration-300 cursor-zoom-out"
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedProject(null)}
            className="fixed top-5 right-5 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white flex items-center justify-center transition-all z-[10001] cursor-pointer backdrop-blur-md border border-white/20 shadow-xl text-base font-light"
            aria-label="Close enlarged photo"
          >
            ✕
          </button>

          {/* Lightbox Modal Window */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center justify-center cursor-default"
          >
            {/* Enlarged Photo Container */}
            <div className="relative w-full max-h-[72vh] aspect-[16/10] rounded-2xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.6)] border border-white/10 bg-black/40">
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                fill
                unoptimized
                className="object-contain"
                style={{ objectPosition: selectedProject.category === "pooja-units" ? "center 68%" : "center" }}
              />
            </div>

            {/* Subtle Caption Footer */}
            <div className="w-full flex items-center justify-between px-3 pt-3.5 text-white">
              <span className="font-serif text-base sm:text-lg font-normal tracking-wide">
                {selectedProject.title}
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#D59318] font-bold bg-[#D59318]/15 border border-[#D59318]/30 px-3.5 py-1 rounded-full">
                {selectedProject.categoryLabel}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          SECTION 4: CALL TO ACTION
      ========================================================= */}
      <section className="bg-[#FAF6F0] py-16 border-t border-[#E1D3C1]/30 text-center w-full">
        <h2 className="font-serif text-[32px] sm:text-[40px] text-[#252A24] font-normal leading-tight">
          Have a space in mind?
        </h2>
        <p className="mt-4 text-neutral-800 text-base sm:text-[17.5px] leading-relaxed max-w-md mx-auto font-light">
          Let&apos;s collaborate to design a spatial environment tailored uniquely around your daily lifestyle.
        </p>
        <Link
          href="/contact"
          className="mt-8 inline-flex bg-[#D59318] hover:bg-[#B87D0C] text-white text-xs font-bold tracking-[0.2em] px-10 py-4 rounded-full shadow-lg transition-all duration-300 uppercase cursor-pointer"
        >
          Start Your Project
        </Link>
      </section>

      <Footer />
    </main>
  );
}

export default function PortfolioPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF6F0]" />}>
      <PortfolioContent />
    </Suspense>
  );
}
