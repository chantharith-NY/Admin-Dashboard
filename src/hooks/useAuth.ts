import { useEffect, useState } from "react"

export function useAuth() {
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("admin_token")
    setIsAuthenticated(!!token)
    setLoading(false)
  }, [])

  return {
    loading,
    isAuthenticated,
  }
}
