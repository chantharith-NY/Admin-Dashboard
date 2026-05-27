import { useEffect, useState } from "react";
import Modal from "../../components/common/Modal";
import Button from "../../components/ui/Button";
import type { AdminUser } from "../../types/adminUser";

interface Props {
  open: boolean;

  user: AdminUser | null;

  editingMode?: boolean;

  onClose: () => void;

  onSave: (user: AdminUser) => Promise<void>;

  onDelete: (id: number) => void;

  onResetPassword: (user: AdminUser) => void;
}

export default function UserProfileModal({
  open,
  user,
  editingMode = false,
  onClose,
  onSave,
  onDelete,
  onResetPassword,
}: Props) {
  const [form, setForm] = useState<AdminUser | null>(null);

  const [editing, setEditing] = useState(false);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    setForm(user);

    setEditing(editingMode);

    setError("");
  }, [user, editingMode]);

  if (!form) return null;

  const isChanged =
    form.name !== user?.name ||
    form.email !== user?.email ||
    form.role_id !== user?.role_id ||
    form.is_active !== user?.is_active;

  const validate = () => {
    if (!form.name.trim()) {
      return "Name is required";
    }

    if (!form.email.trim()) {
      return "Email is required";
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      return "Invalid email format";
    }

    return "";
  };

  const handleSave = async () => {
    const validationError = validate();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setSaving(true);

      setError("");

      await onSave(form);

      setEditing(false);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to save user");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setForm(user);
    setEditing(false);
    setError("");
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={editing ? "កែប្រែព័ត៌មានអ្នកប្រើ" : "ព័ត៌មានអ្នកប្រើ"}
      width="lg"
    >
      <div className="space-y-6">
        {/* PROFILE HEADER */}
        <div className="flex flex-col items-center text-center">
          <div
            className="
            w-24 h-24 rounded-full
            bg-[#8BAD13]/20
            flex items-center justify-center
            text-4xl font-bold
            text-[#8BAD13]
          "
          >
            {form.name?.charAt(0)?.toUpperCase()}
          </div>

          <p className="mt-3 text-xl font-semibold">{form.name}</p>

          <p className="text-gray-500">{form.email}</p>

          <span
            className={`mt-2 text-xs px-3 py-1 rounded-full ${
              form.is_active
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-600"
            }`}
          >
            {form.is_active ? "Active" : "Inactive"}
          </span>
        </div>

        {/* FORM */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* NAME */}
          <div>
            <label className="text-sm text-gray-500">ឈ្មោះ</label>

            <input
              value={form.name}
              disabled={!editing}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              className={`
                w-full border rounded px-3 py-2
                ${!editing ? "bg-gray-100 cursor-not-allowed" : ""}
              `}
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm text-gray-500">អ៊ីមែល</label>

            <input
              value={form.email}
              disabled={!editing}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
              className={`
                w-full border rounded px-3 py-2
                ${!editing ? "bg-gray-100 cursor-not-allowed" : ""}
              `}
            />
          </div>

          {/* ROLE */}
          <div>
            <label className="text-sm text-gray-500">តួនាទី</label>

            <select
              value={form.role_id}
              disabled={!editing}
              onChange={(e) =>
                setForm({
                  ...form,
                  role_id: Number(e.target.value),
                })
              }
              className={`
                w-full border rounded px-3 py-2
                ${!editing ? "bg-gray-100 cursor-not-allowed" : ""}
              `}
            >
              <option value={1}>Admin</option>

              <option value={2}>User</option>
            </select>
          </div>

          {/* STATUS */}
          <div className="md:col-span-2 flex items-center justify-between mt-2">
            <span className="text-sm text-gray-500">សកម្មភាព</span>

            <input
              type="checkbox"
              checked={form.is_active}
              disabled={!editing}
              onChange={() =>
                setForm({
                  ...form,
                  is_active: !form.is_active,
                })
              }
              className="w-5 h-5 accent-green-600"
            />
          </div>
        </div>

        {/* ERROR */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* FOOTER */}
        <div className="flex flex-col md:flex-row justify-between gap-3 pt-4 border-t">
          {/* LEFT */}
          <div className="flex gap-2">
            {editing && (
              <Button variant="warning" onClick={() => onResetPassword(form)}>
                Reset Password
              </Button>
            )}

            <Button
              variant="danger"
              disabled={saving}
              onClick={() => onDelete(form.id)}
            >
              លុប
            </Button>
          </div>

          {/* RIGHT */}
          <div className="flex gap-2">
            {!editing ? (
              <>
                <Button variant="secondary" onClick={onClose}>
                  បិទ
                </Button>

                <Button
                  variant="edit"
                  onClick={() => {
                    setEditing(true);
                    setError("");
                  }}
                >
                  កែប្រែ
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="secondary"
                  disabled={saving}
                  onClick={handleCancel}
                >
                  បោះបង់
                </Button>

                <Button disabled={!isChanged || saving} onClick={handleSave}>
                  {saving ? "កំពុងរក្សាទុក..." : "រក្សាទុក"}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
