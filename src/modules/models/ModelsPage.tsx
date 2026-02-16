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

  useEffect(() => { modelService.getModels().then(res => setData(Array.isArray(res) ? res : [])).finally(() => setLoading(false)) }, [])
   
  /* ---------------- Save (Add / Edit) ---------------- */ 
  const handleSaveModel = (model: ModelItem) => { 
    setData(prev => { 
      const exists = prev.find(m => m.id === model.id) 
      return exists ? prev.map(m => (m.id === model.id ? model : m)) : [...prev, model] 
    }) 
      setEditingModel(null) 
      showMessage("success", "រក្សាទុកម៉ូឌែលដោយជោគជ័យ") 
    }
  
  /* ---------------- Toggle Active ---------------- */ 
  const toggleActive = (id: number) => { 
    setData(prev => prev.map(m => m.id === id ? {
      ...m, is_active: !m.is_active } : m)) 
    showMessage("success", "បានប្តូរទីតាំងម៉ូឌែលដោយជោគជ័យ") 
  } 
  
  /* ---------------- Delete ---------------- */ 
  const confirmDelete = () => { 
    if (deleteId === null) 
      return setData(prev => prev.filter(m => m.id !== deleteId)) 
    setDeleteId(null) 
    showMessage("success", "បានលុបម៉ូឌែលដោយជោគជ័យ") 
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
              id: Date.now(),
              model_name: "",
              model_type: "summarization",
              model_path: "",
              is_active: true,
              created_at: new Date().toISOString(),
            })
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
