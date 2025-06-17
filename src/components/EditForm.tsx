"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Save, LoaderCircle } from "lucide-react";
import type EditFormProps from "@/types/editFormProps";
import DatePicker from "./DatePicker";
import { Open_Sans } from "next/font/google";
import { useState } from "react";
import { updatePurchase } from "@/app/actions/purchase";

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
});

const formSchema = z.object({
  title: z.string().max(40, "Title cannot be more than 40 characters long."),
  type: z.enum(["receipt", "invoice"]),
  merchant: z.string(),
  total: z.coerce.number(),
  tax: z.coerce.number(),
  time: z.string(),
  date: z.date(),
});

export default function EditForm({
  id,
  title,
  type,
  merchant,
  total,
  tax,
  time,
  date,
  onSuccess,
}: EditFormProps) {
  const [loading, setLoading] = useState(false);

  const currentValues = {
    title: title,
    type: type as "receipt" | "invoice",
    merchant: merchant,
    total: parseFloat(total),
    tax: parseFloat(tax),
    time: time === "" ? "N/A" : time,
    date: new Date(date),
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { ...currentValues },
    mode: "onChange",
  });

  async function onSubmit(values: {
    title: string;
    type: "receipt" | "invoice";
    merchant: string;
    total: number;
    tax: number;
    date: Date;
    time: string;
  }) {
    setLoading(true);
    const formData = new FormData();
    formData.append("id", id);
    formData.append("title", values.title);
    formData.append("type", values.type);
    formData.append("merchant", values.merchant);
    formData.append("total", values.total.toString());
    formData.append("tax", values.tax.toString());
    formData.append("date", values.date.toString());
    formData.append("time", values.time);

    await updatePurchase(formData);
    setLoading(false);
    onSuccess();
  }

  return (
    <div className={openSans.className}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel htmlFor="title">Title</FormLabel>
                <FormControl>
                  <Input id="title" type="text" disabled={loading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel htmlFor="type">Type</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col"
                  >
                    <FormItem className="flex items-center gap-3">
                      <FormControl>
                        <RadioGroupItem
                          value="receipt"
                          className="hover:cursor-pointer"
                          disabled={loading}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">Receipt</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center gap-3">
                      <FormControl>
                        <RadioGroupItem
                          value="invoice"
                          className="hover:cursor-pointer"
                          disabled={loading}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">Invoice</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="merchant"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel htmlFor="merchant">Merchant</FormLabel>
                <FormControl>
                  <Input
                    id="merchant"
                    type="text"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="total"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel htmlFor="merchant">Total</FormLabel>
                <FormControl>
                  <Input
                    id="total"
                    type="number"
                    step={0.01}
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tax"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel htmlFor="tax">Tax</FormLabel>
                <FormControl>
                  <Input
                    id="tax"
                    type="number"
                    step={0.01}
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field: dateField }) => (
              <FormField
                control={form.control}
                name="time"
                render={({ field: timeField }) => (
                  <FormItem className="space-y-1">
                    <FormControl>
                      <DatePicker
                        date={dateField.value}
                        time={timeField.value}
                        onDateChange={dateField.onChange}
                        onTimeChange={timeField.onChange}
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          />
          <Button
            type="submit"
            className="w-full hover:cursor-pointer"
            variant="outline"
            disabled={loading}
          >
            {loading ? <LoaderCircle className="animate-spin" /> : <Save />}
            {loading ? "Saving..." : "Save changes"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
