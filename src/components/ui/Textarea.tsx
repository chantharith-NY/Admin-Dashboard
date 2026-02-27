interface TextareaProps {
  value: string
  placeholder?: string
  onChange: (value: string) => void
}

export default function Textarea({
  value,
  placeholder,
  onChange
}: TextareaProps) {
  return (
    <textarea
      className="w-full border px-3 py-2 rounded"
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  )
}