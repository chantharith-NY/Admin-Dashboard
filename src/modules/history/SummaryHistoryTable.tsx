import { useEffect, useState } from "react"
import DataTable from "../../components/common/DataTable"
import { historyColumns } from "./historyColumns"
import type { HistoryItem } from "../../types/history"
import { historyService } from "../../services/history.service"

export default function SummaryHistoryPage() {
    const [data, setData] = useState<HistoryItem[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
    historyService.getHistory("summarize").then(setData)
    }, [])

    return (
        <div className="space-y-4">
            <p className="text-3xl font-moul">
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
