import { useState } from "react"
import DataTable from "../../components/common/DataTable"
import ConfirmModal from "../../components/common/ConfirmModal"
import UserFormModal from "./UserFormModal"
import { mockUsers } from "./mockUsers"
import { userColumns } from "./userColumns"
import type { AdminUser } from "../../types/adminUser"
import { usePermission } from "../../hooks/usePermission"
import { useMessage } from "../../components/common/MessageProvider"

export default function UsersPage() {
  const [users, setUsers] = useState<AdminUser[]>(mockUsers)

  const [editingUser, setEditingUser] = useState<AdminUser | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)

  const { showMessage } = useMessage()

  const canCreate = usePermission("user.create")
  const canEdit = usePermission("user.update")
  const canDelete = usePermission("user.delete")

  /* ---------------- Add / Edit ---------------- */

  const handleSaveUser = (user: AdminUser) => {
    setUsers(prev => {
      const exists = prev.find(u => u.id === user.id)
      return exists
        ? prev.map(u => (u.id === user.id ? user : u))
        : [...prev, user]
    })

    setEditingUser(null)
    showMessage("success", "រក្សាទុកអ្នកប្រើប្រាស់ដោយជោគជ័យ")
  }

  /* ---------------- Delete ---------------- */

  const confirmDelete = () => {
    if (deleteId === null) return

    setUsers(prev => prev.filter(u => u.id !== deleteId))
    setDeleteId(null)
    showMessage("success", "បានលុបអ្នកប្រើប្រាស់ដោយជោគជ័យ")
  }

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <p className="text-3xl font-moul">អ្នកប្រើប្រាស់</p>

        {canCreate && (
          <button
            onClick={() =>
              setEditingUser({
                id: Date.now(),
                name: "",
                email: "",
                role: "admin",
                is_active: true,
              })
            }
            className="bg-[#8BAD13] text-white px-4 py-2 rounded-lg"
          >
            បន្ថែមអ្នកប្រើ
          </button>
        )}
      </div>

      <DataTable
        columns={userColumns(
          canEdit,
          canDelete,
          setEditingUser,      // ✅ REAL onEdit
          setDeleteId
        )}
        data={users}
      />

      {/* Add / Edit Modal */}
      {editingUser && (
        <UserFormModal
          user={editingUser}
          onSave={handleSaveUser}
          onClose={() => setEditingUser(null)}
        />
      )}

      {/* Delete Confirm */}
      <ConfirmModal
        open={deleteId !== null}
        message="តើអ្នកប្រាកដជាចង់លុបអ្នកប្រើប្រាស់នេះមែនទេ?"
        confirmText="លុបចេញ"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  )
}
