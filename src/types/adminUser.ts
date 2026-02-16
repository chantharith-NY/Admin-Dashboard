export interface AdminUser {
  id: number
  name: string
  email: string
  role: string
  password?: string
  is_active: boolean
}