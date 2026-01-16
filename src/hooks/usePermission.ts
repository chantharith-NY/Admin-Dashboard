export function usePermission(permission: string) {
  // MOCK: simulate logged-in admin
  const mockPermissions = [
    "user.create",
    "user.update",
    "user.delete"
  ]

  return mockPermissions.includes(permission)
}
