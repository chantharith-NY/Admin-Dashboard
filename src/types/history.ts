export interface HistoryItem {
  id: number
  input_text: string
  output_text: string
  model_name: string
  execution_time_ms: number
  created_at: string
}