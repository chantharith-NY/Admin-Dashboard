import type { ReactNode } from "react"

export interface TableColumn<T> {
  key: string
  title: string
  render?: (row: T, index: number) => ReactNode
  className?: string
}

interface DataTableProps<T> {
  columns: TableColumn<T>[]
  data: T[]
  emptyText?: string
}

export default function DataTable<T>({
  columns,
  data,
  emptyText = "គ្មានទិន្នន័យ",
}: DataTableProps<T>) {
  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left text-md font-semibold font-moul">
            {columns.map(col => (
              <th
                key={col.key}
                className={`px-4 py-3 border-b ${col.className ?? ""}`}
              >
                {col.title}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr className="font-battambang text-md">
              <td
                colSpan={columns.length}
                className="px-4 py-6 text-center text-gray-400"
              >
                {emptyText}
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr
                key={index}
                className="border-b font-battambang text-md hover:bg-gray-50 transition"
              >
                {columns.map(col => (
                  <td
                    key={col.key}
                    className={`px-4 py-3 ${col.className ?? ""}`}
                  >
                    {col.render
                      ? col.render(row, index)
                      : (row as any)[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
