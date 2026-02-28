import DataTable from "../common/DataTable"
import type { EntitySchema } from "../../types/entity"
import { entityService } from "../../services/entity.service"
import Button from "../ui/Button"

interface Props {
  schema: EntitySchema
  data: any[]
  loading: boolean
  onEdit: (row: any) => void
  onDelete: (row: any) => void
  onRefresh: () => void
  onStatusChange: (row: any, newValue: boolean) => void
}

export default function DynamicTable({
  schema,
  onRefresh,
  data,
  loading,
  onEdit,
  onDelete,
  onStatusChange
}: Props) {


  const columns = [

    {
      key: "id",
      title: "ល.រ",
      render: (_row: any, index: number) => index + 1
    },

    ...schema.table.columns.map((col: any) => ({
      key: col.key,
      title: col.label,
      render: (row: any) => {
      if (col.type === "boolean") {
        return (
          <input
            type="checkbox"
            checked={row[col.key]}
            onChange={async (e) => {
              const newValue = e.target.checked
              onStatusChange?.(row, newValue)

              if (!schema.api?.patch) return
              console.log("Patching status to:", newValue)
              const patchUrl = schema.api.patch.replace("{id}", row.id)

              try {
                await entityService.patch(
                  patchUrl,
                  { [col.key]: newValue } // 🔥 dynamic field
                )
                onRefresh()
              } catch (error) {
                console.error("Failed to update status:", error)
              }
            }}
          />
        )
      }
        return row[col.key]
      }
    })),

    // Actions Column
    {
      key: "actions",
      title: "មុខងារ",
      render: (row: any) => (
        <div className="flex gap-2">
          {schema.permissions?.update && (
            <Button
              onClick={() => onEdit(row)}
              variant="edit"
            >
              កែប្រែ
            </Button>
          )}

          {schema.permissions?.delete && (
            <Button
              onClick={() => onDelete(row)}
              variant="danger"
            >
              លុប
            </Button>
          )}
        </div>
      )
    }
  ]

  return (
    <DataTable
      columns={columns}
      data={data || []}
      emptyText={loading ? "កំពុងទាញយក..." : "គ្មានទិន្នន័យ"}
    />
  )
}