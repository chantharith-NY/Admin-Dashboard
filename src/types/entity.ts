export interface EntitySchema {
  page_title: string

  api: {
    list: string
    create: string
    update: string
    delete: string
    toggle?: string
  }

  table: {
    columns: TableColumnSchema[]
  }

  form: {
    fields: FormFieldSchema[]
  }

  permissions?: {
    create?: boolean
    update?: boolean
    delete?: boolean
    toggle?: boolean
  }
}

export interface TableColumnSchema {
  key: string
  label: string
  type?: "text" | "boolean"
  sortable?: boolean
}

export interface FormFieldSchema {
  name: string
  label: string
  type: "text" | "textarea" | "select" | "radio" | "file"
  required?: boolean
  options?: { label: string; value: string }[]
  visible_if?: {
    field: string
    equals: any
  }
}