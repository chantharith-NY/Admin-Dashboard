import { Navigate } from "react-router-dom"
import type { ReactNode } from "react"
import { useAuth } from "../hooks/useAuth"

interface Props {
  children: ReactNode
}

export default function ProtectedRoute({ children }: Props) {
  const { loading, isAuthenticated } = useAuth()

  if (loading) return null

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }

  return <>{children}</>
}
