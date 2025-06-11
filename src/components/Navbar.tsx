"use client";

import Image from "next/image";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { Button } from "./ui/button";
import { useSession, signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import validatePathname from "@/lib/validatePathname";
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
});

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const userName = session && session.user ? session.user.name : undefined;
  const userImage = session && session.user ? session.user.image : undefined;

  if (!validatePathname(pathname)) return null;

  return (
    <nav className="sticky top-0 left-0 w-full flex flex-col bg-white/70 backdrop-blur-sm h-16">
      <div className={`flex-1 flex justify-between px-10 items-center`}>
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
          {["/upload", "/dashboard"].includes(pathname) ? (
            <>
              <Link
                href="/"
                className={`inline-block min-w-15 text-lg text-center hover:italic hover:text-ocean ${
                  pathname === "/home" ? "italic text-grape" : ""
                }`}
              >
                Home
              </Link>
              <Link
                href="/upload"
                className={`inline-block min-w-15 text-lg text-center hover:italic hover:text-ocean ${
                  pathname === "/upload" ? "italic text-grape" : ""
                }`}
              >
                Upload
              </Link>
              <Link
                href="/dashboard"
                className={`inline-block min-w-15 text-lg text-center hover:italic hover:text-ocean ${
                  pathname === "/dashboard" ? "italic text-grape" : ""
                }`}
              >
                Dashboard
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/"
                className={`inline-block min-w-15 text-lg text-center hover:italic hover:text-ocean ${
                  pathname === "/" ? "italic text-grape" : ""
                }`}
              >
                Home
              </Link>
              <Link
                href="/about"
                className={`inline-block min-w-15 text-lg text-center hover:italic hover:text-ocean ${
                  pathname === "/about" ? "italic text-grape" : ""
                }`}
              >
                About
              </Link>
              <Link
                href="/pricing"
                className={`inline-block min-w-15 text-lg text-center hover:italic hover:text-ocean ${
                  pathname === "/pricing" ? "italic text-grape" : ""
                }`}
              >
                Pricing
              </Link>
              <Link
                href="/contact"
                className={`inline-block min-w-15 text-lg text-center hover:italic hover:text-ocean ${
                  pathname === "/contact" ? "italic text-grape" : ""
                }`}
              >
                Contact
              </Link>
            </>
          )}
        </div>

        <div className="flex-1 flex justify-end items-center gap-4">
          {["/upload", "/dashboard"].includes(pathname) ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="border shadow-xs w-10 h-10 hover:cursor-pointer">
                  <AvatarImage src={userImage ?? undefined} />
                  <AvatarFallback>
                    {userName
                      ? userName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                      : "?"}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel className={openSans.className}>
                  My Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className={`${openSans.className} hover:cursor-pointer`}
                  onClick={() => signOut()}
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              asChild
              variant="outline"
              className="w-24 text-lg px-6 py-5 font-normal hover:cursor-pointer"
            >
              {status !== "authenticated" ? (
                <Link href="/login">Login</Link>
              ) : (
                <Link href="/dashboard">Dashboard</Link>
              )}
            </Button>
          )}
        </div>
      </div>
      <Separator />
    </nav>
  );
}
