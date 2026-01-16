// src/types/model.ts
export interface ModelItem {
  id: number
  model_name: string
  model_type: "summarization" | "spell_check"
  model_path: string
  description?: string
  is_active: boolean
  created_at: string
}
