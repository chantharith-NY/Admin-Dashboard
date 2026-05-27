export interface AdminUser {
  id: number

  name: string

  email: string

  role: string

  role_id?: number

  password?: string

  is_active: boolean
}