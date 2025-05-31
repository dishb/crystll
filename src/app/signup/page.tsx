import { SignupForm } from "@/components/SignupForm"
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
});

export default function Page() {
  return (
    <div className={`h-screen flex w-full items-center justify-center p-6 md:p-10 ${openSans.className}`}>
      <div className="w-full max-w-sm">
        <SignupForm />
      </div>
    </div>
  )
}
