import PurchaseForm from "@/components/PurchaseForm";
import FundraiserForm from "@/components/FundraiserForm";
import { Open_Sans } from "next/font/google";
import type { Metadata } from "next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
      <Tabs defaultValue="purchases" className="w-100 h-125">
        <TabsList>
          <TabsTrigger className="hover:cursor-pointer" value="purchases">
            Purchases
          </TabsTrigger>
          <TabsTrigger className="hover:cursor-pointer" value="fundraisers">
            Fundraisers
          </TabsTrigger>
        </TabsList>
        <TabsContent value="purchases">
          <PurchaseForm />
        </TabsContent>
        <TabsContent value="fundraisers">
          <FundraiserForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
