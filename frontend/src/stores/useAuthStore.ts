"use client";

import { create } from "zustand";

type AuthState = {
  isAuthenticated: boolean;
  role: "admin" | "user" | null;
  loginAsAdmin: () => void;
  loginAsUser: () => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  role: null,
  loginAsAdmin: () => set({ isAuthenticated: true, role: "admin" }),
  loginAsUser: () => set({ isAuthenticated: true, role: "user" }),
  logout: () => set({ isAuthenticated: false, role: null }),
}));
