// src/components/layout/Sidebar.tsx
import { X } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      {/* Overlay – mobile only */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:hidden top-0 left-0 z-50
          w-72 min-h-screen
          bg-[#8BAD13] text-white
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="px-5 py-4 flex items-center justify-between border-b border-white/20 h-20">
          <Link to="/admin" onClick={onClose} className="flex items-center gap-3">
            <img
              src="/rac-logo.png"
              alt="RAC Logo"
              className="h-10"
            />
            <div>
              <p className="text-white font-semibold text-xs font-moulpali">
                រាជបណ្ឌិត្យសភាកម្ពុជា
              </p>
              <p className="text-white text-xs font-inria-serif">
                Royal Academy of Cambodia
              </p>
            </div>
          </Link>

          <button onClick={onClose} aria-label="Close menu">
            <X className="text-white w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="pb-6">
          {/* Dashboard */}
          <Section title="ផ្ទាំងគ្រប់គ្រង">
            <NavItem
              to="/admin"
              label="ផ្ទាំងគ្រប់គ្រង"
              onClick={onClose}
            />
          </Section>

          {/* History */}
          <Section title="ប្រវត្តិប្រតិបត្តិការ">
            <NavItem
              to="/admin/history/summarize"
              label="សង្ខេបអត្ថបទ"
              onClick={onClose}
            />
            <NavItem
              to="/admin/history/spell-check"
              label="កែអក្ខរាវិរុទ្ធ"
              onClick={onClose}
            />
          </Section>

          {/* Management */}
          <Section title="ការគ្រប់គ្រងប្រព័ន្ធ">
            <NavItem
              to="/admin/models"
              label="ម៉ូឌែល AI"
              onClick={onClose}
            />
            <NavItem
              to="/admin/users"
              label="អ្នកប្រើប្រាស់"
              onClick={onClose}
            />
          </Section>

          {/* Logout */}
          <Section title="">
            <button
              onClick={() => {
                localStorage.removeItem("admin_token")
                window.location.href = "/admin/login"
              }}
              className="
                w-full text-left px-3 py-2 rounded-md
                text-white/80 hover:bg-white/10 hover:text-white
                transition font-battambang
              "
            >
              ចាកចេញ
            </button>
          </Section>
        </nav>
      </aside>
    </>
  )
}

/* ================== Section ================== */

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  if (!children) return null

  return (
    <div className="px-5 mt-6">
      {title && (
        <>
          <p className="text-sm font-semibold font-moul text-white/90">
            {title}
          </p>
          <div className="h-px bg-white/40 mt-2 mb-4" />
        </>
      )}
      <div className="space-y-2">{children}</div>
    </div>
  )
}

/* ================== Nav Item ================== */

function NavItem({
  to,
  label,
  onClick,
}: {
  to: string
  label: string
  onClick?: () => void
}) {
  const location = useLocation()
  const isActive = location.pathname.startsWith(to)

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`
        block px-3 py-2 rounded-md text-sm font-battambang transition
        ${
          isActive
            ? "bg-white/20 text-white font-medium"
            : "text-white/80 hover:bg-white/10 hover:text-white"
        }
      `}
    >
      {label}
    </Link>
  )
}
