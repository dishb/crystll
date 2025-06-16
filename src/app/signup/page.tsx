import SignupForm from "@/components/SignupForm";
import { Open_Sans } from "next/font/google";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "crystll. | sign up",
};

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
});

export default function Page() {
  return (
    <div
      className={`h-screen -mt-16 flex w-full items-center justify-center p-6 ${openSans.className}`}
    >
      <div className="w-full max-w-sm">
        <SignupForm />
      </div>
    </div>
  );
}
