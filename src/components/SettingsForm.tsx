"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { LoaderCircle, Save } from "lucide-react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import { Open_Sans } from "next/font/google";
import { updateSettings } from "@/app/actions/settings";
import type SettingsFormProps from "@/types/settingsFormProps";

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
});

const formSchema = z.object({
  balance: z.coerce
    .number()
    .min(0.01, "Initial balance must be greater than $0.00"),
});

export default function SettingsForm({ initialBalance }: SettingsFormProps) {
  const [loading, setLoading] = useState(false);

  async function onSubmit(values: { balance: number }) {
    setLoading(true);
    const formData = new FormData();
    formData.append("balance", values.balance.toString());

    await updateSettings(formData);
    setLoading(false);
  }

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      balance: initialBalance,
    },
    mode: "onChange",
  });

  return (
    <div className={openSans.className}>
      <Card>
        <CardHeader>
          <CardTitle>Account settings</CardTitle>
          <CardDescription>
            Set your club&apos;s initial balance. Optionally, import a purchase
            history from Google Sheets (coming soon).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              <FormField
                control={form.control}
                name="balance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="balance">Initial balance</FormLabel>
                    <FormControl>
                      <Input
                        id="balance"
                        type="number"
                        step={0.01}
                        min={0.0}
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full hover:cursor-pointer"
                variant="outline"
                disabled={loading}
              >
                {loading ? <LoaderCircle className="animate-spin" /> : <Save />}
                {loading ? "Saving changes..." : "Save changes"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
