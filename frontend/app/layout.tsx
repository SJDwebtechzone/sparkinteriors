import type { Metadata } from "next";
import "./globals.css";
import FloatingActions from "@/components/FloatingActions";
import ScrollToTopOnRefresh from "@/components/ScrollToTopOnRefresh";

const BASE_URL = "https://frontend-alpha-wheat-32.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Spark Interiors | Best Interior Designers & Civil Works in Chennai",
    template: "%s | Spark Interiors",
  },
  description:
    "Spark Interiors is Chennai's top interior design and turnkey civil execution studio. Specializing in False Ceiling, Modular Kitchen, Wardrobes, Living Rooms, Crockery Units, Pooja Units, Office Interior, Shop Interior, Commercial Interior, and Civil Work with 16+ years of excellence. Free 3D consultation!",
  keywords: [
    "Virugambakkam",
    "Kovur",
    "Kattupakkam",
    "Sikkaryapuram",
    "Nazarathpettai",
    "Kozhumanivakkam",
    "kolothuvacheri",
    "Paraniputhur",
    "Vanagaram",
    "Paruthippattu",
    "Karayanchavadi",
    "Kumananchavadi",

    "interior designers in chennai",
    "best interior designers in chennai",
    "top interior designers in chennai",
    "home interior designers chennai",
    "false ceiling designers chennai",
    "modular kitchen chennai",
    "luxury modular kitchen chennai",
    "bespoke wardrobes chennai",
    "living room interior designers chennai",
    "pooja unit design chennai",
    "crockery units chennai",
    "office interior designers chennai",
    "shop interior designers chennai",
    "commercial interior designers chennai",
    "civil work contractors chennai",
    "turnkey interior civil work chennai",
    "interior designers in mangadu",
    "interior designers in kundrathur",
    "interior decorators chennai",
    "residential interiors chennai",
    "spark interiors chennai",
    "interior designers in virugambakkam",
    "interior designers in kovur",
    "interior designers in kattupakkam",
    "interior designers in sikkaryapuram",
    "interior designers in nazarathpettai",
    "interior designers in kozhumanivakkam",
    "interior designers in kolothuvacheri",
    "interior designers in paraniputhur",
    "interior designers in vanagaram",
    "interior designers in paruthippattu",
    "interior designers in karayanchavadi",
    "interior designers in kumananchavadi",
    "modular kitchen virugambakkam",
    "modular kitchen kattupakkam",
    "modular kitchen vanagaram",
    "false ceiling kovur",
    "false ceiling nazarathpettai",
    "false ceiling kumananchavadi",
  ],
  authors: [{ name: "Spark Interiors", url: BASE_URL }],
  creator: "Spark Interiors",
  publisher: "Spark Interiors",
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BASE_URL,
    siteName: "Spark Interiors",
    title: "Spark Interiors | Luxury Interior Designers & Civil Works in Chennai",
    description:
      "Transforming residences & commercial spaces across Chennai with custom False Ceilings, Modular Kitchens, Wardrobes, Living Rooms, Pooja Units & Turnkey Civil Work. 16+ years experience.",
    images: [
      {
        url: "/hero-banner-image.jpg",
        width: 1200,
        height: 630,
        alt: "Spark Interiors - Luxury Interior Architecture in Chennai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Spark Interiors | Best Interior Designers in Chennai",
    description:
      "Bespoke False Ceilings, Modular Kitchens, Wardrobes, Living Rooms, Pooja Units & Turnkey Civil Works in Chennai.",
    images: ["/hero-banner-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "64x64", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  other: {
    "geo.region": "IN-TN",
    "geo.placename":
      "Chennai; Mangadu; Kundrathur; Virugambakkam; Kovur; Kattupakkam; Sikkaryapuram; Nazarathpettai; Kozhumanivakkam; Kolothuvacheri; Paraniputhur; Vanagaram; Paruthippattu; Karayanchavadi; Kumananchavadi",
    "geo.position": "13.0238;80.1119",
    ICBM: "13.0238, 80.1119",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": `${BASE_URL}/#business`,
  name: "Spark Interiors",
  alternateName: [
    "Spark Interiors Chennai",
    "Spark Interior Design Studio",
    "Spark Interior & Civil Works",
  ],
  areaServed: [
    "Chennai",
    "Mangadu",
    "Kundrathur",
    "Virugambakkam",
    "Kovur",
    "Kattupakkam",
    "Sikkaryapuram",
    "Nazarathpettai",
    "Kozhumanivakkam",
    "Kolothuvacheri",
    "Paraniputhur",
    "Vanagaram",
    "Paruthippattu",
    "Karayanchavadi",
    "Kumananchavadi",
  ],
  image: `${BASE_URL}/spark-logo-clarity.png`,
  url: BASE_URL,
  telephone: ["+91 95000 12200", "+91 72000 80418"],
  email: "sparkinteriors2013@gmail.com",
  priceRange: "₹₹ - ₹₹₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: "No.138/2 1st Floor, Kundrathur main road",
    addressLocality: "Mangadu, Chennai",
    addressRegion: "Tamil Nadu",
    postalCode: "600122",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 13.0238,
    longitude: 80.1119,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "09:30",
      closes: "20:00",
    },
  ],
  sameAs: [
    "https://www.facebook.com/share/1Eh6DiHS88/",
    "https://www.instagram.com/spark__interiors?utm_source=qr&mdxt=bGxlcXpreXpsaGVn",
    "https://youtube.com/@spark-interiors8357?si=XdDkw-Gd2T-ACYqQ",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Interior Architecture, Design & Civil Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "False Ceiling",
          description:
            "Designer gypsum, POP, grid & wooden false ceilings with cove and LED profile lighting in Chennai.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Modular Kitchen",
          description:
            "Custom ergonomic modular kitchens in acrylic, PU finish, and marine ply with quartz and granite countertops.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Wardrobes",
          description:
            "Bespoke floor-to-ceiling sliding, hinged, and walk-in wardrobe designs with integrated lighting.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Living Rooms",
          description:
            "Luxury living room interior design, designer TV units, wall paneling, and curated seating layouts.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Crockery Units",
          description:
            "Modern tinted glass, fluted wood, and ambient backlit crockery cabinets for dining spaces.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Pooja Units",
          description:
            "Sacred, Vastu-compliant traditional and contemporary pooja mandirs in teakwood and marble.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Office Interior",
          description:
            "Ergonomic, modern corporate office interiors, executive cabins, workstations, and reception areas.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Shop Interior",
          description:
            "High-impact retail boutique and showroom interiors designed for product visibility and customer footfall.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Commercial Interior",
          description:
            "End-to-end commercial interior design and fit-outs for restaurants, clinics, studios, and businesses.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Civil Work",
          description:
            "Turnkey civil execution including demolition, masonry, plastering, plumbing, electrical, tiling, and waterproofing.",
        },
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ScrollToTopOnRefresh />
        {children}
        <FloatingActions />
      </body>
    </html>
  );
}
