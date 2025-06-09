"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { Upload, LoaderCircle } from "lucide-react";
import Popup from "./Popup";
import validateFile from "@/lib/validateFile";
import uploadReceipt from "@/app/actions/uploadReceipt";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

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
});

export default function ImageForm() {
  const [showPopup, setShowPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [popupDescription, setPopupDescription] = useState("");
  const [loading, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { file: undefined },
  });

  function createPopup(title: string, description: string) {
    setPopupTitle(title);
    setPopupDescription(description);
    setShowPopup(true);
  }

  async function onSubmit(values: { file?: File }) {
    if (!values.file) {
      createPopup(
        "No file selected",
        "Please select a file to upload before submitting."
      );
      return;
    }
    const formData = new FormData();
    formData.append("file", values.file);

    startTransition(async () => {
      const res = await uploadReceipt(formData);
      if (!res.ok) {
        createPopup(
          res.error || "500: Internal Server Error",
          "Please report this issue to the developers."
        );
      }
    });
  }

  return (
    <div className="flex flex-col gap-6 -mt-16">
      <Card>
        <CardHeader>
          <CardTitle>Upload a receipt</CardTitle>
          <CardDescription>
            Upload an image of a receipt. Must be a PNG, JPEG, GIF, WEBP, TIFF, HEIC, or PDF.
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
                name="file"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="receipt">Receipt</FormLabel>
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
                variant="outline"
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
