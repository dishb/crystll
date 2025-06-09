"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";
import validatePathname from "@/lib/validatePathname";

export default function FooterWrapper() {
  const pathname = usePathname();
  if (
    !validatePathname(pathname) ||
    pathname === "/dashboard" ||
    pathname === "/upload"
  )
    return null;
  return <Footer />;
}
