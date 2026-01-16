import type { ReactNode } from "react"
import { X } from "lucide-react"

interface ModalProps {
  open: boolean
  title?: string
  children: ReactNode
  onClose: () => void
  width?: "sm" | "md" | "lg"
}

export default function Modal({
  open,
  title,
  children,
  onClose,
  width = "md",
}: ModalProps) {
  if (!open) return null

  const widthClass = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
  }[width]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Modal box */}
      <div
        className={`
          relative bg-white rounded-xl shadow-lg w-full
          ${widthClass}
          mx-4
          animate-scale-in
        `}
      >
        
        {/* Header */}
        {title && (
        <div className="flex items-center justify-between px-5 py-4 border-b">
            <p className="font-moul text-lg">{title}</p>

            <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500"
            >
            <X size={18} />
            </button>
        </div>
        )}

        {/* Content */}
        <div className="px-5 py-4">
          {children}
        </div>
      </div>
    </div>
  )
}
