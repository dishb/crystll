"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();
  if (pathname === "/404" || pathname === "/not-found") return null;
  return <Navbar />;
}
