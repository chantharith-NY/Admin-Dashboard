import { useEffect, useState } from "react"
import DataTable from "../../components/common/DataTable"
import { historyColumns } from "./historyColumns"
import type { HistoryItem } from "../../types/history"
import { historyService } from "../../services/history.service"

export default function SpellCheckHistoryPage() {
  const [data, setData] = useState<HistoryItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)

    historyService
      .getHistory("spell_check")
      .then(setData)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="space-y-4">
      <p className="text-3xl font-moul">
        ប្រវត្តិកែអក្ខរាវិរុទ្ធ
      </p>

      <DataTable
        columns={historyColumns}
        data={data}
        emptyText={loading ? "កំពុងទាញយក..." : "គ្មានទិន្នន័យ"}
      />
    </div>
  )
}
