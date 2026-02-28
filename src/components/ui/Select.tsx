import { useState } from "react"

export default function Select({
  value,
  options,
  onChange,
  placeholder
}: {
  value: string
  options: string[]
  onChange: (v: string) => void
  placeholder?: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full border rounded px-3 py-2 text-left h-10"
      >
        {value || placeholder || "Select..."}
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full bg-white border rounded shadow h-fit">
          {options.map(opt => (
            <div
              key={opt}
              onClick={() => {
                onChange(opt)
                setOpen(false)
              }}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
