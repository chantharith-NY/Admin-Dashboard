// src/modules/models/ModelFormModal.tsx
import { useState } from "react"
import type { ModelItem } from "../../types/model"
import Select from "../../components/common/Select"

interface Props {
  model: ModelItem
  onSave: (m: ModelItem) => void
  onClose: () => void
}

export default function ModelFormModal({ model, onSave, onClose }: Props) {
  const [form, setForm] = useState(model)

    const MODEL_TYPES = [
    { value: "summarization", label: "សង្ខេបអត្ថបទ" },
    { value: "spell_check", label: "កែអក្ខរាវិរុទ្ធ" },
    ] as const

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-3">
      <div
        className="
          bg-white rounded-xl shadow-xl
          w-full max-w-lg
          p-4 sm:p-6
          max-h-[90vh] overflow-y-auto
        "
      >
        <p className="text-lg sm:text-xl font-moul mb-4">
          {model.model_name ? "កែម៉ូឌែល" : "បន្ថែមម៉ូឌែល"}
        </p>

        <div className="space-y-3 sm:space-y-4">
          <input
            className="w-full border rounded-lg px-3 py-2 text-sm sm:text-base"
            placeholder="ឈ្មោះម៉ូឌែល"
            value={form.model_name}
            onChange={e =>
              setForm({ ...form, model_name: e.target.value })
            }
          />

            <Select
            value={
                MODEL_TYPES.find(t => t.value === form.model_type)?.label
                ?? "ជ្រើសរើសប្រភេទម៉ូឌែល"
            }
            options={MODEL_TYPES.map(t => t.label)}
            onChange={label => {
                const selected = MODEL_TYPES.find(t => t.label === label)
                if (!selected) return

                setForm({
                ...form,
                model_type: selected.value,
                })
            }}
            />

          <input
            className="w-full border rounded-lg px-3 py-2 text-sm sm:text-base"
            placeholder="Model Path / API URL"
            value={form.model_path}
            onChange={e =>
              setForm({ ...form, model_path: e.target.value })
            }
          />
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 mt-6">
          <button
            onClick={onClose}
            className="
              w-full sm:w-auto
              px-4 py-2
              border rounded-lg
              text-sm sm:text-base
            "
          >
            បោះបង់
          </button>

          <button
            onClick={() => onSave(form)}
            className="
              w-full sm:w-auto
              px-4 py-2
              bg-[#8BAD13] text-white
              rounded-lg
              text-sm sm:text-base
            "
          >
            រក្សាទុក
          </button>
        </div>
      </div>
    </div>
  )
}
