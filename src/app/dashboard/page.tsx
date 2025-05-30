import DataTable from "@/components/DataTable";
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
});

export default function Page() {
  return (
    <div className={`flex flex-col items-center ${openSans.className}`}>
      <div className="flex flex-col items-center mt-10 w-[80%]">
        <div className="flex w-full mt-16 mb-4">
          <h2 className="text-2xl">Purchase history</h2>
        </div>

        <div className="container mx-auto">
          <DataTable />
        </div>
      </div>
    </div>
  );
}
