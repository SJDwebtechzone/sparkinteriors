import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute:
      "Interior Design Services in Chennai | False Ceiling, Kitchen & Civil | Spark Interiors",
  },
  description:
    "Explore Spark Interiors' 10 core services in Chennai: 1. False Ceiling, 2. Modular Kitchen, 3. Wardrobes, 4. Living Rooms, 5. Crockery Units, 6. Pooja Units, 7. Office Interior, 8. Shop Interior, 9. Commercial Interior, 10. Civil Work. Factory-finish quality, 10-year warranty, transparent pricing.",
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

    "interior design services chennai",
    "false ceiling designers chennai",
    "gypsum false ceiling chennai",
    "modular kitchen designers chennai",
    "luxury modular kitchen chennai",
    "acrylic modular kitchen chennai",
    "bespoke wardrobe designers chennai",
    "walk in wardrobes chennai",
    "living room interior design chennai",
    "tv unit designs chennai",
    "crockery units chennai",
    "pooja room interior design chennai",
    "traditional pooja units chennai",
    "teakwood pooja mandir chennai",
    "office interior designers chennai",
    "corporate office fitouts chennai",
    "shop interior designers chennai",
    "retail showroom interior chennai",
    "commercial interior contractors chennai",
    "civil work contractors chennai",
    "turnkey interior civil work chennai",
    "interior designers in mangadu",
    "interior designers in kundrathur",
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
    "false ceiling kattupakkam",
    "civil work vanagaram",
  ],
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Interior Design Services | Spark Interiors Chennai",
    description:
      "Full-spectrum interior solutions: False Ceilings, Modular Kitchens, Wardrobes, Living Rooms, Pooja Units, Commercial Spaces & Civil Works with 10-year warranty.",
    url: "/services",
    images: [
      {
        url: "/home-false-ceiling-luxury.jpg",
        width: 1200,
        height: 630,
        alt: "Spark Interiors Services - False Ceiling, Kitchen & Civil Works",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Interior Design Services Chennai | Spark Interiors",
    description:
      "False Ceiling, Modular Kitchen, Wardrobes, Living, Pooja & Turnkey Civil in Chennai.",
    images: ["/home-false-ceiling-luxury.jpg"],
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
