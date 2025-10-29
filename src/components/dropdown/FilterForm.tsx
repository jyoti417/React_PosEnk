import { useState, useEffect } from "react";
import { Report } from "../../entities/apis/mainapi";


 
interface dropdownOption{
  name: string;
  id: number;   
}

interface FilterField {
  key: string;
  label: string;
   className?: string;
  parentKey?: string | null;
  type: "dropdown" | "input" | "date";
}

interface FilterFormProps {
  config: FilterField[];
  filters: Record<string, any>;
  setFilters: (filters: Record<string, any>) => void;
}


/* 🔹 Reusable Dropdown Component */
const Dropdown = ({ label, value, onChange, options, disabled }: {label: string; value:any;  className?: string;onChange:(val: number) => void;
options: dropdownOption[];
  disabled?: boolean;
}) => (
  <div>
    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
      {label}
    </label>
    <select
      className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      disabled={disabled}
    >
      <option value="">Select {label}</option>
      {options.map((opt:dropdownOption) => (
          <option key={opt.id} value={opt.id} >
            {opt.name}
          </option>
        ))}
    </select>
  </div>
);
export default function FilterForm({
  config,
  filters,
  setFilters,
 }: FilterFormProps) {
const [optionsMap, setOptionsMap] = useState<Record<string, dropdownOption[]>>({});




useEffect(() => {
  config.forEach(async (field, index) =>{
    if(field.type === "dropdown") {
      const parentValue = field.parentKey ? filters[field.parentKey] : 0;
      if(field.parentKey && !parentValue) return;

      const levelIndex = field.parentKey ? index : 0;
      const res = await Report.getDropdownData(levelIndex, parentValue || 0);
      const mapped = res.map((r: any) => ({ id: r.id, name: r.name}));

      setOptionsMap((prev) => ({...prev, [field.key]: mapped}));
      }
    });
  }, [config, filters]);



return (
  <>
  {config.map((field) => {
      if(field.type === "dropdown") {
        const opts = optionsMap[field.key] || [];
        const disabled = !!field.parentKey && !filters[field.parentKey];
   
return ( <Dropdown
      key={field.key}
        label={field.label}
        className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
        value={filters[field.key]}
        onChange={(val) => setFilters({...filters, [field.key]:val})
      }
        options={opts}
        disabled={disabled}
      />
          );
        }
  if(field.type === "input"){
      return (
    <div key={field.key}>
      <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">{field.label}</label>
      <input type="text" className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm bg-white dark:bg-gray-800 focus-ring-2 focus:ring-blue-500 outline-none"
      value={filters[field.key] || ""}
      onChange={(e) => 
        setFilters({...filters, [field.key]: e.target.value})
      } 
      placeholder={`Enter ${field.label}`} />

    </div>
    );
  }
  return null;
  })}
  </>
);
}
