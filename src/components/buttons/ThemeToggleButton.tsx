import { useTheme } from "../../contexts/ui/ThemeContext";
export default function  ThemeToggleButton ()  {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex rounded-full  h-5 w-5 mt-2   bg-gray-300 transition-colors 
         hover:bg-gray-100 hover:text-gray-700
        dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 
        dark:hover:bg-gray-800 dark:hover:text-white"
    >
      {theme === "dark" ? (
        // 🌙 Dark Mode
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 15.5A9.75 9.75 0 1112.5 2.25a7.5 7.5 0 009.25 13.25z"
            />
          </svg>
          {/* <span className="text-sm">Dark Mode</span> */}
        </>
      ) : (
        // ☀️ Light Mode
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v2.25M12 18.75V21M4.5 12H2.25M21.75 12H19.5M6.364 6.364L4.5 4.5M19.5 19.5l-1.864-1.864M17.636 6.364L19.5 4.5M4.5 19.5l1.864-1.864M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z"
            />
          </svg>
          {/* <span className="text-sm">Light Mode</span> */}
        </>
      )}
    </button>
  );
};