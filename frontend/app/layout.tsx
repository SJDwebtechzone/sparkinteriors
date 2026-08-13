import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Spark Interiors",
  description: "Premium Interior Design",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}