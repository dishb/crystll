import DataTable from "@/components/DataTable";
import { Open_Sans } from "next/font/google";
import type { Metadata } from "next";
import AccountOverview from "@/components/AccountOverview";
import { CircleUserRound, History } from "lucide-react";

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
      <div className="flex flex-col items-center w-[80%] gap-10">
        <div className="flex flex-col w-full gap-4">
          <h2 className="text-2xl flex gap-2 items-center font-semibold">
            <CircleUserRound /> Account overview
          </h2>
          <AccountOverview />
        </div>

        <hr className="w-full" />

        <div className="flex flex-col w-full gap-4">
          <h2 className="text-2xl flex gap-2 items-center font-semibold">
            <History /> Purchase history
          </h2>
          <div className="container mx-auto">
            <DataTable />
          </div>
        </div>
      </div>
    </div>
  );
}
