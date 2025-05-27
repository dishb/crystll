import type { Metadata } from "next";
import ThemeToggle from "@/components/ThemeToggle";
import ThemeProvider from "@/components/ThemeProvider";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import "./globals.css";

export const metadata: Metadata = {
  title: "crystll",
  description: "Be crystal clear with your club's finances.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main>
            <div className="flex flex-col min-h-screen">
              <nav className="flex flex-col">
                <div className="flex justify-between p-4 items-center">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/logo.svg"
                      alt="Our product's logo, a blue diamond."
                      width={32}
                      height={32}
                      className="w-7 h-auto"
                    />
                    <h2 className="text-xl">crystll</h2>
                  </div>
                  <ThemeToggle />
                </div>
                <Separator />
              </nav>
              <main className="flex-1 flex flex-col">{children}</main>
            </div>
          </main>
          <footer></footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
