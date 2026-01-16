import { Menu } from "lucide-react"
import { Link, NavLink } from "react-router-dom"

interface HeaderProps {
  onMenuClick: () => void
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="bg-[#8BAD13] flex items-center justify-between px-4 sm:px-6 h-20 sm:h-20">

        {/* Logo + Title */}
        <Link to="/admin" className="flex items-center gap-3 min-w-0">
          <img
            src="/rac-logo.png"
            alt="RAC Logo"
            className="h-10 sm:h-12 w-auto"
          />

          {/* Text – responsive */}
          <div className="leading-tight">
            <p className="text-white font-semibold text-sm sm:text-md font-moulpali truncate">
              រាជបណ្ឌិត្យសភាកម្ពុជា
            </p>
            <p className="text-white text-xs sm:text-base font-inria-serif font-medium truncate">
              Royal Academy of Cambodia
            </p>
          </div>
        </Link>

        {/* Desktop / Tablet Navigation */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-7">
          <HeaderLink to="/admin" label="ផ្ទាំងគ្រប់គ្រង" exact />
          <HeaderLink to="/admin/history" label="ប្រវត្តិ" />
          <HeaderLink to="/admin/models" label="ម៉ូឌែល" />
          <HeaderLink to="/admin/users" label="អ្នកប្រើប្រាស់" />
          <button
            onClick={() => {
              localStorage.removeItem("admin_token")
              window.location.href = "/admin/login"
            }}
            className="text-base lg:text-lg font-battambang font-medium transition text-white/80 hover:text-white"
          >
            ចាកចេញ
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-md hover:bg-white/10"
          aria-label="បើកម៉ឺនុយ"
        >
          <Menu className="text-white w-6 h-6" />
        </button>
      </div>
    </header>
  )
}

/* ---------------- Header Link ---------------- */

function HeaderLink({
  to,
  label,
  exact = false,
}: {
  to: string
  label: string
  exact?: boolean
}) {
  return (
    <NavLink
      to={to}
      end={exact}
      className={({ isActive }) =>
        `
        text-base lg:text-lg font-battambang font-medium transition
        ${
          isActive
            ? "text-white border-b-2 border-white pb-1"
            : "text-white/80 hover:text-white"
        }
        `
      }
    >
      {label}
    </NavLink>
  )
}