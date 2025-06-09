import DataTable from "@/components/DataTable";
import { Open_Sans } from "next/font/google";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "crystll. | dashboard",
};

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
});

export default async function Page() {
  return (
    <div className={`flex flex-col items-center ${openSans.className} mt-30`}>
      <div className="flex flex-col items-center w-[80%]">
        <div className="flex w-full mb-4">
          <h2 className="text-2xl">Purchase history</h2>
        </div>

        <div className="container mx-auto">
          <DataTable />
        </div>
      </div>
    </div>
  );
}
