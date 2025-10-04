export type Order = {
  id: number;
  name: string;
  level1: string;
  level2: string;
  orderType: string;
  status: string;
  quantity: number;
  orderDate: Date;
};

export type ReportTableProps = {
  data: any;
  columns: any;
  isLoading: boolean;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  className?: string;
};