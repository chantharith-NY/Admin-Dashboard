interface Props {
  models: {
    model_name: string
    count: number
  }[]
}

export default function ModelRanking({ models }: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <p className="mb-4 font-moul">
        ម៉ូឌែលប្រើប្រាស់ច្រើនបំផុត
      </p>

      <ul className="space-y-3 font-battambang">
        {models.map((model, index) => (
          <li key={index} className="flex justify-between border-b pb-2">
            <span>{model.model_name}</span>
            <span className="font-bold text-[#8BAD13]">
              {model.count}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
