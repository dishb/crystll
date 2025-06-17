"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { Upload, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { uploadPurchase } from "@/app/actions/purchase";
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
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

const formSchema = z.object({
  title: z.string().max(40, "Title cannot be more than 40 characters long."),
  file: z
    .any()
    .refine((file) => file instanceof File && file.size > 0, {
      message: "Please select a file to upload.",
    })
    .refine((file) => file instanceof File && file.size < 10000000, {
      message: "File must be less than 10 MB.",
    }),
  type: z.enum(["receipt", "invoice"]),
});

export default function PurchaseForm() {
  const [loading, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      type: "receipt",
    },
    mode: "onChange",
  });

  async function onSubmit(values: {
    file?: File;
    type: string;
    title: string;
  }) {
    const formData = new FormData();
    formData.append("file", values.file ?? "");
    formData.append("type", values.type);
    formData.append("title", values.title);

    startTransition(async () => {
      const res = await uploadPurchase(formData);
      if (!res.ok) {
        toast.error("500: Internal Server Error", {
          description: res.error || "An error occurred uploading your image.",
        });
      } else {
        toast.success("Purchase created", {
          description: "Go to the dashboard to view the purchase.",
        });
      }
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Log new purchase</CardTitle>
        <CardDescription>
          Upload an image of a receipt or invoice. Must be a PNG, JPEG, GIF,
          WEBP, TIFF, HEIC, or PDF.
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
              name="title"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel htmlFor="title">Title</FormLabel>
                  <FormControl>
                    <Input
                      id="title"
                      type="text"
                      disabled={loading}
                      placeholder="Title of the purchase"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel htmlFor="receipt">Image</FormLabel>
                  <FormControl>
                    <Input
                      id="receipt"
                      type="file"
                      accept="image/png,image/jpeg,image/tiff,image/gif,image/heic,image/webp,application/pdf"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        field.onChange(file);
                      }}
                      disabled={loading}
                      className="hover:cursor-pointer"
                    />
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
                      disabled={loading}
                    >
                      <FormItem className="flex items-center gap-3">
                        <FormControl>
                          <RadioGroupItem
                            value="receipt"
                            className="hover:cursor-pointer"
                          />
                        </FormControl>
                        <FormLabel className="font-normal">Receipt</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center gap-3">
                        <FormControl>
                          <RadioGroupItem
                            value="invoice"
                            className="hover:cursor-pointer"
                          />
                        </FormControl>
                        <FormLabel className="font-normal">Invoice</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full hover:cursor-pointer"
              disabled={loading}
              variant="outline"
            >
              {loading ? <LoaderCircle className="animate-spin" /> : <Upload />}
              {loading ? "Uploading..." : "Upload"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
