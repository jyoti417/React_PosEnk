import { Outlet } from "react-router-dom";
import { useSidebar } from "../../contexts/ui/SidebarContext";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout(){
const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  // Main content margin based on sidebar state
  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
    ? "lg:ml-[250px]"
    : "lg:ml-[90px]";

  return (
    <div className="max-h-screen flex ">
      {/* Sidebar */}

      {/* Main content */}
       
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin} bg-gray-100 `}
      >
      <Sidebar />
        <Header />
           <div className="flex-1 p-2 md:p-1 mx-auto max-w-[var(--breakpoint-2xl)] bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 h-[91vh] transition-colors duration-300">
              <Outlet /> 
            </div>
      <Footer />
    </div>
     </div>
  );
}