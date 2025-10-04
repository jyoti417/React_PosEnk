import { createContext, useContext, useState, type ReactNode } from "react";
import { mainapiinstance } from "../../shared/api/mainapiinstance";
import type { Auth } from "../../entities/apis/mainapi";
import type { AuthContextType } from "../../entities/modals/process/auth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem("token")
  );

  const login = async (req: Auth.LoginRequest) => {
    setIsAuthenticated(false);
    const res = await mainapiinstance.auth.login(req);
    if(res.statusCode===1200){
        localStorage.setItem("token", res.data.token);
        setIsAuthenticated(true);
    }
    else{
        throw new Error(res.message);
    }
  };

  const logout = async () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };
  const value: AuthContextType = { isAuthenticated, login, logout };
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
