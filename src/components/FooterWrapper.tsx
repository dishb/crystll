"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function FooterWrapper() {
  const pathname = usePathname();
  if (pathname === "/404" || pathname === "/not-found") return null;
  return <Footer />;
}
