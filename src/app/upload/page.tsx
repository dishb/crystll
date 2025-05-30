import ImageForm from "@/components/ImageForm";
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
});

export default function Page() {
  return (
    <div
      className={`flex-1 flex flex-col justify-center items-center ${openSans.className}`}
    >
      <ImageForm />
    </div>
  );
}
