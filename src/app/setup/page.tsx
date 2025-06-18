import type { Metadata } from "next";
import SetupForm from "@/components/SetupForm";

export const metadata: Metadata = {
  title: "crystll. | setup",
};

export default function Page() {
  return (
    <div className="h-screen -mt-18 p-6 flex w-full justify-center items-center">
      <div className="w-full max-w-sm">
        <SetupForm />
      </div>
    </div>
  );
}
