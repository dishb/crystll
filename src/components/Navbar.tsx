"use client";

import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { usePathname } from "next/navigation";
import navItems from "@/data/navItems";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col">
      <div className="flex justify-between py-2 px-10 items-center">
        <div className="flex-1 flex justify-start items-center gap-2">
          <Image
            src="/logo.svg"
            alt="Our product's logo, a blue crystal."
            width={35.4}
            height={36}
            className="w-8 h-auto"
          />
          <h2 className="text-2xl">crystll.</h2>
        </div>

        <div className="flex-2 flex justify-center items-center gap-4">
          {navItems.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`inline-block min-w-15 text-lg text-center hover:italic hover:text-grape ${
                pathname === link.href ? "italic text-grape" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex-1 flex justify-end items-center gap-4">
          <Button
            asChild
            variant="outline"
            className="w-24 text-lg px-6 py-5 font-normal hover:cursor-pointer"
          >
            <Link href="/signup">Sign up</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="w-24 text-lg px-6 py-5 font-normal hover:cursor-pointer"
          >
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </div>
      <Separator />
    </nav>
  );
}
