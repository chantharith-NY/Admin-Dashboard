interface PasswordInputProps {
  value: string
  placeholder?: string
  onChange: (value: string) => void
  required?: boolean
  minLength?: number
}

export default function PasswordInput({
  value,
  placeholder,
  onChange,
  required,
  minLength
}: PasswordInputProps) {
  return (
    <input
      type="password"
      className="w-full border px-3 py-2 rounded"
      placeholder={placeholder}
      value={value}
      required={required}
      minLength={minLength}
      onChange={e => onChange(e.target.value)}
    />
  )
}