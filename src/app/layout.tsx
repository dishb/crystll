import type { Metadata } from "next";
import { EB_Garamond } from "next/font/google";
import "./globals.css";
import FooterWrapper from "@/components/FooterWrapper";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Navbar from "@/components/Navbar";
import { SessionProvider } from "next-auth/react";

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
        <SessionProvider>
          <div className="min-h-screen">
            <Navbar />
            <main className="16">{children}</main>
          </div>
        </SessionProvider>
        <FooterWrapper />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
