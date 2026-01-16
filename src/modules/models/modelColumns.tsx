// src/modules/models/modelColumns.ts
import type { TableColumn } from "../../components/common/DataTable"
import type { ModelItem } from "../../types/model"

export const modelColumns: TableColumn<ModelItem>[] = [
  {
    key: "no",
    title: "ល.រ",
    render: (_, index) => index + 1,
    className: "w-16",
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
    title: "Model Path",
    className: "text-xs text-gray-500",
  },
  {
    key: "is_active",
    title: "ស្ថានភាព",
    render: row => (
      <span
        className={`
          px-2 py-1 rounded text-sm
          ${row.is_active
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"}
        `}
      >
        {row.is_active ? "ដំណើរការ" : "បិទ"}
      </span>
    ),
  },
  {
    key: "created_at",
    title: "កាលបរិច្ឆេទ",
    render: row =>
      new Date(row.created_at).toLocaleDateString("km-KH"),
  },
]
