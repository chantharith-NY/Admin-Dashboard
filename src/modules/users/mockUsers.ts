import type { AdminUser } from "../../types/adminUser";

export const mockUsers: AdminUser[] = [
  {
    id: 1,
    name: "Super Admin",
    email: "admin@rac.gov.kh",
    role: "super_admin",
    is_active: true,
  },
  {
    id: 2,
    name: "Model Manager",
    email: "model@rac.gov.kh",
    role: "model_admin",
    is_active: true,
  },
  {
    id: 3,
    name: "Viewer",
    email: "viewer@rac.gov.kh",
    role: "viewer",
    is_active: false,
  },
]
