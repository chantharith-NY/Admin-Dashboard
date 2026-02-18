import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("admin_token")

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const refreshToken = localStorage.getItem("refresh_token")

      if (!refreshToken) {
        logoutLocal()
        return Promise.reject(error)
      }

      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/refresh`,
          { refresh_token: refreshToken }
        )

        const newAccess = res.data.data.access_token
        const newRefresh = res.data.data.refresh_token

        localStorage.setItem("admin_token", newAccess)
        localStorage.setItem("refresh_token", newRefresh)

        error.config.headers.Authorization = `Bearer ${newAccess}`

        return api(error.config)
      } catch {
        logoutLocal()
      }
    }

    return Promise.reject(error)
  }
)

const logoutLocal = () => {
  localStorage.removeItem("admin_token")
  localStorage.removeItem("refresh_token")
  localStorage.removeItem("admin_user")
  window.location.href = "/admin/login"
}

export default api
