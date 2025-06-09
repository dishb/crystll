import ImageForm from "@/components/ImageForm";
import { Open_Sans } from "next/font/google";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "crystll. | upload",
};

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
});

export default async function Page() {
  return (
    <div
      className={`h-screen -mt-16 flex flex-col justify-center items-center ${openSans.className}`}
    >
      <ImageForm />
    </div>
  );
}
