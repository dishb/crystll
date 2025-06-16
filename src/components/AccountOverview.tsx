"use client";

import { Card, CardContent } from "./ui/card";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Circle, RefreshCcw } from "lucide-react";
import { calculateBalance, calculateExpenses } from "@/app/actions/account";
import {
  BanknoteArrowUp,
  BanknoteArrowDown,
  CircleDollarSign,
} from "lucide-react";

export default function AccountOverview() {
  const [expenseDisplay, setExpenseDisplay] = useState("");
  const [balanceDisplay, setBalanceDisplay] = useState("");
  const [loading, setLoading] = useState(false);

  async function updateAccountInfo() {
    setLoading(true);
    const formatterUSD = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
    const expenses = await calculateExpenses();
    const formattedExpenses =
      expenses !== null ? formatterUSD.format(expenses) : "";
    const balance = await calculateBalance();
    const formattedBalance =
      balance !== null ? formatterUSD.format(balance) : "";

    setExpenseDisplay(formattedExpenses);
    setBalanceDisplay(formattedBalance);
    setLoading(false);
  }

  useEffect(() => {
    updateAccountInfo();
  }, []);

  return (
    <>
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
      <div className="flex gap-4">
        <Card className="flex-1">
          <CardContent>
            <p className="uppercase mb-2 text-grape flex gap-2 items-center">
              <CircleDollarSign /> Balance
            </p>
            <p className="text-4xl">{balanceDisplay}</p>
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardContent>
            <p className="uppercase mb-2 text-ocean flex gap-2 items-center">
              <BanknoteArrowDown /> Expenses
            </p>
            <p className="text-4xl">{expenseDisplay}</p>
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardContent>
            <p className="uppercase mb-2 text-blue flex gap-2 items-center">
              <BanknoteArrowUp /> Earnings
            </p>
            <p className="text-4xl">Coming soon.</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
