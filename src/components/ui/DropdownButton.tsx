import { useState, useRef, useEffect } from "react"

interface DropdownButtonProps {
  label: string
  options: {
    label: string
    onClick: () => void
  }[]
}

export default function DropdownButton({
  label,
  options
}: DropdownButtonProps) {

  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Close when clicking outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  return (
    <div ref={ref} className="relative">
      
      <button
        onClick={() => setOpen(o => !o)}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        {label} ▼
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow z-50">
          {options.map((opt, index) => (
            <div
              key={index}
              onClick={() => {
                opt.onClick()
                setOpen(false)
              }}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}