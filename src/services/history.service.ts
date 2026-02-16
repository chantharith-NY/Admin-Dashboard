
import type { HistoryItem } from "../types/history"
import api from "./api"

type HistoryType = "summarize" | "spell_check"

export const historyService = {
  async getHistory(type: HistoryType): Promise<HistoryItem[]> {
    const res = await api.get("/admin/history", {
      params: { type },
    })

    // Handle wrapped / paginated response safely
    if (Array.isArray(res.data)) {
      return res.data
    }

    if (Array.isArray(res.data.data)) {
      return res.data.data
    }

    return []
  },
}
