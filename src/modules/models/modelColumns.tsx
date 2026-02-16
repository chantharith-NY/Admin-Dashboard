// src/modules/models/modelColumns.ts
import type { TableColumn } from "../../components/common/DataTable"
import type { ModelItem } from "../../types/model"

export const modelColumns = (
  onToggle: (id: number) => void,
  onEdit: (m: ModelItem) => void,
  onDelete: (id: number) => void
): TableColumn<ModelItem>[] => [
  {
    key: "no",
    title: "ល.រ",
    render: (_, i) => i + 1,
    className: "w-14",
  },
  {
    key: "model_name",
    title: "ឈ្មោះម៉ូឌែល",
  },
  {
    key: "model_type",
    title: "ប្រភេទ",
    render: row =>
      row.model_type === "summarization"
        ? "សង្ខេបអត្ថបទ"
        : "កែអក្ខរាវិរុទ្ធ",
  },
  {
    key: "model_path",
    title: "លីងម៉ូឌែល",
    render: row => (
      <a
        href={row.model_path}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline"
      >
        {row.model_path}
      </a>
    ),
  },
  {
    key: "is_active",
    title: "ប្រើប្រាស់",
    render: row => (
      <input
        type="checkbox"
        checked={row.is_active}
        onChange={() => onToggle(row.id)}
        className="w-5 h-5 accent-[#8BAD13]"
      />
    ),
    className: "text-center",
  },
  {
    key: "actions",
    title: "សកម្មភាព",
    render: row => (
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(row)}
            className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 min-w-15 text-center font-battambang font-semibold"
          >
            កែតម្រូវ
          </button>
        <button
          onClick={() => onDelete(row.id)}
            className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 min-w-15 text-center font-battambang font-semibold"
          >
            លុបចេញ
          </button>
      </div>
    ),
  },
]
