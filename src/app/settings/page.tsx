import { Open_Sans } from "next/font/google";
import type { Metadata } from "next";
import SettingsForm from "@/components/SettingsForm";
import { getSettings } from "../actions/settings";

export const metadata: Metadata = {
  title: "crystll. | settings",
};

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
});

export default async function Page() {
  const res = await getSettings();
  let initialBalance = 0.0;
  if (res.ok && res.settings) {
    initialBalance = res.settings.initialBalance;
  }

  return (
    <div
      className={`h-screen -mt-18 ${openSans.className} p-6 flex w-full justify-center items-center`}
    >
      <div className="w-full max-w-sm">
        <SettingsForm initialBalance={initialBalance} />
      </div>
    </div>
  );
}
