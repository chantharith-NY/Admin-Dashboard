interface EmailInputProps {
  value: string
  placeholder?: string
  onChange: (value: string) => void
  required?: boolean
}

export default function EmailInput({
  value,
  placeholder,
  onChange,
  required
}: EmailInputProps) {
  return (
    <input
      type="email"
      className="w-full border px-3 py-2 rounded"
      placeholder={placeholder}
      value={value}
      required={required}
      onChange={e => onChange(e.target.value)}
    />
  )
}