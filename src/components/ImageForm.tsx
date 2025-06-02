"use client";

import { useState, useTransition } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Upload, LoaderCircle } from "lucide-react";
import Popup from "./Popup";
import validateFile from "@/lib/validateFile";
import { Label } from "./ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import uploadReceipt from "@/app/actions/uploadReceipt";

export default function ImageForm() {
  const [file, setFile] = useState<File | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [popupDescription, setPopupDescription] = useState("");
  const [loading, startTransition] = useTransition();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  function createPopup(title: string, description: string) {
    setPopupTitle(title);
    setPopupDescription(description);
    setShowPopup(true);
  }

  async function onSubmit(formData: FormData) {
    const file = formData.get("file") as File;
    if (!file) {
      createPopup(
        "No file selected",
        "Please select a file to upload before clicking the upload button."
      );
      return;
    } else if (validateFile(file) === false) {
      createPopup(
        "Invalid file type",
        "Please upload a valid image file (PNG, JPEG, WEBP, TIFF, HEIC, or PDF)."
      );
      return;
    }

    startTransition(async () => {
      const res = await uploadReceipt(formData);
      if (!res.ok) {
        createPopup(
          "500: Internal Server Error",
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
            Upload an image of a receipt. Must be a PNG, JPEG, GIF, WEBP, TIFF,
            HEIC, or PDF.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            action={async (formData) => {
              await onSubmit(formData);
            }}
          >
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="receipt">Receipt</Label>
                <Input
                  id="receipt"
                  name="file"
                  type="file"
                  onChange={onChange}
                />
              </div>
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
            </div>
          </form>

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
