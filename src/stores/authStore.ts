import { create } from "zustand";
import api from "../services/api";
import type { AuthState } from "../types/authState";

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: localStorage.getItem("admin_token"),

  setAuth: ({ user, token }) => {
    localStorage.setItem("admin_token", token);
    localStorage.setItem("admin_user", JSON.stringify(user));

    set({ user, token });
  },

  fetchUser: async () => {
    try {
      const res = await api.get("/me");

      set({
        user: res.data.data,
      });
    } catch {
      set({ user: null, token: null });

      localStorage.removeItem("admin_token");
      localStorage.removeItem("admin_user");
    }
  },

  logout: async () => {
    try {
      await api.post("/logout"); // 🔥 IMPORTANT
    } catch {}

    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");

    set({ user: null, token: null }); // 🔥 FIX

    // 🔥 redirect (DO NOT use useNavigate here)
    window.location.href = "/admin/login";
  },

  hasPermission: (permission: string) => {
    const user = get().user;
    if (!user) return false;

    const perms = user.permissions || [];

    if (perms.includes("*")) return true;

    if (perms.includes(permission)) return true;

    const [module] = permission.split(".");
    if (perms.includes(`${module}.*`)) return true;

    return false;
  },
}));