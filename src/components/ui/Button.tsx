interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  variant?: "primary" | "secondary" | "danger" | "edit"
  disabled?: boolean
  className?: string
}

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  className = ""
}: ButtonProps) {
  const base =
    "px-4 py-1.5 rounded-md transition text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"

  const styles = {
    primary: "bg-[#8BAD13] text-white hover:opacity-90",
    secondary: "border border-gray-300 hover:bg-gray-100",
    danger: "bg-red-600 text-white hover:bg-red-700",
    edit: "bg-blue-600 text-white hover:bg-blue-700"
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  )
}