import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { format } from "date-fns";
import { Icon } from "@iconify/react";
import type { DatePickerInputProps } from "../../entities/modals/component/date";

export default function  DatePickerInput ({ label, value, onChange }:DatePickerInputProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-2 relative">
      <label className="block text-sm font-medium ">{label}</label>
      <div
        className="flex items-center border rounded-md w-full px-3 py-2 text-sm bg-white"
        onClick={() => setOpen(!open)}
      >
        <input
          type="text"
          readOnly
          value={value ? format(value, "yyyy-MM-dd") : ""}
          placeholder="Select date"
          className="flex-1 bg-transparent outline-none dark:text-white cursor-pointer"
        />
        <Icon icon="ri:calendar-line" className="w-4 h-4" />
      </div>

      {open && (
        <div className="absolute top-full mt-2 px-1 z-50 bg-white dark:bg-gray-800 border rounded-md shadow-lg">
          <DayPicker
            mode="single"
            selected={value}
            onSelect={(date) => {
              onChange(date);
              setOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
};