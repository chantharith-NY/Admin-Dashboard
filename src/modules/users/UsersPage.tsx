// UsersPage.tsx

import { useEffect, useState } from "react";

import DataTable from "../../components/common/DataTable";
import ConfirmModal from "../../components/common/ConfirmModal";
import UserProfileModal from "./UserProfileModal";

import DropdownButton from "../../components/ui/DropdownButton";

import type { AdminUser } from "../../types/adminUser";

import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  resetUserPassword,
} from "../../services/user.service";

import { usePermission } from "../../hooks/usePermission";
import { useMessage } from "../../components/ui/MessageProvider";
import { useAuthStore } from "../../stores/authStore";

import { Plus, MoreVertical } from "lucide-react";

export default function UsersPage() {
  /* =====================================================
      STATES
  ===================================================== */

  const [users, setUsers] = useState<AdminUser[]>([]);

  const [loading, setLoading] = useState(false);

  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);

  const [editingMode, setEditingMode] = useState(false);

  const [deleteUserId, setDeleteUserId] = useState<number | null>(null);

  const [resetPasswordUser, setResetPasswordUser] = useState<AdminUser | null>(
    null,
  );

  /* =====================================================
      HOOKS
  ===================================================== */

  const { showMessage } = useMessage();

  const { hasPermission } = usePermission();

  const currentUser = useAuthStore((state) => state.user);

  /* =====================================================
      PERMISSIONS
  ===================================================== */

  const permissions = {
    create: hasPermission("user.create"),
    update: hasPermission("user.update"),
    delete: hasPermission("user.delete"),
  };

  /* =====================================================
      FETCH USERS
  ===================================================== */

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const data = await getUsers();

      setUsers(data);
    } catch (error) {
      showMessage("error", "បរាជ័យក្នុងការទាញយកអ្នកប្រើប្រាស់");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  /* =====================================================
      SAVE USER
  ===================================================== */

  const handleSaveUser = async (user: AdminUser) => {
    try {
      // CREATE
      if (!user.id || user.id === 0) {
        await createUser(user);

        showMessage("success", "បង្កើតអ្នកប្រើប្រាស់ជោគជ័យ");
      } else {
        // UPDATE
        await updateUser(user.id, user);

        showMessage("success", "កែប្រែអ្នកប្រើប្រាស់ជោគជ័យ");
      }

      await fetchUsers();

      setSelectedUser(null);

      setEditingMode(false);
    } catch (error: any) {
      showMessage(
        "error",
        error.response?.data?.message || "មានបញ្ហាក្នុងការរក្សាទុក",
      );
    }
  };

  /* =====================================================
      DELETE USER
  ===================================================== */

  const confirmDelete = async () => {
    if (!deleteUserId) return;

    try {
      await deleteUser(deleteUserId);

      showMessage("success", "លុបអ្នកប្រើប្រាស់ជោគជ័យ");

      await fetchUsers();
    } catch (error) {
      showMessage("error", "បរាជ័យក្នុងការលុប");
    } finally {
      setDeleteUserId(null);
    }
  };

  /* =====================================================
      RESET PASSWORD
  ===================================================== */

  const confirmResetPassword = async () => {
    if (!resetPasswordUser) return;

    try {
      await resetUserPassword(resetPasswordUser.id);

      showMessage("success", "ពាក្យសម្ងាត់ថ្មីត្រូវបានផ្ញើទៅអ៊ីមែល");

      setResetPasswordUser(null);
    } catch (error: any) {
      showMessage(
        "error",
        error.response?.data?.message || "បរាជ័យក្នុងការកំណត់ពាក្យសម្ងាត់",
      );
    }
  };

  /* =====================================================
      TOGGLE STATUS
  ===================================================== */

  const handleToggleStatus = async (user: AdminUser) => {
    try {
      // Prevent self disable
      if (currentUser?.id === user.id) {
        showMessage("error", "អ្នកមិនអាចបិទគណនីរបស់ខ្លួនបានទេ");

        return;
      }

      await updateUser(user.id, {
        ...user,
        is_active: !user.is_active,
      });

      showMessage(
        "success",
        user.is_active ? "បានបិទអ្នកប្រើប្រាស់" : "បានបើកអ្នកប្រើប្រាស់",
      );

      await fetchUsers();
    } catch (error) {
      showMessage("error", "បរាជ័យក្នុងការប្ដូរស្ថានភាព");
    }
  };

  /* =====================================================
      TABLE COLUMNS
  ===================================================== */

  const columns = [
    /* ================= ID ================= */

    {
      key: "id",
      title: "ល.រ",

      render: (_: any, index: number) => index + 1,
    },

    /* ================= USER ================= */

    {
      key: "name",
      title: "អ្នកប្រើប្រាស់",

      render: (user: AdminUser) => (
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div
            className="
              w-10 h-10
              rounded-full
              bg-[#8BAD13]/20
              flex items-center justify-center
              font-bold
              text-[#8BAD13]
            "
          >
            {user.name?.charAt(0)}
          </div>

          {/* Info */}
          <div>
            <p className="font-semibold">{user.name}</p>

            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
        </div>
      ),
    },

    /* ================= ROLE ================= */

    {
      key: "role",
      title: "តួនាទី",

      render: (user: AdminUser) => (
        <span
          className="
            px-3 py-1
            rounded-full
            bg-blue-100
            text-blue-700
            text-xs
            font-semibold
          "
        >
          {user.role}
        </span>
      ),
    },

    /* ================= STATUS ================= */

    {
      key: "is_active",
      title: "ស្ថានភាព",

      render: (user: AdminUser) => (
        <label
          className="
            inline-flex
            items-center
            cursor-pointer
          "
        >
          <input
            type="checkbox"
            checked={user.is_active}
            onChange={() => handleToggleStatus(user)}
            disabled={currentUser?.id === user.id}
            className="sr-only peer"
          />

          <div
            className="
              relative
              w-11 h-6
              bg-gray-200
              rounded-full
              peer
              peer-checked:bg-green-600
              transition-all
            "
          />
        </label>
      ),
    },

    /* ================= ACTIONS ================= */

    {
      key: "actions",
      title: "មុខងារ",

      render: (user: AdminUser) => (
        <DropdownButton
          icon={<MoreVertical size={18} />}
          options={[
            /* VIEW */
            {
              label: "👁 មើលព័ត៌មាន",

              onClick: () => {
                setSelectedUser(user);

                setEditingMode(false);
              },
            },

            /* EDIT */
            ...(permissions.update
              ? [
                  {
                    label: "✏️ កែប្រែ",

                    onClick: () => {
                      setSelectedUser(user);

                      setEditingMode(true);
                    },
                  },
                ]
              : []),

            /* RESET PASSWORD */
            ...(permissions.update
              ? [
                  {
                    label: "🔑 Reset Password",

                    onClick: () => {
                      setResetPasswordUser(user);
                    },
                  },
                ]
              : []),

            /* DELETE */
            ...(permissions.delete
              ? [
                  {
                    label: "🗑 លុប",

                    danger: true,

                    onClick: () => {
                      setDeleteUserId(user.id);
                    },
                  },
                ]
              : []),
          ]}
        />
      ),
    },
  ];

  /* =====================================================
      UI
  ===================================================== */

  return (
    <div className="space-y-5 p-5">
      {/* =================================================
          HEADER
      ================================================= */}

      <div
        className="
          flex
          items-center
          justify-between
        "
      >
        {/* TITLE */}
        <div>
          <h1
            className="
              text-3xl
              font-moul
            "
          >
            អ្នកប្រើប្រាស់
          </h1>

          <p className="text-gray-500 mt-1">
            គ្រប់គ្រងអ្នកប្រើប្រាស់ក្នុងប្រព័ន្ធ
          </p>
        </div>

        {/* CREATE BUTTON */}
        {permissions.create && (
          <button
            onClick={() => {
              setEditingMode(true);

              setSelectedUser({
                id: 0,
                name: "",
                email: "",
                role: "admin",
                role_id: 1,
                is_active: true,
              });
            }}
            className="
              flex items-center gap-2

              bg-[#8BAD13]
              hover:bg-green-700

              text-white

              px-4 py-2

              rounded-xl

              transition
            "
          >
            <Plus size={18} />
            បន្ថែមអ្នកប្រើ
          </button>
        )}
      </div>

      {/* =================================================
          TABLE
      ================================================= */}

      <div
        className="
          bg-white
          rounded-2xl
          border
          shadow-sm
          p-4
        "
      >
        <DataTable
          columns={columns}
          data={users}
          emptyText={loading ? "កំពុងទាញយក..." : "គ្មានទិន្នន័យ"}
        />
      </div>

      {/* =================================================
          USER PROFILE MODAL
      ================================================= */}

      <UserProfileModal
        open={!!selectedUser}
        user={selectedUser}
        editingMode={editingMode}
        onClose={() => {
          setSelectedUser(null);

          setEditingMode(false);
        }}
        onSave={handleSaveUser}
        onDelete={(id) => {
          setSelectedUser(null);

          setDeleteUserId(id);
        }}
        onResetPassword={(user) => {
          setResetPasswordUser(user);
        }}
      />

      {/* =================================================
          DELETE CONFIRM MODAL
      ================================================= */}

      <ConfirmModal
        open={deleteUserId !== null}
        message="តើអ្នកប្រាកដជាចង់លុបអ្នកប្រើប្រាស់នេះមែនទេ?"
        confirmText="លុបចេញ"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteUserId(null)}
      />

      {/* =================================================
          RESET PASSWORD CONFIRM
      ================================================= */}

      <ConfirmModal
        open={!!resetPasswordUser}
        message={`តើអ្នកចង់កំណត់ពាក្យសម្ងាត់ថ្មីសម្រាប់ ${resetPasswordUser?.name} មែនទេ?`}
        confirmText="កំណត់ឡើងវិញ"
        onConfirm={confirmResetPassword}
        onCancel={() => setResetPasswordUser(null)}
      />
    </div>
  );
}
