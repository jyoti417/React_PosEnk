import { createContext, useContext, useState, type ReactNode } from "react";
import type { Toast, ToastType, ToastContextType } from "../../entities/modals/process/toast";

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used inside ToastProvider");
  }
  return context;
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: ToastType = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto dismiss after 3s
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const icons: Record<ToastType, string> = {
    success: "✅",
    error: "❌",
    warning: "⚠️",
    info: "ℹ️",
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast container */}
      <div className="fixed top-4 right-4 space-y-2 z-50">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`w-80 p-4 border rounded-md shadow-lg flex items-center justify-between
              ${toast.type === "success" && "bg-green-100 text-green-800 border-green-300"}
              ${toast.type === "error" && "bg-red-100 text-red-800 border-red-300"}
              ${toast.type === "warning" && "bg-yellow-100 text-yellow-800 border-yellow-300"}
              ${toast.type === "info" && "bg-blue-100 text-blue-800 border-blue-300"}
            `}
          >
            {/* Icon + message */}
            <div className="flex items-center gap-2">
              <span className="text-xl">{icons[toast.type]}</span>
              <span>{toast.message}</span>
            </div>

            {/* Close button */}
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-2 text-lg font-bold text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
