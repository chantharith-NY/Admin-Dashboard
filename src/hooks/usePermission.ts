// export function usePermission(permission: string) {
//   // MOCK: simulate logged-in admin
//   const mockPermissions = [
//     "user.create",
//     "user.update",
//     "user.delete"
//   ]

//   return mockPermissions.includes(permission)
// }
// import { useAuthStore } from "../stores/authStore";
import { useAuth } from "./useAuth";

export const usePermission = () => {
  const { user } = useAuth()
  const hasPermission = (permission: string) => {
    return user?.permissions?.includes(permission)
  }

  return { hasPermission }
}

export function getPermission(permission: String) {
  const user = JSON.parse(localStorage.getItem("admin_user") || "null")

  if (!user) return false

  return user.permissions?.includes(permission)
}