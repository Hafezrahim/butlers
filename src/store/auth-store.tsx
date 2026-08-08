import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type AuthCtx = {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const v = localStorage.getItem("auth-status");
    if (v === "1") setIsAuthenticated(true);
    setIsLoaded(true);
  }, []);

  const login = () => {
    localStorage.setItem("auth-status", "1");
    setIsAuthenticated(true);
  };
  
  const logout = () => {
    localStorage.removeItem("auth-status");
    setIsAuthenticated(false);
  };

  // Prevent flash of incorrect state on initial load
  if (!isLoaded) return null;

  return <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
