"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { api, clearToken, getToken, setToken } from "./api";
import { DEMO_MODE } from "./demo";

interface AuthContextValue {
  status: "loading" | "authenticated" | "unauthenticated";
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<AuthContextValue["status"]>("loading");
  const router = useRouter();

  useEffect(() => {
    // Demo mode: skip the real session check entirely so every page is
    // reachable with no backend/login required.
    setStatus(DEMO_MODE ? "authenticated" : getToken() ? "authenticated" : "unauthenticated");
  }, []);

  const login = async (email: string, password: string) => {
    const { accessToken } = await api.post<{ accessToken: string }>("/admin/auth/login", {
      email,
      password,
    });
    setToken(accessToken);
    setStatus("authenticated");
    router.push("/overview");
  };

  const logout = () => {
    if (DEMO_MODE) {
      // Nothing real to clear, and there's no login to bounce to — just
      // stay put so a stray click doesn't strand the demo.
      return;
    }
    clearToken();
    setStatus("unauthenticated");
    router.push("/login");
  };

  return <AuthContext.Provider value={{ status, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
