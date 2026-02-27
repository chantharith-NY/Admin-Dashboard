export interface FormField {
  name: string
  label: string
  type: string
  options?: any[]
  visible_if?: {
    field: string
    equals: any
  }
}