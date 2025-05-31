import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { EB_Garamond } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "crystll.",
  description: "Be crystal clear with your club's finances.",
};

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={ebGaramond.className}>
        <div className="min-h-screen">
          <Navbar />
          <main className="16">{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
