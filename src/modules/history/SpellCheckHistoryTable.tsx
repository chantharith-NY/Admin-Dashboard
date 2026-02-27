import { useEffect, useState } from "react"
import DataTable from "../../components/common/DataTable"
import { historyColumns } from "./historyColumns"
import type { HistoryItem } from "../../types/history"
import { historyService } from "../../services/history.service"

export default function SpellCheckHistoryPage() {
  const [data, setData] = useState<HistoryItem[]>([])
  const [loading, setLoading] = useState(true)

  const [meta, setMeta] = useState<any>(null)
  const [page, setPage] = useState(1)

  const username = JSON.parse(localStorage.getItem("admin_user") || "{}").name;
  const now = new Date();
  const formatted = now.toISOString().replace(/[:T]/g, "_").split(".")[0];

  useEffect(() => {
    fetchHistory(page)
  }, [page])

  const fetchHistory = async (page: number) => {
    try {
      setLoading(true)
      const res = await historyService.getHistory("spell-check", page)
      setData(res.data)
      setMeta(res)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-3 sm:space-y-4 lg:space-y-5">

      <p className="
        font-moul
        text-xl sm:text-2xl lg:text-3xl
      ">
        ប្រវត្តិកែអក្ខរាវិរុទ្ធ
      </p>
      <div className="flex justify-end mb-3">
        <select
          className="border px-3 py-1 rounded font-battambang"
          defaultValue=""
          onChange={async (e) => {
            const format = e.target.value;
            if (!format) return;

            const blob = await historyService.exportHistory(
              "spell-check",
              format,
            );

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `${username}_${formatted}_spell_check.${format}`;
            link.click();
          }}
        >
          <option value="">Export</option>
          <option value="csv">CSV</option>
          <option value="txt">TXT</option>
          <option value="xlsx">Excel</option>
        </select>
      </div>

      <DataTable
        columns={historyColumns(meta)}
        data={data}
        emptyText={loading ? "កំពុងទាញយក..." : "គ្មានទិន្នន័យ"}
      />

      {meta && (
        <div className="flex justify-between items-center mt-4 font-battambang">
          <button
            disabled={!meta.prev_page_url}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            មុន
          </button>

          <span>
            ទំព័រ {meta.current_page} / {meta.last_page}
          </span>

          <button
            disabled={!meta.next_page_url}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            បន្ទាប់
          </button>
        </div>
      )}
    </div>
  )
}