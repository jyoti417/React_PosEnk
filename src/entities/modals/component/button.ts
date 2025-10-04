export type ReportButtonProps = {
  onClick: () => void | Promise<void>;
  loading?: boolean;
};

export type ExportButtonProps<T extends object = any> = {
  data: T[];
  fileName?: string;
};