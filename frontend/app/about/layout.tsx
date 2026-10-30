import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute:
      "About Us | Leading Interior Architecture & Design Studio Chennai | Spark Interiors",
  },
  description:
    "Discover Spark Interiors — Chennai's premier interior architecture and civil execution studio with 16+ years of expertise and 180+ luxury residences delivered. Learn about our architectural craftsmanship, German hardware standards, and turnkey execution in Chennai, Mangadu & Kundrathur.",
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

    "about spark interiors",
    "interior designers in chennai",
    "interior architecture studio chennai",
    "experienced interior designers chennai",
    "luxury interior design firm tamil nadu",
    "turnkey interior contractors chennai",
    "best residential architects chennai",
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
    "bespoke home interiors chennai",
    "architectural interior designers chennai",
    "spark interiors chennai history",
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Spark Interiors | Leading Interior Designers in Chennai",
    description:
      "16+ years of expertise and 180+ luxury residences delivered across Chennai. Learn about our design philosophy and turnkey execution.",
    url: "/about",
    images: [
      {
        url: "/about-studio-office.jpg",
        width: 1200,
        height: 630,
        alt: "About Spark Interiors Chennai Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Spark Interiors | Leading Interior Designers in Chennai",
    description:
      "16+ years of expertise and 180+ luxury residences delivered across Chennai.",
    images: ["/about-studio-office.jpg"],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
