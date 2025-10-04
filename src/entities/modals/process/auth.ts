import type { Auth } from "../../apis/mainapi";

export type AuthContextType = {
  isAuthenticated: boolean;
  login: (req: Auth.LoginRequest) => Promise<void>;
  logout: () => void;
};
