import { useState } from "react"
import Header from "../components/layout/Header"
import Sidebar from "../components/layout/Sidebar"
import { Outlet } from "react-router-dom"

export default function AdminLayout() {
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header: always visible */}
      <Header onMenuClick={() => setOpen(true)} />

      {/* Sidebar: mobile only */}
      <Sidebar open={open} onClose={() => setOpen(false)} />

      {/* Content */}
      <main className="flex-1 p-4 md:p-6">
        <Outlet />
      </main>
    </div>
  )
}
