import { Navigate } from "react-router-dom"
import type { ReactNode } from "react"
import { useAuth } from "../hooks/useAuth"

export default function ProtectedRoute({
  children,
}: {
  children: ReactNode
}) {
  const { isAuthenticated, loading } = useAuth()

  if (loading) return null // or spinner

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}
