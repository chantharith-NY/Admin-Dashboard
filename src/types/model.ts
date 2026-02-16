// src/types/model.ts

export type ModelType = "summarization" | "spell_check"
export interface ModelItem {
  id: number
  model_name: string
  model_type: ModelType
  model_path: string
  description?: string
  is_active: boolean
  created_at: string
  updated_at?: string
  usage_count?: number
  created_by?: string
}
