import { useState, useEffect } from "react";
import DataTable from "../../components/common/DataTable";
import ConfirmModal from "../../components/common/ConfirmModal";
import UserFormModal from "./UserFormModal";
// import { mockUsers } from "./mockUsers"
import { userColumns } from "./userColumns";
import type { AdminUser } from "../../types/adminUser";
import { usePermission } from "../../hooks/usePermission";
import { useMessage } from "../../components/ui/MessageProvider";
import { PlusIcon } from "lucide-react";
import { useAuthStore } from "../../stores/authStore";

import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../../services/user.service";

export default function UsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);

  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { showMessage } = useMessage();

  const { hasPermission } = usePermission();

  // const canCreate = useMemo(
  //   () => hasPermission("user.create"),
  //   [hasPermission],
  // );
  // const canEdit = useMemo(() => hasPermission("user.update"), [hasPermission]);
  // const canDelete = useMemo(
  //   () => hasPermission("user.delete"),
  //   [hasPermission],
  // );
  const permissions = {
    create: hasPermission("user.create"),
    edit: hasPermission("user.update"),
    delete: hasPermission("user.delete"),
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  /* ---------------- Fetch user ---------------- */

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      showMessage("error", "បរាជ័យក្នុងការទាញយកអ្នកប្រើប្រាស់");
    }
  };

  /* ---------------- Toggle status ---------------- */

  const currentUser = useAuthStore((state) => state.user);

  const handleToggleStatus = async (user: AdminUser) => {
    // 🔒 Prevent self deactivation
    if (currentUser && user.id === currentUser.id) {
      showMessage("error", "អ្នកមិនអាចបិទគណនីរបស់ខ្លួនបានទេ");
      return;
    }

    try {
      await updateUser(user.id, {
        ...user,
        is_active: !user.is_active,
      });

      showMessage(
        "success",
        user.is_active
          ? "បានបិទអ្នកប្រើប្រាស់ដោយជោគជ័យ"
          : "បានបើកអ្នកប្រើប្រាស់ដោយជោគជ័យ",
      );

      await fetchUsers();
    } catch (error) {
      showMessage("error", "មានបញ្ហាក្នុងការប្តូរស្ថានភាព");
    }
  };

  /* ---------------- Add / Edit ---------------- */

  const handleSaveUser = async (user: AdminUser) => {
    try {
      if (!user.id || user.id === 0) {
        await createUser(user);
        showMessage("success", "បង្កើតអ្នកប្រើប្រាស់ដោយជោគជ័យ");
      } else {
        await updateUser(user.id, user);
        showMessage("success", "កែប្រែអ្នកប្រើប្រាស់ដោយជោគជ័យ");
      }

      await fetchUsers();
      setEditingUser(null);
    } catch (error: any) {
      showMessage(
        "error",
        error.response?.data?.message || "មានបញ្ហាក្នុងការរក្សាទុក",
      );
    }
  };

  /* ---------------- Delete ---------------- */

  const confirmDelete = async () => {
    if (deleteId === null) return;

    try {
      await deleteUser(deleteId);
      showMessage("success", "បានលុបអ្នកប្រើប្រាស់ដោយជោគជ័យ");
      fetchUsers();
    } catch (error) {
      showMessage("error", "បរាជ័យក្នុងការលុប");
    }

    setDeleteId(null);
  };

  return (
    <div className="space-y-5 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-row justify-between items-start md:items-center gap-3 md:gap-0">
        <p className="text-xl sm:text-2xl lg:text-3xl font-moul">
          អ្នកប្រើប្រាស់
        </p>

        {permissions.create && (
          <button
            onClick={() =>
              setEditingUser({
                id: 0,
                name: "",
                email: "",
                role: "admin",
                is_active: true,
              })
            }
            className="bg-[#8BAD13] text-white p-2 sm:p-2.5 rounded-lg flex items-center justify-center hover:bg-green-700 transition"
            title="បន្ថែមអ្នកប្រើ"
          >
            <PlusIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            {/* Optional: Add text for larger screens */}
            <span className="hidden md:inline ml-2 font-medium text-sm sm:text-base">
              បន្ថែមអ្នកប្រើ
            </span>
          </button>
        )}
      </div>

      <DataTable
        columns={userColumns(
          permissions.edit,
          permissions.delete,
          setEditingUser,
          setDeleteId,
          handleToggleStatus,
        )}
        data={users}
      />

      {editingUser && (
        <UserFormModal
          user={editingUser}
          onSave={handleSaveUser}
          onClose={() => setEditingUser(null)}
        />
      )}

      <ConfirmModal
        open={deleteId !== null}
        message="តើអ្នកប្រាកដជាចង់លុបអ្នកប្រើប្រាស់នេះមែនទេ?"
        confirmText="លុបចេញ"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
