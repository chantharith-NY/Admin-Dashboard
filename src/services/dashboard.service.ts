import api from "./api";
import type { DashboardStats } from "../types/dashboard";

export const dashboardService = {
  async getStats(): Promise<DashboardStats> {
    const res = await api.get("/dashboard/stats")
    return res.data.data
  },
}