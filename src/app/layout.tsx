import type { Metadata } from "next";
import NavbarWrapper from "@/components/NavbarWrapper";
import { EB_Garamond } from "next/font/google";
import "./globals.css";
import FooterWrapper from "@/components/FooterWrapper";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
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
      <head>
        <meta name="apple-mobile-web-app-title" content="crystll" />
      </head>
      <body className={ebGaramond.className}>
        <div className="min-h-screen">
          <NavbarWrapper />
          <main className="16">{children}</main>
        </div>
        <FooterWrapper />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
