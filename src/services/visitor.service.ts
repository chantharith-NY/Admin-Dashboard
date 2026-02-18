import api from "./api";

export const visitorService = {
  async trackVisit() {
    return api.post("/track-visit")
  }
}