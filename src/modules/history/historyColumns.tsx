import type { TableColumn } from "../../components/common/DataTable"
import type { HistoryItem } from "../../types/history"

export const historyColumns: TableColumn<HistoryItem>[] = [
  {
    key: "no",
    title: "ល.រ",
    render: (_, index) => index + 1,
    className: "w-16",
  },
  {
    key: "input_text",
    title: "អត្ថបទដើម",
    render: row => (
      <span className="block max-w-xs truncate">
        {row.input_text}
      </span>
    ),
  },
  {
    key: "output_text",
    title: "លទ្ធផល",
    render: row => (
      <span className="block max-w-xs truncate">
        {row.output_text}
      </span>
    ),
  },
  {
    key: "model_name",
    title: "ម៉ូឌែល",
  },
  {
    key: "execution_time_ms",
    title: "ពេលវេលា",
    render: row => `${row.execution_time_ms} ms`,
    className: "whitespace-nowrap",
  },
  {
    key: "created_at",
    title: "កាលបរិច្ឆេទ",
    render: row =>
      new Date(row.created_at).toLocaleString(),
    className: "whitespace-nowrap",
  },
]
