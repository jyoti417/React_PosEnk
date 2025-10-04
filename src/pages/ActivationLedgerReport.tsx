
import { useState } from "react";
import type { Order } from "../entities/modals/component/table";
import FilterForm from "../components/dropdown/FilterForm";
import type { TableColumn } from "react-data-table-component";
import DatePickerInput from "../components/utils/DatePickerInput";
import { format } from "date-fns";
import ReportTable from "../components/table/ReportTable";
import GetReportButton from "../components/buttons/GetReportButton";
import ExportButton from "../components/buttons/ExportButton";

export default function ActivationLedgerReport() {
  // ---------------- State ----------------
  const [name, setName] = useState("");
  const [level1, setLevel1] = useState("");
  const [level2, setLevel2] = useState("");
  const [orderType, setOrderType] = useState("");
  const [status, setStatus] = useState("");

  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const [from, setFrom] = useState<Date | undefined>(yesterday);
  const [to, setTo] = useState<Date | undefined>(today);

  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [reportData, setReportData] = useState<Order[]>([]);

  // ---------------- Columns ----------------
  const columns: TableColumn<Order>[] = [
    { name: "ID", selector: (row) => row.id.toString(), sortable: true },
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Level 1", selector: (row) => row.level1, sortable: true },
    { name: "Level 2", selector: (row) => row.level2, sortable: true },
    { name: "Order Type", selector: (row) => row.orderType, sortable: true },
    { name: "Status", selector: (row) => row.status, sortable: true },
    { name: "Quantity", selector: (row) => row.quantity.toString(), sortable: true },
    {
      name: "Order Date",
      selector: (row) => format(row.orderDate, "yyyy-MM-dd"),
      sortable: true,
    },
  ];

  // ---------------- API Call ----------------
  const fetchReportData = async () => {
    if (!from || !to) return;

    setIsLoading(true);
    try {
      // Build API params
      const params = {
        from: format(from, "yyyy-MM-dd"),
        to: format(to, "yyyy-MM-dd"),
        name,
        level1,
        level2,
        orderType,
        status,
      };
      console.log("📡 API Filters:", params);

      // Fake demo response
      const fakeData: Order[] = [
        {
          id: 1,
          name: "David John",
          level1: "ACHCHI",
          level2: "168",
          orderType: "Activation",
          status: "Completed",
          quantity: 2,
          orderDate: new Date(),
        },
        {
          id: 2,
          name: "Sophia",
          level1: "AHPREPAID",
          level2: "3D",
          orderType: "Recharge",
          status: "Pending",
          quantity: 5,
          orderDate: new Date(),
        },
      ];

      setReportData(fakeData);
    } catch (err) {
      console.error("❌ Error fetching report:", err);
    } finally {
      setIsLoading(false);
    }
  };

  
  // ---------------- Filtered Data ----------------
  const filteredData = reportData.filter((order) => {
    const values = [
      order.id,
      order.name,
      order.level1,
      order.level2,
      order.orderType,
      order.status,
      order.quantity,
      format(order.orderDate, "yyyy-MM-dd"),
    ];
    return values.join(" ").toLowerCase().includes(searchTerm.toLowerCase());
  });

  // ---------------- UI ----------------
  return (
    <div className="p-2 bg-gray-50 dark:bg-gray-900 rounded-xl  text-gray-900 dark:text-gray-100">
     <div className="panel_head">
      <h2 className="text-2xl font-bold text-[#d2344a] tracking-wide">Activation Ledger Report</h2>
      <h3 className="total_user"><span>Total : </span> <span>0</span></h3>
      </div> 

      {/* Filters + Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
        <FilterForm
          name={name}
          level1={level1}
          level2={level2}
          orderType={orderType}
          status={status}
          setName={setName}
          setLevel1={setLevel1}
          setLevel2={setLevel2}
          setOrderType={setOrderType}
          setStatus={setStatus}
        />

        <DatePickerInput label="From Date" value={from} onChange={setFrom} />
        <DatePickerInput label="To Date" value={to} onChange={setTo} />
          <div className="flex justify-end gap-2  mt-4">
        <GetReportButton onClick={fetchReportData} loading={isLoading} />
        <ExportButton data={reportData} fileName="Activation_Report"/>
      </div>
      </div>

      {/* Action Buttons */}
    {/* <div className="flex justify-end gap-2 mt-4">
  <GetReportButton onClick={fetchReportData} loading={isLoading} />
  <ExportButton data={reportData} fileName="Activation_Report" />
</div> */}

      {/* Report Table */}
      <div className="mt-6">
        <ReportTable
          data={filteredData}
          columns={columns}
          isLoading={isLoading}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          className="dark:bg-gray-800 dark:text-gray-100"
        />
      </div>
    </div>
  );
}