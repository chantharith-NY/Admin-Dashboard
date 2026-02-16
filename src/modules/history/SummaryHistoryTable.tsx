import { useEffect, useState } from "react"
import DataTable from "../../components/common/DataTable"
import { historyColumns } from "./historyColumns"
import type { HistoryItem } from "../../types/history"
import { historyService } from "../../services/history.service"

export default function SummaryHistoryPage() {
  const [data, setData] = useState<HistoryItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
    historyService
      .getHistory("summarize")
      .then(setData)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="space-y-3 sm:space-y-4">
      <p className="text-xl sm:text-2xl lg:text-3xl font-moul">
        ប្រវត្តិសង្ខេបអត្ថបទ
      </p>

      <DataTable
        columns={historyColumns}
        data={data}
        emptyText={loading ? "កំពុងទាញយក..." : "គ្មានទិន្នន័យ"}
      />
    </div>
  )
}

