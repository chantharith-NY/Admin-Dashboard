export interface DashboardStats {
  total_users: number
  total_models: number
  today_requests: number
  total_summarize: number
  total_spellcheck: number
  usage_per_model: {
    model_name: string
    count: number
  }[]
  requests_per_day: {
    date: string
    count: number
  }[]
  users_per_month: {
    month: string
    count: number
  }[]
}
