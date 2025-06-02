"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";
import validatePathname from "@/lib/validatePathname";

export default function FooterWrapper() {
  const pathname = usePathname();
  if (!validatePathname(pathname)) return null;
  return <Footer />;
}
