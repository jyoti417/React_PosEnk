import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { format } from "date-fns";
import type { ExportButtonProps } from "../../entities/modals/component/button";

export default function ExportButton<T extends object>({
  data = [],
  fileName = "Report",
}: ExportButtonProps<T>) {
  const handleExport = () => {
    if (!data || data.length === 0) {
      alert("No data available to export!");
      return;
    }

    // Build dynamic rows
    const mappedData = data.map((row) => {
      const result: Record<string, unknown> = {};
      Object.keys(row).forEach((key) => {
        let value = (row as any)[key];

        if (value instanceof Date) {
          value = format(value, "yyyy-MM-dd");
        } else if (typeof value === "object" && value !== null) {
          value = JSON.stringify(value);
        }

        result[key] = value ?? "";
      });
      return result;
    });

    const worksheet = XLSX.utils.json_to_sheet(mappedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(blob, `${fileName}_${format(new Date(), "yyyyMMdd_HHmmss")}.xlsx`);
  };

  return (
    <button
      onClick={handleExport}
      disabled={!data || data.length === 0}
      className="bg-[#d2344a] text-white px-4 py-2 w-full rounded-md text-sm hover:bg-[#9e3543] disabled:opacity-50 transition"
    >
      Export to Excel 
    </button>
  );
}

