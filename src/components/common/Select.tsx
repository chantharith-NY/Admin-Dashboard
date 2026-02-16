import { useState } from "react"

export default function Select({
  value,
  options,
  onChange,
}: {
  value: string
  options: string[]
  onChange: (v: string) => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full border rounded px-3 py-2 text-left"
      >
        {value}
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full bg-white border rounded shadow">
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
