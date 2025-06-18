import SignupForm from "@/components/SignupForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "crystll. | sign up",
};

export default function Page() {
  return (
    <div className="h-screen -mt-18 flex w-full items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <SignupForm />
      </div>
    </div>
  );
}
