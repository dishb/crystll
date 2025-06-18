"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { LoaderCircle, WandSparkles } from "lucide-react";
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
import { setupSettings } from "@/app/actions/settings";
import { useRouter } from "next/navigation";

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
});

const formSchema = z.object({
  balance: z.coerce
    .number()
    .min(0.01, "Initial balance must be greater than $0.00"),
});

export default function SetupForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(values: { balance: number }) {
    setLoading(true);
    const formData = new FormData();
    formData.append("balance", values.balance.toString());

    await setupSettings(formData);
    setLoading(false);

    router.push("/dashboard");
  }

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      balance: 0.0,
    },
    mode: "onChange",
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-semibold text-grape text-2xl">
          Account setup
        </CardTitle>
        <CardDescription className={openSans.className}>
          Set up your account with an initial balance. Optionally, migrate from
          your previous finance tracker by loading existing purchases from
          Google Sheets (coming soon).
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={`flex flex-col gap-6 ${openSans.className}`}
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
              {loading ? (
                <LoaderCircle className="animate-spin text-ocean" />
              ) : (
                <WandSparkles className="text-ocean" />
              )}
              {loading ? "Setting up..." : "Finish setup"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
