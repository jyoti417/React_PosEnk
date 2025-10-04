import type { ReportButtonProps } from "../../entities/modals/component/button";
export default function GetReportButton({ onClick, loading = false }: ReportButtonProps){
return (
    <button
      onClick={onClick}
      disabled={loading}
      className="bg-[#055c22] text-white px-4 py-2 w-full rounded-md text-sm hover:bg-[#23ad51] disabled:opacity-50 flex items-center justify-center gap-2 transition"
    >
      {loading && (
        <svg
          className="animate-spin h-4 w-4 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
      )}
      {loading ? "Loading..." : "Get Report"}
    </button>
  );
}
