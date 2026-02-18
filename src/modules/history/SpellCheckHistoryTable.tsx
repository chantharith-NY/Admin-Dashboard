import { useEffect, useState } from "react"
import DataTable from "../../components/common/DataTable"
import { historyColumns } from "./historyColumns"
import type { HistoryItem } from "../../types/history"
import { historyService } from "../../services/history.service"

export default function SpellCheckHistoryPage() {
  const [data, setData] = useState<HistoryItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchHistory()
  }, [])

  const fetchHistory = async () => {
    try {
      setLoading(true)
      const records = await historyService.getHistory("spell-check")
      setData(records.data)
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

      <DataTable
        columns={historyColumns}
        data={data}
        emptyText={loading ? "កំពុងទាញយក..." : "គ្មានទិន្នន័យ"}
      />
    </div>
  )
}