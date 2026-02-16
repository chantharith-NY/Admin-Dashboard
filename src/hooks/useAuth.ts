import { useEffect, useState } from "react"
import api from "../services/api"

export function useAuth() {
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const token = localStorage.getItem("admin_token")

    if (!token) {
      setLoading(false)
      return
    }

    // 🔥 VERIFY TOKEN WITH BACKEND
    api.get("/me")
      .then((res) => {
        setUser(res.data.data)
        setIsAuthenticated(true)
      })
      .catch(() => {
        localStorage.removeItem("admin_token")
        localStorage.removeItem("admin_user")
        setIsAuthenticated(false)
      })
      .finally(() => setLoading(false))
  }, [])

  const login = async (email: string, password: string) => {
    const res = await api.post("/login", { email, password })

    const token = res.data.data.token
    const user = res.data.data.user

    localStorage.setItem("admin_token", token)
    localStorage.setItem("admin_user", JSON.stringify(user))

    setIsAuthenticated(true)
    setUser(user)
  }

  const logout = async () => {
    try {
      await api.post("/logout")
    } catch (error) {}

    localStorage.removeItem("admin_token")
    localStorage.removeItem("admin_user")

    setIsAuthenticated(false)
    setUser(null)
  }

  return {
    loading,
    isAuthenticated,
    user,
    login,
    logout,
  }
}
