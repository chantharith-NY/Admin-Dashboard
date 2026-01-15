import { Outlet } from "react-router-dom"

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r">
        Sidebar
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        <header className="h-14 bg-white border-b px-4 flex items-center">
          Admin Header
        </header>

        <main className="flex-1 p-4 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
