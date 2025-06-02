"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import validatePathname from "@/lib/validatePathname";

export default function NavbarWrapper() {
  const pathname = usePathname();
  if (!validatePathname(pathname)) return null;
  return <Navbar />;
}
