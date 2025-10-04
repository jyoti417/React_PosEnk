import type { LoaderProps } from "../../entities/modals/component/utils";
const sizes = {
  sm: "w-4 h-4 border-2",
  md: "w-8 h-8 border-4",
  lg: "w-12 h-12 border-4",
};

export const Loader: React.FC<LoaderProps> =({
  size = "md",
  variant = "inline",
  text,
})=> {
  const spinner = (
    <div
      className={`rounded-full border-t-transparent animate-spin ${sizes[size]} border-blue-500`}
    />
  );

  // 🔹 Fullscreen loader with optional text
  if (variant === "fullscreen") {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/50 space-y-3">
        {spinner}
        {text && <p className="text-white text-lg font-medium">{text}</p>}
      </div>
    );
  }

  // 🔹 Button loader with optional text
  if (variant === "button") {
    return (
      <span className="flex items-center justify-center gap-2">
        {spinner}
        {text && <span>{text}</span>}
      </span>
    );
  }

  // 🔹 Inline loader with optional text
  return (
    <div className="flex items-center justify-center w-full h-full gap-2">
      {spinner}
      {text && <span className="text-gray-700">{text}</span>}
    </div>
  );
}
