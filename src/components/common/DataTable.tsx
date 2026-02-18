import type { ReactNode } from "react";
import { historyService } from "../../services/history.service";
// import { format } from "path/win32";

export interface TableColumn<T> {
  key: string;
  title: string;
  render?: (row: T, index: number) => ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  emptyText?: string;
}

export default function DataTable<T>({
  columns,
  data,
  emptyText = "គ្មានទិន្នន័យ",
}: DataTableProps<T>) {
  const username = JSON.parse(localStorage.getItem("admin_user") || "{}").name;
  const now = new Date();
  const formatted = now.toISOString().replace(/[:T]/g, "_").split(".")[0];

  console.log("DataTable render", { data, columns });
  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <div className="flex justify-end mb-3">
        <select
          className="border px-3 py-1 rounded font-battambang"
          defaultValue=""
          onChange={async (e) => {
            const format = e.target.value;
            if (!format) return;

            const blob = await historyService.exportHistory(
              "summarize",
              format,
            );

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `${username}_${formatted}_summarize.${format}`;
            link.click();
          }}
        >
          <option value="">Export</option>
          <option value="csv">CSV</option>
          <option value="txt">TXT</option>
          <option value="xlsx">Excel</option>
        </select>
      </div>

      <table className="w-full border-collapse min-w-160">
        <thead>
          <tr
            className="
            bg-gray-100 text-left font-moul font-semibold
            text-xs sm:text-sm lg:text-base
          "
          >
            {columns.map((col) => (
              <th
                key={col.key}
                className={`
                  px-3 py-2
                  sm:px-4 sm:py-2.5
                  lg:px-4 lg:py-3
                  border-b
                  ${col.className ?? ""}
                `}
              >
                {col.title}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr className="font-battambang text-sm sm:text-base">
              <td
                colSpan={columns.length}
                className="
                  px-4 py-6
                  text-center text-gray-400
                "
              >
                {emptyText}
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr
                key={index}
                className="
                  border-b font-battambang
                  text-sm sm:text-base
                  hover:bg-gray-50 transition
                "
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`
                      px-3 py-2
                      sm:px-4 sm:py-2.5
                      lg:px-4 lg:py-3
                      ${col.className ?? ""}
                    `}
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
  );
}
