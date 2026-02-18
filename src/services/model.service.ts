import type { ModelItem } from "../types/model"
import api from "./api"

export const modelService = {
  async getModels(): Promise<ModelItem[]> {
    const res = await api.get("/models")
    return res.data.data
  },

  async createModel(data: any) {
    const res = await api.post("/models", data)
    return res.data
  },

  async updateModel(id: number, data: any) {
    const res = await api.put(`/models/${id}`, data)
    return res.data
  },

  async deleteModel(id: number) {
    const res = await api.delete(`/models/${id}`)
    return res.data
  },

  async toggleActive(id: number) {
    const res = await api.patch(`/models/${id}/toggle`)
    return res.data
  },
}