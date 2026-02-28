import api from "./api"
import type { EntitySchema } from "../types/entity"
// import type path from "path"

const isFile = (value: any): boolean => {
  return (
    value &&
    typeof value === "object" &&
    typeof value.name === "string" &&
    typeof value.size === "number" &&
    typeof value.type === "string"
  )
}

const buildPayload = (payload: any) => {
  const hasFile = Object.values(payload).some(isFile)

  if (!hasFile) return payload

  const formData = new FormData()

  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value as any)
    }
  })

  return formData
}

export const entityService = {

  async getSchema(entity: string): Promise<EntitySchema> {
    const res = await api.get(`/entities/${entity}/schema`)
    return res.data.data
  },

  async getList(endpoint: string) {
    const res = await api.get(endpoint)

    const payload = res.data.data ?? res.data

    // If paginated
    if (payload?.data && Array.isArray(payload.data)) {
      return payload
    }

    // If normal list
    return { data: payload }
  },

  async create(endpoint: string, payload: any) {
    const finalPayload = buildPayload(payload)

    if (finalPayload instanceof FormData) {
      return api.post(endpoint, finalPayload)
    }
    return api.post(endpoint, finalPayload)
  },

  async update(endpoint: string, payload: any) {
    const finalPayload = buildPayload(payload)

    if (finalPayload instanceof FormData) {
      finalPayload.append("_method", "PUT")
      return api.post(endpoint, finalPayload)
    }

    return api.put(endpoint, finalPayload)
  },

  async delete(endpoint: string) {
    return api.delete(endpoint)
  },

  async patch(endpoint: string, payload?: any) {
    const finalPayload = buildPayload(payload)
    return api.patch(endpoint, finalPayload)
  },

  async export(endpoint: string, format: string) {
    const res = await api.get(`${endpoint}?format=${format}`, {
      responseType: "blob",
    });

    const blob = new Blob([res.data]);
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `summarize_history_${Date.now()}.${format}`
    );

    document.body.appendChild(link);
    link.click();
    link.remove();
  }
} 