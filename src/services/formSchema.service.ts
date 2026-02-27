import api from "./api"

export const formSchemaService = {
  async getModelForm(type: string) {
    const res = await api.get(`/forms?type=${type}`)
    return res.data.data
  },
}