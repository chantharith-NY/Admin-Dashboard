import DataTable from "../common/DataTable";
import type { EntitySchema } from "../../types/entity";
import { entityService } from "../../services/entity.service";
import Button from "../ui/Button";
import { useMessage } from "../ui/MessageProvider";
interface Props {
  schema: EntitySchema;
  data: any[];
  loading: boolean;
  onEdit: (row: any) => void;
  onDelete: (row: any) => void;
  onRefresh: () => void;
  onStatusChange: (row: any, newValue: boolean) => void;
}

const formatDateTime = (dateString: string) => {
  if (!dateString) return "-";

  return new Date(dateString).toLocaleString("en-GB", {
    timeZone: "Asia/Phnom_Penh",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
};

const formatDuration = (ms: number) => {
  if (!ms) return "0s";

  const totalSeconds = Math.floor(ms / 1000);

  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;

  return [h ? `${h}h` : null, m ? `${m}m` : null, s ? `${s}s` : "0s"]
    .filter(Boolean)
    .join(" ");
};

export default function DynamicTable({
  schema,
  onRefresh,
  data,
  loading,
  onEdit,
  onDelete,
  onStatusChange,
}: Props) {
  const { showMessage, showConfirm } = useMessage(); // 🔥 ADD THIS

  // 🔥 Toggle source API
  const toggleSource = async (source: any) => {
    try {
      await entityService.patch(`/model-sources/${source.id}/status`, {
        is_active: !source.is_active,
      });

      showMessage("success", "Updated successfully"); // 🔥 SUCCESS MESSAGE
      onRefresh();
    } catch (error) {
      console.error("Failed to toggle source", error);
      showMessage("error", "Failed to update source"); // 🔥 ERROR MESSAGE
    }
  };

  // 🔥 Replace window.confirm with custom confirm
  const handleToggleSource = (source: any) => {
    showConfirm(
      `តើអ្នកចង់ ${
        source.is_active ? "បិទ" : "បើក"
      } ${source.source_type.toUpperCase()} មែនទេ?`,
      () => toggleSource(source),
    );
  };

  const columns = [
    {
      key: "id",
      title: "ល.រ",
      render: (_row: any, index: number) => index + 1,
    },

    ...schema.table.columns.map((col: any) => ({
      key: col.key,
      title: col.label,
      render: (row: any) => {
        const getValue = (obj: any, path: string) => {
          return path.split(".").reduce((acc, part) => acc?.[part], obj);
        };

        const value = getValue(row, col.key);

        // 🔥 SOURCE BADGE WITH TOGGLE
        if (col.type === "sources") {
          return (
            <div className="flex flex-wrap gap-2">
              {value?.map((item: any) => {
                const isActive = item.is_active;

                const style = isActive
                  ? "bg-green-100 text-green-700 border-green-300"
                  : "bg-red-100 text-red-600 border-red-300";

                return (
                  <span
                    key={item.id}
                    onClick={() => handleToggleSource(item)}
                    className={`
                      px-3 py-1 text-xs rounded-full border
                      cursor-pointer transition hover:scale-105
                      ${style}
                    `}
                  >
                    <span
                      className={`w-2 h-2 rounded-full inline-block mr-1 ${
                        item.is_active ? "bg-green-500" : "bg-red-500"
                      }`}
                    />
                    {item.source_type.toUpperCase()}
                  </span>
                );
              })}
            </div>
          );
        }

        // 🔥 BOOLEAN TOGGLE (MODEL ACTIVE)
        if (col.type === "boolean") {
          return (
            <input
              type="checkbox"
              checked={row[col.key]}
              onChange={async (e) => {
                const newValue = e.target.checked;
                onStatusChange?.(row, newValue);

                if (!schema.api?.patch) return;
                const patchUrl = schema.api.patch.replace("{id}", row.id);

                try {
                  await entityService.patch(patchUrl, { [col.key]: newValue });
                  showMessage("success", "Updated successfully"); // 🔥
                  onRefresh();
                } catch (error) {
                  console.error("Failed to update status:", error);
                  showMessage("error", "Failed to update"); // 🔥
                }
              }}
            />
          );
        }

        if (col.type === "duration") {
          return formatDuration(value);
        }

        if (col.type === "datetime") {
          return formatDateTime(value);
        }

        return value;
      },
    })),

    // Actions Column
    {
      key: "actions",
      title: "មុខងារ",
      render: (row: any) => (
        <div className="flex flex-col sm:flex-row gap-2">
          {schema.permissions?.update && (
            <Button onClick={() => onEdit(row)} variant="edit">
              កែប្រែ
            </Button>
          )}

          {schema.permissions?.delete && (
            <Button onClick={() => onDelete(row)} variant="danger">
              លុប
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={data || []}
      emptyText={loading ? "កំពុងទាញយក..." : "គ្មានទិន្នន័យ"}
    />
  );
}
