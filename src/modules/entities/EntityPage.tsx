import { useEffect, useState } from "react";
import { entityService } from "../../services/entity.service";
import DynamicTable from "../../components/dynamic/DynamicTable";
import DynamicFormModal from "../../components/dynamic/DynamicFormModal";
import ConfirmModal from "../../components/common/ConfirmModal";
import { useMessage } from "../../components/ui/MessageProvider";
import type { EntitySchema } from "../../types/entity";
import DropdownButton from "../../components/ui/DropdownButton";
import { usePermission } from "../../hooks/usePermission";
// import Modal from "../../components/common/Modal";
import UserProfileModal from "../users/UserProfileModal";

interface Props {
  entity: string;
}

export default function EntityPage({ entity }: Props) {
  const [schema, setSchema] = useState<EntitySchema | null>(null);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewingUser, setViewingUser] = useState<any>(null);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [editingMode, setEditingMode] = useState(false);
  const [deleteItem, setDeleteItem] = useState<any>(null);
  const [resetPasswordUser, setResetPasswordUser] = useState<any>(null);
  // const [viewing, setViewing] = useState<any>(null);

  const { showMessage } = useMessage();
  const { hasPermission } = usePermission();

  useEffect(() => {
    showMessage("info", "កំពុងទាញយកទិន្នន័យ...");
    load();
  }, [entity]);

  const load = async () => {
    try {
      setLoading(true);

      const schemaRes = await entityService.getSchema(entity);
      setSchema(schemaRes);

      const result = await entityService.getList(schemaRes.api.list);
      setData(result.data);
    } catch (e) {
      showMessage("error", "Cannot load data");
    } finally {
      setLoading(false);
    }
  };

  const handleView = (row: any) => {
    setViewingUser(row);

    setEditingMode(false);
  };

  const handleDelete = async () => {
    if (!deleteItem || !schema) return;

    try {
      if (!deleteItem || !schema?.api?.delete) return;

      const endpoint = schema.api.delete.replace("{id}", deleteItem.id);
      await entityService.delete(endpoint);
      showMessage("success", "Deleted successfully");
      load();
    } catch (e) {
      showMessage("error", "Delete failed");
    }

    setDeleteItem(null);
  };

  const handleStatus = async (row: any, newValue: boolean) => {
    if (!schema?.api?.patch) return;

    try {
      const patchUrl = schema.api.patch.replace("{id}", row.id);

      await entityService.patch(patchUrl, { is_active: newValue });

      load();
    } catch (e) {
      showMessage("error", "Status update failed");
    }
  };

  const handleResetPassword = async () => {
    if (!resetPasswordUser) return;

    try {
      await entityService.create(
        `/users/${resetPasswordUser.id}/reset-password`,
        {},
      );

      showMessage("success", "លេខសម្ងាត់ថ្មីត្រូវបានផ្ញើទៅអ៊ីមែល");
    } catch (error: any) {
      showMessage(
        "error",
        error.response?.data?.message || "Reset password failed",
      );
    } finally {
      setResetPasswordUser(null);
    }
  };

  if (!schema) return null;

  const actions = schema.extra_actions ?? [];

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <p className="text-2xl font-moul">{schema.page_title}</p>

        <div className="flex gap-2">
          {/* Create Button */}
          {schema.permissions?.create &&
            hasPermission(schema.permissions.create) && (
              <button
                onClick={() => setEditingUser({})}
                className="bg-[#8BAD13] text-white px-4 py-2 rounded-lg"
              >
                បន្ថែមថ្មី
              </button>
            )}

          {/* Export Buttons */}
          {!schema.permissions?.create && actions.length > 0 && (
            <DropdownButton
              label="ទាញយក"
              options={actions.map((action) => ({
                label: action.label,
                onClick: async () => {
                  if (!schema.api?.export || !action.format) return;

                  try {
                    await entityService.export(
                      schema.api.export,
                      action.format,
                    );
                    showMessage("success", "Export successful");
                  } catch (e) {
                    showMessage("error", "Export failed");
                  }
                },
              }))}
            />
          )}
        </div>
      </div>

      {/* Table */}
      <DynamicTable
        schema={schema}
        data={data}
        loading={loading}
        onView={handleView}
        onEdit={(row) => {
          setViewingUser(row);
          setEditingMode(true);
        }}
        onDelete={setDeleteItem}
        onRefresh={load}
        onStatusChange={handleStatus}
        onCustom={(action, row) => {
          if (action === "reset_password") {
            setResetPasswordUser(row);
          }
        }}
      />

      {editingUser !== null && (
        <DynamicFormModal
          schema={schema}
          entity={entity}
          data={editingUser}
          onClose={() => setEditingUser(null)}
          onSuccess={() => {
            setEditingUser(null);

            showMessage("success", "បានបង្កើតដោយជោគជ័យ");

            load();
          }}
        />
      )}

      <UserProfileModal
        open={!!viewingUser}
        user={viewingUser}
        editingMode={editingMode}
        onClose={() => {
          setViewingUser(null);

          setEditingMode(false);
        }}
        onSave={async (updatedUser) => {
          if (!schema?.api?.update) return;

          const endpoint = schema.api.update.replace(
            "{id}",
            String(updatedUser.id),
          );

          await entityService.update(endpoint, updatedUser);

          showMessage("success", "បានកែប្រែដោយជោគជ័យ");

          load();

          setViewingUser(updatedUser);
        }}
        onDelete={(id) => {
          setViewingUser(null);

          setDeleteItem({ id });
        }}
        onResetPassword={(user) => {
          console.log("Reset password:", user);
        }}
      />

      {/* Delete Modal */}
      <ConfirmModal
        open={deleteItem !== null}
        message="តើអ្នកប្រាកដជាចង់លុបមែនទេ?"
        confirmText="លុបចេញ"
        onConfirm={handleDelete}
        onCancel={() => setDeleteItem(null)}
      />

      {/* Reset Password Modal */}
      <ConfirmModal
        open={resetPasswordUser !== null}
        message={`តើអ្នកចង់ Reset Password សម្រាប់ ${resetPasswordUser?.name} មែនទេ?`}
        confirmText="Reset Password"
        onConfirm={handleResetPassword}
        onCancel={() => setResetPasswordUser(null)}
      />
    </div>
  );
}
