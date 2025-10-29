import { useEffect, useState } from "react";
import { DatePicker } from "rsuite";
import "rsuite/dist/rsuite-no-reset.min.css";
import { format } from "date-fns";

type DatePickerInputProps = {
  label?: string;
  value?: Date | null;
  onChange?: (date: Date | null) => void;
};

export default function DatePickerInput({
  label,
  value,
  onChange,
}: DatePickerInputProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(value || null);

  // keep local state synced if parent passes a new value
  useEffect(() => setSelectedDate(value ?? null), [value]);

  return (
    <div className="flex flex-col gap-2 relative">
      {label && <label className="block text-sm font-medium">{label}</label>}

      {/* Use rsuite DatePicker as the single input */}
      <div className="w-full">
        <DatePicker
          value={selectedDate}
          onChange={(date) => {
            setSelectedDate(date);
            onChange?.(date ?? null);
          }}
          format="yyyy-MM-dd"
          style={{ width: "100%" }}
          oneTap={false} 
          appearance="default"
          renderValue={(value: Date | null) =>
            value ? format(value, "yyyy-MM-dd") : ""
          }
        />
      </div>

     
    </div>
  );
}
