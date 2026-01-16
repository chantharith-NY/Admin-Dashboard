// src/modules/models/ModelsPage.tsx
import { useEffect, useState } from "react"
import DataTable from "../../components/common/DataTable"
import { modelColumns } from "./modelColumns"
import type { ModelItem } from "../../types/model"
import { modelService } from "../../services/model.service"

export default function ModelsPage() {
  const [data, setData] = useState<ModelItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)

    modelService
      .getModels()
      .then(setData)
      .finally(() => setLoading(false))
  }, [])
  // useEffect(() => {
  //   modelService.getModels().then(res => {
  //     console.log("MODELS RESPONSE:", res)
  //     setData(res)
  //   })
  // }, [])

  return (
    <div className="space-y-4">
      <p className="text-3xl font-moul">
        ម៉ូឌែល
      </p>

      <DataTable
        columns={modelColumns}
        data={Array.isArray(data) ? data : []}
        emptyText={loading ? "កំពុងទាញយក..." : "គ្មានទិន្នន័យ"}
      />
    </div>
  )
}
