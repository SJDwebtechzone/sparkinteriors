import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute:
      "Interior Design Portfolio & Projects Chennai | Spark Interiors",
  },
  description:
    "Explore Spark Interiors' curated portfolio of completed residential and commercial projects across Chennai. Real site photographs of false ceilings, modular kitchens, custom wardrobes, luxury living rooms, pooja shrines, and turnkey civil renovations.",
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

    "interior design portfolio chennai",
    "modular kitchen designs photos chennai",
    "false ceiling designs photos chennai",
    "living room interior photos chennai",
    "pooja unit design ideas chennai",
    "bedroom wardrobe designs chennai",
    "office interior photos chennai",
    "commercial interior projects chennai",
    "completed interior works chennai",
    "luxury apartment interior chennai gallery",
    "turnkey interior projects chennai",
    "interior projects virugambakkam",
    "interior projects kovur",
    "interior projects kattupakkam",
    "interior projects sikkaryapuram",
    "interior projects nazarathpettai",
    "interior projects kozhumanivakkam",
    "interior projects kolothuvacheri",
    "interior projects paraniputhur",
    "interior projects vanagaram",
    "interior projects paruthippattu",
    "interior projects karayanchavadi",
    "interior projects kumananchavadi",
  ],
  alternates: {
    canonical: "/portfolio",
  },
  openGraph: {
    title: "Portfolio & Completed Projects | Spark Interiors Chennai",
    description:
      "Explore our gallery of finished interior projects in Chennai: bespoke kitchens, designer ceilings, luxury living rooms, and turnkey civil spaces.",
    url: "/portfolio",
    images: [
      {
        url: "/home-residential-luxury-tv.jpg",
        width: 1200,
        height: 630,
        alt: "Spark Interiors Completed Projects Portfolio Chennai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Interior Design Portfolio Chennai | Spark Interiors",
    description:
      "Real project photos of luxury living rooms, kitchens, wardrobes, and false ceilings in Chennai.",
    images: ["/home-residential-luxury-tv.jpg"],
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
