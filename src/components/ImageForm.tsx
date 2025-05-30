"use client";

import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Upload, LoaderCircle } from "lucide-react";
import Popup from "./Popup";
import uploadReceipt from "@/lib/uploadReceipt";
import validateFile from "@/lib/validateFile";

export default function ImageForm() {
  const [file, setFile] = useState<File | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [popupDescription, setPopupDescription] = useState("");
  const [loading, setLoading] = useState(false);

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

  async function onClick() {
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

    setLoading(true);
    const res = await uploadReceipt(file);

    if (!res.ok) {
      if (res.status === 404) {
        createPopup(
          "404: Not Found",
          "The requested resource was not found. Please report this issue to the developers."
        );
      } else if (res.status === 500) {
        createPopup(
          "500: Internal Server Error",
          "An error occurred on the server. Please report this issue to the developers."
        );
      } else if (res.status === 429) {
        createPopup(
          "429: Rate Limit Exceeded",
          "You have exceeded the API rate limit. Please try again later."
        );
      } else {
        createPopup(
          "Error while processing file",
          "An error occurred while processing your request. Please report this issue to the developers."
        );
      }
    }

    setLoading(false);
    return;
  }

  return (
    <div className="flex flex-col">
      <Label className="font-normal text-2xl mb-4">Upload a receipt:</Label>

      <Input
        className="max-w-80 hover:cursor-pointer"
        type="file"
        onChange={onChange}
      />

      <Button
        variant="outline"
        className="mt-4 hover:cursor-pointer"
        onClick={onClick}
        disabled={loading}
      >
        {loading ? <LoaderCircle className="animate-spin" /> : <Upload />}
        {loading ? "Uploading..." : "Upload"}
      </Button>

      {showPopup && (
        <Popup
          title={popupTitle}
          description={popupDescription}
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
}
