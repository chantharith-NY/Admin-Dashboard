import { Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion"

import ProtectedRoute from "./routes/ProtectedRoute"

import AdminLayout from "./layouts/AdminLayout"
import LoginPage from "./modules/auth/LoginPage"
import DashboardPage from "./modules/dashboard/DashboardPage"
import ModelsPage from "./modules/models/ModelsPage"
import UsersPage from "./modules/users/UsersPage"
import SummaryHistoryPage from "./modules/history/SummaryHistoryTable"
import SpellCheckHistoryPage from "./modules/history/SpellCheckHistoryTable"

export default function App() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>

        {/* PUBLIC ROUTE */}
        <Route path="/admin/login" element={<LoginPage />} />

        {/* PROTECTED ROUTES */}
        <Route
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/admin" element={<DashboardPage />} />
          <Route path="/admin/history/summarize" element={<SummaryHistoryPage />} />
          <Route path="/admin/history/spell-check" element={<SpellCheckHistoryPage />} />
          <Route path="/admin/models" element={<ModelsPage />} />
          <Route path="/admin/users" element={<UsersPage />} />
        </Route>

      </Routes>
    </AnimatePresence>
  )
}