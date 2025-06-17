"use client";

import { ChevronDownIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useState } from "react";
import { Open_Sans } from "next/font/google";
import DatePickerProps from "@/types/datePickerProps";

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
});

export default function DatePicker({
  date,
  time,
  onDateChange,
  onTimeChange,
  disabled,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-3">
        <Label htmlFor="date" className="px-1">
          Date
        </Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date"
              className="w-32 justify-between font-normal"
              disabled={disabled}
            >
              {date ? date.toLocaleDateString() : "Select date"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              onSelect={(selectedDate) => {
                onDateChange(selectedDate);
                setOpen(false);
              }}
              className={openSans.className}
              defaultMonth={date || undefined}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="time" className="px-1">
          Time
        </Label>
        <Input
          type="time"
          id="time"
          step="60"
          value={time}
          onChange={(e) => onTimeChange(e.target.value)}
          className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
          disabled={disabled}
        />
      </div>
    </div>
  );
}
