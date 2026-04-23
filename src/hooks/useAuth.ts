import { useEffect, useState } from "react"
import api from "../services/api"

export function useAuth() {
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const token = localStorage.getItem("admin_token")
    const storedUser = localStorage.getItem("admin_user")

    if ( !token ) {
      setLoading(false)
      return
    }

    if ( storedUser ) {
      setUser(JSON.parse(storedUser))
      setIsAuthenticated(true)
      setLoading(false)
      return;
    }

    api.get("/me")
      .then((res) => {
        setUser(res.data.data)
        localStorage.setItem("admin_user", JSON.stringify(res.data.data))
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
    const res = await api.post("/login", { email, password });

    // DO NOT store token here
    return res.data;
  };

  const verifyOtp = async (user_id: number, code: string) => {
    const res = await api.post("/verify-otp", { user_id, code });

    const { access_token, user } = res.data;

    // ✅ store here (secure step)
    localStorage.setItem("admin_token", access_token);
    localStorage.setItem("admin_user", JSON.stringify(user));

    setUser(user);
    setIsAuthenticated(true);

    return res.data;
  };

  const changePassword = async (password: string, confirmPassword: string) => {
    const res = await api.post("/change-password", {
      password,
      password_confirmation: confirmPassword,
    })

    // 🔥 clear auth after change (force re-login)
    localStorage.removeItem("admin_token")
    localStorage.removeItem("admin_user")
    localStorage.removeItem("refresh_token")

    setIsAuthenticated(false)
    setUser(null)

    return res.data
  }

  const logout = async () => {
    try {
      await api.post("/logout")
    } catch (error) {}

    localStorage.removeItem("admin_token")
    localStorage.removeItem("admin_user")
    localStorage.removeItem("refresh_token")

    setIsAuthenticated(false)
    setUser(null)
  }

  const refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refresh_token")
      if ( !refreshToken ) throw new Error("No refresh token")

      const res = await api.post("/refresh", { refresh_token: refreshToken })
      const newAccessToken = res.data.data.access_token
      const newRefreshToken = res.data.data.refresh_token

      localStorage.setItem("admin_token", newAccessToken)
      localStorage.setItem("refresh_token", newRefreshToken)

      return newAccessToken
    } catch (error) {
      logout()
      throw error
    }
  }

  const forgotPassword = async (email: string) => {
    const res = await api.post("/forgot-password", { email });
    return res.data;
  }

  const resetPassword = async (email: string, otp: string, newPassword: string, confirmPassword: string) => {
    const res = await api.post("/forgot-password/reset", {
      email,
      otp,
      password: newPassword,
      password_confirmation: confirmPassword,
    });

    return res.data;
  }

  return {
    loading,
    isAuthenticated,
    user,
    login,
    logout,
    verifyOtp,
    changePassword,
    refreshToken,
    forgotPassword,
    resetPassword,
  }
}

