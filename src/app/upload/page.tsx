import ImageForm from "@/components/ImageForm";
import { Open_Sans } from "next/font/google";
import { auth } from "@/auth";

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
});

export default async function Page() {
  const session = await auth();
  if (!session) {
    return (
      <div className="min-h-screen -mt-16 flex flex-col justify-center items-center">
        <div className="w-1/2 flex flex-col justify-center items-start">
          <h2 className="text-4xl">
            <span className="text-grape font-medium">401</span>: Not
            Authenticated.
          </h2>
          <h1 className="text-8xl leading-28 mt-4">
            <span className="text-ocean italic">Whoops!</span> You can&apos;t
            access this page.
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`h-screen flex flex-col justify-center items-center ${openSans.className}`}
    >
      <ImageForm />
    </div>
  );
}
