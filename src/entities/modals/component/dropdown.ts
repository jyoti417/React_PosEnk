export type DropdownProps ={
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export type FilterFormProps = {
  name: string;
  level1: string;
  level2: string;
  orderType: string;
  status: string;
  setName: (value: string) => void;
  setLevel1: (value: string) => void;
  setLevel2: (value: string) => void;
  setOrderType: (value: string) => void;
  setStatus: (value: string) => void;
};