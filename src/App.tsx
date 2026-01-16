import { Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion"

import AdminLayout from "./layouts/AdminLayout"

// Pages
import DashboardPage from "./modules/dashboard/DashboardPage"
import HistoryPage from "./modules/history/HistoryPage"
import ModelsPage from "./modules/models/ModelsPage"
import UsersPage from "./modules/users/UsersPage"

export default function App() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* ===== ADMIN LAYOUT ===== */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="models" element={<ModelsPage />} />
          <Route path="users" element={<UsersPage />} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}
