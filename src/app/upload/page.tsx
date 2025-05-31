import ImageForm from "@/components/ImageForm";
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
});

export default function Page() {
  return (
    <div
      className={`h-screen flex flex-col justify-center items-center ${openSans.className}`}
    >
      <ImageForm />
    </div>
  );
}
