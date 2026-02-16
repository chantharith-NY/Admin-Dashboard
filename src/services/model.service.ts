import type { ModelItem } from "../types/model"
import api from "./api"

export const modelService = {
  async getModels(): Promise<ModelItem[]> {
    const res = await api.get<ModelItem[]>("/models")
    return res.data // ✅ ARRAY ONLY
  },

  async toggleActive(id: number) {
    return api.patch(`/models/${id}/toggle`)
  },
}