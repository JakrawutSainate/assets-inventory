"use client";

import { authService } from "@/services/AuthService";
import { User, UserRole } from "@/models/User";
import { create } from "zustand";

type AuthState = {
  user: User | null;
  role: UserRole | null;
  login: (role: UserRole) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  role: null,
  login: (role) => {
    const user = authService.login(role);
    set({ user, role });
  },
  logout: () => {
    set({ user: null, role: null });
  },
}));
