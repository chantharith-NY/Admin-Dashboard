import api from "./api"

export const historyService = {

  async getHistory(type: "summarize" | "spell-check", perpage = 10) {
    const res = await api.get(`/history/${type}?perpage=${perpage}`)

    return { 
      data : res.data.data.data,
      meta: res.data.data.meta
    }
    // return res.data.data.data
  },

  async exportHistory(type: "summarize" | "spell-check", format: string ) {
    const res = await api.get(
      `/history/${type}/export?format=${format}`,
      { responseType: "blob" }
    )
    return res.data.data
  }

}
