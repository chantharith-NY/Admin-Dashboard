interface InputProps {
  value: string
  placeholder?: string
  onChange: (value: string) => void
  required?: boolean
}

export default function Input({
  value,
  placeholder,
  onChange,
  required
}: InputProps) {
  return (
    <input
      className="w-full border px-3 py-2 rounded"
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      required={required}
    />
  )
}