import type { Metadata } from "next";
import "./globals.css";
import FloatingActions from "@/components/FloatingActions";
import ScrollToTopOnRefresh from "@/components/ScrollToTopOnRefresh";

export const metadata: Metadata = {
  title: "Spark Interiors",
  description: "Premium Interior Design",
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "64x64", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ScrollToTopOnRefresh />
        {children}
        <FloatingActions />
      </body>
    </html>
  );
}