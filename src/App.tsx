import {
  Routes,
  Route,
  useLocation,
  Navigate,
  // useNavigate,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { visitorService } from "./services/visitor.service";

import ProtectedRoute from "./routes/ProtectedRoute";

import AdminLayout from "./layouts/AdminLayout";
import LoginPage from "./modules/auth/LoginPage";
import DashboardPage from "./modules/dashboard/DashboardPage";
// import UsersPage from "./modules/users/UsersPage";
// import SummaryHistoryPage from "./modules/history/SummaryHistoryTable";
// import SpellCheckHistoryPage from "./modules/history/SpellCheckHistoryTable";
import EntityPage from "./modules/entities/EntityPage";
import ResetPasswordPage from "./modules/auth/ChangePasswordPage";
import RolesPage from "./modules/roles/RolesPage";
import OtpPage from "./modules/auth/OtpPage";
import ForgotPasswordPage from "./modules/auth/ForgotPage";

import { useAuthStore } from "./stores/authStore";

export default function App() {
  const location = useLocation();
  // const navigate = useNavigate();

  const fetchUser = useAuthStore((s) => s.fetchUser);
  const token = useAuthStore((s) => s.token);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const visited = localStorage.getItem("visited_date");

    if (token) {
      fetchUser();
    }

    if (visited !== today) {
      visitorService.trackVisit().catch(() => {});
      localStorage.setItem("visited_date", today);
    }
  }, [fetchUser, token]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Redirect root */}
        <Route
          path="/"
          element={
            localStorage.getItem("admin_token") ? (
              <Navigate to="/admin" replace />
            ) : (
              <Navigate to="/admin/login" replace />
            )
          }
        />

        {/* PUBLIC */}
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin/verify-otp" element={<OtpPage />} />
        <Route path="/admin/change-password" element={<ResetPasswordPage />} />
        <Route path="/admin/forgot-password" element={<ForgotPasswordPage />} />
        {/* <Route path="" */}

        {/* PROTECTED ROOT */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          {/* DASHBOARD */}
          <Route index element={<DashboardPage />} />

          {/* USERS */}
          <Route
            path="users"
            element={
              <ProtectedRoute>
                <EntityPage entity="users" />
              </ProtectedRoute>
            }
          />

          {/* MODELS */}
          <Route
            path="models"
            element={
              <ProtectedRoute>
                <EntityPage entity="models" />
              </ProtectedRoute>
            }
          />

          {/* ROLES */}
          <Route path="roles" element={<RolesPage />} />

          {/* HISTORY */}
          <Route
            path="history/summarize"
            element={<EntityPage entity="summarize" />}
          />

          <Route
            path="history/spell-check"
            element={<EntityPage entity="spell-check" />}
          />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}
