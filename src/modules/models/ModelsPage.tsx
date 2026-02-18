// src/modules/models/ModelsPage.tsx
import { useEffect, useState } from "react"
import DataTable from "../../components/common/DataTable"
import ConfirmModal from "../../components/common/ConfirmModal"
import ModelFormModal from "./ModelFormModal"
import { modelColumns } from "./modelColumns"
import type { ModelItem } from "../../types/model"
import { modelService } from "../../services/model.service"
import { useMessage } from "../../components/common/MessageProvider"
import { PlusIcon } from "lucide-react"

export default function ModelsPage() {
  const [data, setData] = useState<ModelItem[]>([])
  const [loading, setLoading] = useState(true)


  const [editingModel, setEditingModel] = useState<ModelItem | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)

  const { showMessage } = useMessage()

  useEffect(() => {
    fetchModels()
  }, [])

  const fetchModels = async () => {
    try {
      const models = await modelService.getModels()
      setData(models)
    } catch (error) {
      showMessage("error", "មិនអាចទាញយកម៉ូឌែលបានទេ")
    } finally {
      setLoading(false)
    }
  }
   
  /* ---------------- Save (Add / Edit) ---------------- */ 
  const handleSaveModel = async (model: ModelItem) => {
    try {
      if (!model.id) {
        await modelService.createModel(model)
        showMessage("success", "បង្កើតម៉ូឌែលដោយជោគជ័យ")
      } else {
        await modelService.updateModel(model.id, model)
        showMessage("success", "កែប្រែម៉ូឌែលដោយជោគជ័យ")
      }

      await fetchModels()
      setEditingModel(null)
    } catch (error) {
      showMessage("error", "មានបញ្ហាក្នុងការរក្សាទុកម៉ូឌែល")
    }
  }
  
  /* ---------------- Toggle Active ---------------- */ 
  const toggleActive = async (id: number) => {
    try {
      await modelService.toggleActive(id)
      await fetchModels()
      showMessage("success", "បានប្តូរស្ថានភាពម៉ូឌែលដោយជោគជ័យ")
    } catch (error) {
      showMessage("error", "មិនអាចប្តូរស្ថានភាពម៉ូឌែលបានទេ")
    }
  }
  
  /* ---------------- Delete ---------------- */ 
  const confirmDelete = async () => {
    if (deleteId === null) return

    try {
      await modelService.deleteModel(deleteId)
      await fetchModels()
      showMessage("success", "បានលុបម៉ូឌែលដោយជោគជ័យ")
    } catch (error) {
      showMessage("error", "មិនអាចលុបម៉ូឌែលបានទេ")
    }

    setDeleteId(null)
  }

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Header */}
      <div className="flex flex-row justify-between items-start md:items-center gap-3 md:gap-0">
        <p className="text-xl sm:text-2xl lg:text-3xl font-moul">
          ម៉ូឌែល
        </p>

        <button
          onClick={() =>
            setEditingModel({
              model_name: "",
              model_type: "summarization",
              model_path: "",
              is_active: true,
            } as ModelItem)
          }
          className="bg-[#8BAD13] text-white p-2 sm:p-2.5 rounded-lg flex items-center justify-center hover:bg-green-700 transition"
          title="បន្ថែមម៉ូឌែល"
        >
            <PlusIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            {/* Optional: Add text for larger screens */}
            <span className="hidden md:inline ml-2 font-medium text-sm sm:text-base">
              បន្ថែមម៉ូឌែល
            </span>
        </button>
      </div>

      {/* Table */}
      <DataTable
        columns={modelColumns(
          toggleActive,
          setEditingModel,
          setDeleteId
        )}
        data={data}
        emptyText={loading ? "កំពុងទាញយក..." : "គ្មានទិន្នន័យ"}
      />

      {/* Add / Edit */}
      {editingModel && (
        <ModelFormModal
          model={editingModel}
          onSave={handleSaveModel}
          onClose={() => setEditingModel(null)}
        />
      )}

      {/* Delete */}
      <ConfirmModal
        open={deleteId !== null}
        message="តើអ្នកប្រាកដជាចង់លុបម៉ូឌែលនេះមែនទេ?"
        confirmText="លុបចេញ"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  )
}
