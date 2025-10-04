//  routes
import AppRoutes from "./routes";

//Context
import { AuthProvider } from "../providers/auth/AuthProvider";
import { ToastProvider } from "../contexts/ui/ToastContext";
import { ThemeProvider } from "../contexts/ui/ThemeContext";
import { SidebarProvider } from "../contexts/ui/SidebarContext";
function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <ThemeProvider>
          <SidebarProvider>
           <AppRoutes />
          </SidebarProvider>
        </ThemeProvider>
      </AuthProvider>
    </ToastProvider>
      
      
  );
}

export default App;
