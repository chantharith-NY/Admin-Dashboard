// src/types/model.ts

export interface ModelItem {
  id?: number
  model_key?: string
  model_name: string
  model_type: "summarization" | "spell_check"
  deployment_type: "api" | "internal"
  api_url?: string | null
  s3_path?: string | null
  description?: string | null
  is_active: boolean
}