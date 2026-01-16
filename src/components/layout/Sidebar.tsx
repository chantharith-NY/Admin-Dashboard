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

      <aside
        className={`
          fixed md:hidden top-0 left-0 z-50
          w-72 sm:w-75 min-h-screen
          bg-[#8BAD13] text-white
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="px-5 py-4 flex items-center justify-between border-b border-white/20 h-20">
          {/* Logo */}
          <Link to="/admin" className="flex items-center gap-3">
            <img src="/rac-logo.png" alt="RAC Logo" className="h-10" />
            <div>
              <p className="text-white font-semibold text-xs font-moulpali">
                រាជបណ្ឌិត្យសភាកម្ពុជា
              </p>
              <p className="text-white text-xs font-inria-serif font-medium">
                Royal Academy of Cambodia
              </p>
            </div>
          </Link>

          <button onClick={onClose} aria-label="បិទម៉ឺនុយ">
            <X className="text-white w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <Section title="ការគ្រប់គ្រងប្រព័ន្ធ">
          <NavLink to="/admin" label="ផ្ទាំងគ្រប់គ្រង" />
          <NavLink to="/admin/history" label="ប្រវត្តិប្រតិបត្តិការ" />
          <NavLink to="/admin/models" label="ម៉ូឌែល AI" />
          <NavLink to="/admin/users" label="អ្នកប្រើប្រាស់" />
        </Section>
      </aside>
    </>
  )
}

/* ---------------- Section ---------------- */

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="px-5 mt-6">
      <p className="text-sm font-semibold font-moul text-white/90">
        {title}
      </p>
      <div className="h-px bg-white/40 mt-2 mb-4" />
      <div className="space-y-2">{children}</div>
    </div>
  )
}

/* ---------------- NavLink ---------------- */

function NavLink({ to, label }: { to: string; label: string }) {
  const location = useLocation()
  const isActive = location.pathname === to

  return (
    <Link
      to={to}
      className={`
        block px-3 py-2 rounded-md text-sm font-medium transition
        ${
          isActive
            ? "bg-white/20 text-white"
            : "text-white/80 hover:bg-white/10 hover:text-white"
        }
      `}
    >
      {label}
    </Link>
  )
}
