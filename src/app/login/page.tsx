import LoginForm from "@/components/LoginForm"
import { Open_Sans } from "next/font/google";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "crystll. | login",
};

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
});

export default function Page() {
  return (
    <div className={`h-screen flex w-full items-center justify-center p-6 md:p-10 ${openSans.className}`}>
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}
