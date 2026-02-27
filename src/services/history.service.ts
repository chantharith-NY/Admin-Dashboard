import api from "./api"

export const historyService = {

  async getHistory(
    type: "summarize" | "spell-check",
    page = 1
  ) {
    const res = await api.get(
      `/history/${type}?page=${page}`
    )

    return res.data.data
  },

  async exportHistory(type: "summarize" | "spell-check", format: string) {
    const res = await api.get(
      `/history/${type}/export?format=${format}`,
      { responseType: "blob" }
    )
    return res.data
  }
}
