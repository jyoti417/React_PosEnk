import { useState, useCallback, useMemo } from "react";
import { Report } from "../entities/apis/mainapi";
import FilterForm from "../components/dropdown/FilterForm";
import DatePickerInput from "../components/utils/DatePickerInput";
import ReportTable from "../components/table/ReportTable";
import GetReportButton from "../components/buttons/GetReportButton";
import ExportButton from "../components/buttons/ExportButton";
// import type { TableColumn } from "react-data-table-component";
// ---------------- Types ----------------
export interface Order {
  [key: string]: any;
}

export default function ActivationLedgerReport() {
  const filterConfig = [
    { key: "level1", label: "Level 1", parentKey: null, type: "dropdown" as const },
    { key: "level2", label: "Level 2", parentKey: "level1", type: "dropdown" as const },
    { key: "level3", label: "Level 3", parentKey: "level2", type: "dropdown" as const },
    { key: "level4", label: "Level 4", parentKey: "level3", type: "dropdown" as const },
    // { key: "status", label: "Status", parentKey: "null", type: "dropdown" as const },
    // { key: "transactionId", label: "Transaction/Batch ID (Optional)", parentKey: null, type: "input" as const },
  ];
  // ---------------- State ----------------
 const [filters, setFilters] = useState({
  level1: 0,
  level2: 0,
  level3: 0,
  level4: 0,
  // orderType: 0,
  // status: 0,
});


  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const [from, setFrom] = useState<Date>(yesterday);
  const [to, setTo] = useState<Date>(today);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [reportData, setReportData] = useState<Order[]>([]);
  const [columns, setColumns] = useState<any[]>([]);
  const [baseURL] = useState<string>("GetActivationLedger");
  // ---------------- Fetch Report Data ----------------
  const fetchReportData = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await Report.getActivationLedgerReport(from, to, filters,baseURL);
      if (data.length > 0) {
        setReportData(data);
        const dynamicColumns = Object.keys(data[0]).map((key) => ({
          name: key.replace(/([A-Z])/g, " $1").trim(),
          selector: (row: Order) => row[key],
          sortable: true,
        }));
        setColumns(dynamicColumns);
      } else {
        setReportData([]);
        setColumns([]);
      }
    } catch (error) {
      console.error("❌ Report fetch error:", error);
      setReportData([]);
      setColumns([]);
    } finally {
      setIsLoading(false);
    }
  }, [from, to, filters]);

  const filteredData = useMemo(
    () =>
      reportData.filter((order) =>
        Object.values(order)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      ),
    [reportData, searchTerm]
  );
  // ---------------- Render ----------------
  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl text-gray-900 dark:text-gray-100">
      {/* Header */}
      <div className="panel_head flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-[#d2344a] tracking-wide">
          Activation Ledger Report
        </h2>
        <h3>Total: {filteredData.length}</h3>
      </div>

      {/* Filters & Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end mb-4">
        <FilterForm  config={filterConfig} filters={filters} setFilters={(newFilters: Record<string, any>) => setFilters(prev => ({ ...prev, ...newFilters }))} />
        <DatePickerInput label="From Date" value={from} onChange={(date) => date && setFrom(date)} />
        <DatePickerInput label="To Date" value={to} onChange={(date) => date && setTo(date)} />
        <div className="flex justify-end gap-2">
          <GetReportButton onClick={fetchReportData} loading={isLoading} />
          <ExportButton data={filteredData} fileName="Activation_Report" />
        </div>
      </div>

      {/* Report Table */}
      <ReportTable
        data={filteredData}
        columns={columns}
        isLoading={isLoading}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
    </div>
  );
}