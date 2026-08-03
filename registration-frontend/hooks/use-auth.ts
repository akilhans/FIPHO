"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
  createElement,
} from "react";
import { getTokens, login as apiLogin, logout as apiLogout } from "@/lib/api";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const tokens = getTokens();
    setIsAuthenticated(!!tokens);
    setIsLoading(false);
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    const success = await apiLogin(username, password);
    if (success) setIsAuthenticated(true);
    return success;
  }, []);

  const logout = useCallback(async () => {
    await apiLogout();
    setIsAuthenticated(false);
  }, []);

  return createElement(
    AuthContext.Provider,
    { value: { isAuthenticated, isLoading, login, logout } },
    children
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
