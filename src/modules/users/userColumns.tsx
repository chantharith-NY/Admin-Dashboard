import type { TableColumn } from "../../components/common/DataTable"
import type { AdminUser } from "../../types/adminUser"

export const userColumns = (
  canEdit: boolean,
  canDelete: boolean,
  onEdit: (u: AdminUser) => void,
  onDelete: (id: number) => void
): TableColumn<AdminUser>[] => [
  {
    key: "id",
    title: "ល.រ",
    render: (_, i) => i + 1,
  },
  {
    key: "name",
    title: "ឈ្មោះ",
  },
  {
    key: "email",
    title: "Email",
  },
  {
    key: "role",
    title: "តួនាទី",
  },
  {
    key: "is_active",
    title: "ស្ថានភាព",
    render: u =>
      u.is_active ? (
        <span className="text-green-600 font-battambang font-semibold text-lg">សកម្ម</span>
      ) : (
        <span className="text-red-500 font-battambang font-semibold text-lg">អសកម្ម</span>
      ),
  },
  {
    key: "actions",
    title: "សកម្មភាព",
    render: user => (
      <div className="flex gap-2">
        {canEdit && (
          <button
            onClick={() => onEdit(user)}
            className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 min-w-15 text-center font-battambang font-semibold"
          >
            កែតម្រូវ
          </button>
        )}
        {canDelete && (
          <button
            onClick={() => onDelete(user.id)}
            className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 min-w-15 text-center font-battambang font-semibold"
          >
            លុបចេញ
          </button>
        )}
      </div>
    ),
  },
]
