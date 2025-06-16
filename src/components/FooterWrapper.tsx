"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";
import { isAuthedPath } from "@/lib/utils";

export default function FooterWrapper() {
  const pathname = usePathname();
  if (
    isAuthedPath(pathname) ||
    pathname === "/signup" ||
    pathname === "/login"
  ) {
    return null;
  }

  return <Footer />;
}
