import { Menu } from "lucide-react"
import { Link, NavLink, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"

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
          <HistoryDropdown />
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

function HistoryDropdown() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  const isActive = location.pathname.startsWith("/admin/history")

  // Close dropdown on route change
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest("#history-dropdown")) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div id="history-dropdown" className="relative">
      {/* Trigger */}
      <a
        type="button"
        onClick={() => setOpen(prev => !prev)}
        className={`
          text-base lg:text-lg font-battambang font-medium transition cursor-pointer
          flex items-center gap-1
          ${
            isActive
              ? "text-white border-b-2 border-white pb-1"
              : "text-white/80 hover:text-white"
          }
        `}
        aria-haspopup="true"
        aria-expanded={open}
      >
        ប្រវត្តិ
        <span
          className={`
            text-sm transition-transform
            ${open ? "rotate-180" : ""}
          `}
        >
          ▾
        </span>
      </a>

      {/* Dropdown */}
      {open && (
        <div
          className="
            absolute top-full mt-2
            w-52
            bg-white
            rounded-lg
            shadow-lg
            overflow-hidden
            z-50
            animate-fade-in
          "
        >
          <DropdownLink
            to="/admin/history/summarize"
            label="សង្ខេបអត្ថបទ"
          />
          <DropdownLink
            to="/admin/history/spell-check"
            label="កែអក្ខរាវិរុទ្ធ"
          />
        </div>
      )}
    </div>
  )
}

function DropdownLink({
  to,
  label,
}: {
  to: string
  label: string
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `
          block px-4 py-2 text-sm font-battambang transition
          ${
            isActive
              ? "bg-[#8BAD13] text-white"
              : "text-gray-700 hover:bg-gray-100"
          }
        `
      }
    >
      {label}
    </NavLink>
  )
}
