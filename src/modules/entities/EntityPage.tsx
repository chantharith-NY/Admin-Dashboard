import { useEffect, useState } from "react";
import { entityService } from "../../services/entity.service";
import DynamicTable from "../../components/dynamic/DynamicTable";
import DynamicFormModal from "../../components/dynamic/DynamicFormModal";
import ConfirmModal from "../../components/common/ConfirmModal";
import { useMessage } from "../../components/ui/MessageProvider";
import type { EntitySchema } from "../../types/entity";

interface Props {
  entity: string;
}

export default function EntityPage({ entity }: Props) {
  const [schema, setSchema] = useState<EntitySchema | null>(null);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any>(null);
  const [deleteItem, setDeleteItem] = useState<any>(null);

  const { showMessage } = useMessage();

  useEffect(() => {
    showMessage("info", "កំពុងទាញយកទិន្នន័យ...");
    load();
  }, [entity]);

  const load = async () => {
    try {
      setLoading(true);

      const schemaRes = await entityService.getSchema(entity);
      setSchema(schemaRes);

      const list = await entityService.getList(schemaRes.api.list);
      setData(list);
    } catch (e) {
      showMessage("error", "Cannot load data");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteItem || !schema) return;

    try {
      const endpoint = schema.api.delete.replace("{id}", deleteItem.id);
      await entityService.delete(endpoint);
      showMessage("success", "Deleted successfully");
      load();
    } catch {
      showMessage("error", "Delete failed");
    }

    setDeleteItem(null);
  };

  const handleStatus = async (
    row: any,
    newValue: boolean
  ) => {

    if (!schema?.api?.patch) return;

    try {
      const patchUrl = schema.api.patch.replace("{id}", row.id);

      await entityService.patch(
        patchUrl,
        { is_active: newValue }
      );

      load();
    } catch (e) {
      showMessage("error", "Status update failed");
    }
  };

  if (!schema) return null;

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <p className="text-2xl font-moul">{schema.page_title}</p>

        {schema.permissions?.create && (
          <button
            onClick={() => setEditing({})}
            className="bg-[#8BAD13] text-white px-4 py-2 rounded-lg"
          >
            បន្ថែមថ្មី
          </button>
        )}
      </div>

      {/* Table */}
      <DynamicTable
        schema={schema}
        data={data}
        loading={loading}
        onEdit={(row) => setEditing(row)}
        onDelete={(row) => setDeleteItem(row)}
        onRefresh={load}
        onStatusChange={handleStatus}
      />

      {/* Form Modal */}
      {editing !== null && (
        <DynamicFormModal
          schema={schema}
          entity={entity}
          data={editing}
          onClose={() => setEditing(null)}
          onSuccess={(isEdit) => {
            setEditing(null)

            showMessage(
              "success",
              isEdit
                ? "បានកែសម្រួលដោយជោគជ័យ"
                : "បានបង្កើតដោយជោគជ័យ"
            )

            load()
          }}
        />
      )}

      {/* Delete Modal */}
      <ConfirmModal
        open={deleteItem !== null}
        message="តើអ្នកប្រាកដជាចង់លុបមែនទេ?"
        confirmText="លុបចេញ"
        onConfirm={handleDelete}
        onCancel={() => setDeleteItem(null)}
      />
    </div>
  );
}
