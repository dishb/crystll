import DataTable from "@/components/DataTable";
import type { Metadata } from "next";
import AccountOverview from "@/components/AccountOverview";
import { CircleUserRound, History } from "lucide-react";

export const metadata: Metadata = {
  title: "crystll. | dashboard",
};

export default async function Page() {
  return (
    <div className="flex flex-col items-center mt-30">
      <div className="flex flex-col items-center w-[80%] gap-10">
        <div className="flex flex-col w-full gap-4">
          <h2 className="text-4xl text-grape font-semibold flex gap-2 items-center">
            <CircleUserRound className="w-8 h-auto" /> Account overview
          </h2>
          <AccountOverview />
        </div>

        <hr className="w-full" />

        <div className="flex flex-col w-full gap-4">
          <h2 className="text-4xl text-ocean flex gap-2 items-center font-semibold">
            <History className="w-8 h-auto" /> Purchase history
          </h2>
          <div className="container mx-auto">
            <DataTable />
          </div>
        </div>
      </div>
    </div>
  );
}
