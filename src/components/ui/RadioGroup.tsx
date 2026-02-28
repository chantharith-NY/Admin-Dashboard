interface Option {
  label: string
  value: any
}

interface RadioGroupProps {
  value: any
  options: Option[]
  onChange: (value: any) => void
  required?: boolean
}

export default function RadioGroup({
  value,
  options,
  onChange,
  required
}: RadioGroupProps) {
  return (
    <div className="space-y-1">
      {options.map(option => (
        <label key={option.value} className="flex gap-2">
          <input
            type="radio"
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            required={required}
          />
          {option.label}
        </label>
      ))}
    </div>
  )
}