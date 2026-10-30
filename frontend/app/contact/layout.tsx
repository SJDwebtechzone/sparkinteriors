import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute:
      "Contact Us | Free Interior Design Consultation Chennai | Spark Interiors",
  },
  description:
    "Get in touch with Spark Interiors for a complimentary 3D design consultation and site measurement in Chennai. Call +91 95000 12200 / +91 72000 80418 or visit our studio at No.138/2 1st Floor, Kundrathur Main Road, Mangadu, Chennai 600122.",
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

    "contact interior designers chennai",
    "interior design free consultation chennai",
    "interior designers near me mangadu",
    "interior designers kundrathur main road",
    "interior designers contact number chennai",
    "book interior designer chennai",
    "interior cost estimation chennai",
    "interior designer site visit chennai",
    "turnkey interior consultation chennai",
    "interior designers near virugambakkam",
    "interior designers near kovur",
    "interior designers near kattupakkam",
    "interior designers near sikkaryapuram",
    "interior designers near nazarathpettai",
    "interior designers near kozhumanivakkam",
    "interior designers near kolothuvacheri",
    "interior designers near paraniputhur",
    "interior designers near vanagaram",
    "interior designers near paruthippattu",
    "interior designers near karayanchavadi",
    "interior designers near kumananchavadi",
  ],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Spark Interiors | Free Design Consultation Chennai",
    description:
      "Schedule your complimentary design consultation. Kundrathur Main Road, Mangadu, Chennai. Call +91 95000 12200 / +91 72000 80418.",
    url: "/contact",
    images: [
      {
        url: "/about-studio-office.jpg",
        width: 1200,
        height: 630,
        alt: "Spark Interiors Office Kundrathur Main Road Mangadu Chennai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Spark Interiors Chennai | Book Free Consultation",
    description:
      "Call +91 95000 12200 or visit our Mangadu studio for expert interior planning.",
    images: ["/about-studio-office.jpg"],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
