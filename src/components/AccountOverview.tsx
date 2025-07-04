"use client";

import { Card, CardContent } from "./ui/card";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { RefreshCcw } from "lucide-react";
import {
  calculateBalance,
  calculateEarnings,
  calculateExpenses,
} from "@/app/actions/account";
import {
  BanknoteArrowUp,
  BanknoteArrowDown,
  CircleDollarSign,
} from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
});

export default function AccountOverview() {
  const [expenseDisplay, setExpenseDisplay] = useState<number | null>(null);
  const [balanceDisplay, setBalanceDisplay] = useState<number | null>(null);
  const [earningDisplay, setEarningDisplay] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  async function updateAccountInfo() {
    setLoading(true);
    const expenses = await calculateExpenses();
    const balance = await calculateBalance();
    const earnings = await calculateEarnings();

    setExpenseDisplay(expenses);
    setBalanceDisplay(balance);
    setEarningDisplay(earnings);
    setLoading(false);
  }

  useEffect(() => {
    updateAccountInfo();
  }, []);

  return (
    <div className={`flex flex-col gap-4 ${openSans.className}`}>
      <div className="flex">
        <Button
          variant="outline"
          size="sm"
          onClick={updateAccountInfo}
          disabled={loading}
          className="hover:cursor-pointer"
        >
          <RefreshCcw className={loading ? "animate-spin" : ""} />
          {loading ? "Refreshing..." : "Refresh"}
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent>
            <p className="uppercase mb-2 text-grape flex gap-2 items-center">
              <CircleDollarSign /> Balance
            </p>
            <p className="text-4xl">
              <AnimatedCounter
                from={0}
                to={balanceDisplay ?? 0}
                format="currency"
              />
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <p className="uppercase mb-2 text-ocean flex gap-2 items-center">
              <BanknoteArrowDown /> Expenses
            </p>
            <p className="text-4xl">
              <AnimatedCounter
                from={0}
                to={expenseDisplay ?? 0}
                format="currency"
              />
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <p className="uppercase mb-2 text-blue flex gap-2 items-center">
              <BanknoteArrowUp /> Earnings
            </p>
            <p className="text-4xl">
              <AnimatedCounter
                from={0}
                to={earningDisplay ?? 0}
                format="currency"
              />
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
