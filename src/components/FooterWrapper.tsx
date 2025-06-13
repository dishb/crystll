"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function FooterWrapper() {
  const pathname = usePathname();
  if (
    pathname === "/dashboard" ||
    pathname === "/upload" ||
    pathname === "/login"
  )
    return null;
  return <Footer />;
}
