import api from "./api"
import type { EntitySchema } from "../types/entity"
// import type path from "path"

export const entityService = {

  async getSchema(entity: string): Promise<EntitySchema> {
    const res = await api.get(`/entities/${entity}/schema`)
    return res.data.data
  },

  async getList(endpoint: string) {
    const res = await api.get(endpoint)
    return res.data.data ?? res.data
  },

  async create(endpoint: string, payload: any) {
    return api.post(endpoint, payload)
  },

  async update(endpoint: string, payload: any) {
    return api.put(endpoint, payload)
  },

  async delete(endpoint: string) {
    return api.delete(endpoint)
  },

  async patch(endpoint: string, payload?: any) {
    return api.patch(endpoint, payload)
  }
} 