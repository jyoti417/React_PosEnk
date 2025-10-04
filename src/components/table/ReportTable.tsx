import DataTable from "react-data-table-component";
import type { ReportTableProps } from "../../entities/modals/component/table";

const customStyles: any = {
  table: {
    style: {
      backgroundColor: "var(--tw-bg-row)",
      borderLeft: "1px solid var(--tw-border-color)",
      borderRight: "1px solid var(--tw-border-color)",
    },
  },
  headRow: {
    style: {
      backgroundColor: "var(--tw-bg-head)",
      color: "var(--tw-text-head)",
      minHeight: "32px",
    },
  },
  rows: {
    style: {
      backgroundColor: "var(--tw-bg-row)",
      color: "var(--tw-text-row)",
      "&:not(:last-of-type)": {
        borderBottom: "1px solid var(--tw-border-color)",
      },
    },
    highlightOnHoverStyle: {
      backgroundColor: "var(--tw-bg-hover)",
      color: "var(--tw-text-hover)",
    },
  },
  pagination: {
    style: {
      backgroundColor: "var(--tw-bg-row)",
      color: "var(--tw-text-row)",
      borderTop: "1px solid var(--tw-border-color)",
    },
    pageButtonsStyle: {
      color: "var(--tw-text-row)",
      fill: "var(--tw-text-row)",
      "&:disabled": {
        color: "var(--tw-text-row)",
        fill: "var(--tw-text-row)",
      },
      "&:hover:not(:disabled)": {
        backgroundColor: "var(--tw-bg-hover)",
        color: "var(--tw-text-hover)",
        fill: "var(--tw-text-hover)",
      },
      "&:focus": {
        outline: "none",
        backgroundColor: "var(--tw-bg-hover)",
      },
    },
  },
};

export default function ReportTable({
  data,
  columns,
  isLoading,
  searchTerm,
  setSearchTerm,
  className = "",
}:ReportTableProps){

     return (
    <div
      className={`${className} 
        [--tw-bg-head:theme(colors.gray.200)] 
        dark:[--tw-bg-head:theme(colors.gray.700)] 
        [--tw-text-head:theme(colors.gray.900)] 
        dark:[--tw-text-head:theme(colors.gray.100)] 
        [--tw-bg-row:theme(colors.white)] 
        dark:[--tw-bg-row:theme(colors.gray.900)] 
        [--tw-text-row:theme(colors.gray.900)] 
        dark:[--tw-text-row:theme(colors.gray.100)] 
        [--tw-bg-hover:theme(colors.gray.100)] 
        dark:[--tw-bg-hover:theme(colors.gray.800)] 
        [--tw-text-hover:theme(colors.gray.900)] 
        dark:[--tw-text-hover:theme(colors.gray.100)] 
        [--tw-border-color:theme(colors.gray.200)] 
        dark:[--tw-border-color:theme(colors.gray.700)]`}
    >
      {/* Search */}
      {data.length > 0 && (
        <div className="mb-4 flex justify-end">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className="border px-3 py-2 rounded-md text-sm w-full md:w-1/4 bg-gray-50 dark:bg-gray-800 dark:text-gray-100"
          />
        </div>
      )}

      {/* Table */}
      <DataTable
        columns={columns}
        data={data}
        pagination
        highlightOnHover
        fixedHeader
        fixedHeaderScrollHeight="400px"
        customStyles={customStyles}
        progressPending={isLoading}
      />
    </div>
  );
}
