export interface EntitySchema {
  page_title: string

  api: {
    list: string
    create?: string
    update?: string
    delete?: string
    patch?: string
    export?: string
  }

  table: {
    columns: TableColumnSchema[]
    actions?: TableActionSchema[]
  }

  form?: {
    fields: FormFieldSchema[]
  }

  permissions?: {
    create?: string
    update?: string
    delete?: string
    toggle?: string
  }

  extra_actions?: ExtraActionSchema[]
}

export interface ExtraActionSchema {
  label: string
  format?: string
  type?: "export" | "download" | "custom"
}

export interface TableColumnSchema {
  key: string
  label: string
  type?: "text" | "boolean" | "number" | "datetime"
  sortable?: boolean
  truncate?: number
}

export interface TableActionSchema {
  type: "edit" | "delete" | "custom" | "toggle"
  label: string
  permissions?: string
}

export interface FormFieldSchema {
  name: string
  label: string
  type:
    | "text"
    | "email"
    | "password"
    | "textarea"
    | "select"
    | "radio"
    | "file"
    | "switch"

  required?: boolean
  min_length?: number
  max_length?: number
  default?: any

  options?: { label: string; value: string }[]

  visible_if?: {
    field: string
    equals: any
  }

  hide_on?: ("edit" | "create")[]
  required_on?: "create" | "edit"
}