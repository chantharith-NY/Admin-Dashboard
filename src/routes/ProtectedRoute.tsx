import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useAuthStore } from "../stores/authStore";

export default function ProtectedRoute({ children, permission }: any) {
  const { loading, isAuthenticated, user } = useAuth();
  const hasPermission = useAuthStore((s) => s.hasPermission);

  // 🔥 DEBUG HERE
  console.log("USER:", user);
  console.log("USER PERMS:", user?.permissions);
  console.log("CHECK:", permission);
  console.log(
    "RESULT:",
    permission ? hasPermission(permission) : "no permission needed",
  );

  if (loading) return null;

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  if (permission && !hasPermission(permission)) {
    return <Navigate to="/admin" replace />;
  }

  if (user?.is_temporary_password) {
    return <Navigate to="/change-password" replace />;
  }

  return <>{children}</>;
}
