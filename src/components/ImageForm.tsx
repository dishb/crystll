"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { Upload, LoaderCircle } from "lucide-react";
import Popup from "./Popup";
import validateFile from "@/lib/validateFile";
import uploadFile from "@/app/actions/uploadFile";
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
  file: z
    .any()
    .refine((file) => file instanceof File && file.size > 0, {
      message: "Please select a file to upload.",
    })
    .refine((file) => validateFile(file), {
      message:
        "Please upload a valid image file (PNG, JPEG, WEBP, TIFF, HEIC, or PDF).",
    }),
  type: z.enum(["receipt", "invoice"], {
    required_error: "You need to select an image type.",
  }),
});

export default function ImageForm() {
  const [showPopup, setShowPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [popupDescription, setPopupDescription] = useState("");
  const [loading, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "receipt",
    },
  });

  function createPopup(title: string, description: string) {
    setPopupTitle(title);
    setPopupDescription(description);
    setShowPopup(true);
  }

  async function onSubmit(values: { file?: File; type: string }) {
    if (!values.file) {
      createPopup(
        "No file selected",
        "Please select a file to upload before submitting."
      );
      return;
    }
    const formData = new FormData();
    formData.append("file", values.file);
    formData.append("type", values.type);

    startTransition(async () => {
      const res = await uploadFile(formData);
      if (!res.ok) {
        createPopup(
          "500: Internal Server Error",
          res.error || "An error occurred uploading your image."
        );
      }
    });
  }

  return (
    <div className="flex flex-col gap-6">
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
                name="type"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel htmlFor="type">Type</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col"
                      >
                        <FormItem className="flex items-center gap-3">
                          <FormControl>
                            <RadioGroupItem value="receipt" />
                          </FormControl>
                          <FormLabel className="font-normal">Receipt</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center gap-3">
                          <FormControl>
                            <RadioGroupItem value="invoice" />
                          </FormControl>
                          <FormLabel className="font-normal">Invoice</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel htmlFor="receipt">Image</FormLabel>
                    <FormControl>
                      <Input
                        id="receipt"
                        type="file"
                        accept="image/*,application/pdf"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          field.onChange(file);
                        }}
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="mt-4 w-full hover:cursor-pointer"
                disabled={loading}
              >
                {loading ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  <Upload />
                )}
                {loading ? "Uploading..." : "Upload"}
              </Button>
            </form>
          </Form>
          {showPopup && (
            <Popup
              title={popupTitle}
              description={popupDescription}
              onClose={() => setShowPopup(false)}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
