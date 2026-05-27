import type { TableColumn } from "../../components/common/DataTable";
import type { AdminUser } from "../../types/adminUser";
import { Eye, Trash2 } from "lucide-react";

export const userColumns = (
  // canEdit: boolean,
  // canDelete: boolean,
  // onEdit: (u: AdminUser) => void,
  // onDelete: (id: number) => void,
  onToggleStatus: (u: AdminUser) => void,
  onView: (u: AdminUser) => void,
  onDelete: (id: number) => void,
  // onResetPassword: (u: AdminUser) => void,
  currentUser?: AdminUser,
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
    title: "អ៊ីមែល",
  },
  {
    key: "role",
    title: "តួនាទី",
  },
  {
    key: "is_active",
    title: "ស្ថានភាព",
    render: (user) => (
      <input
        type="checkbox"
        checked={user.is_active}
        disabled={currentUser?.id === user.id}
        onChange={() => onToggleStatus(user)}
        className="w-5 h-5 accent-green-600 cursor-pointer text-white"
      />
    ),
  },
  // {
  //   key: "actions",
  //   title: "សកម្មភាព",
  //   render: (user) => (
  //     <div className="flex gap-2">
  //       {/* {canEdit && (
  //         <button
  //           onClick={() => onEdit(user)}
  //           className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 min-w-15 text-center font-battambang font-semibold"
  //         >
  //           កែតម្រូវ
  //         </button>
  //       )}
  //       {canDelete && (
  //         <button
  //           onClick={() => onDelete(user.id)}
  //           className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 min-w-15 text-center font-battambang font-semibold"
  //         >
  //           លុបចេញ
  //         </button>
  //       )}

  //       {canEdit && (
  //         <button
  //           onClick={() => onResetPassword(user)}
  //           className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 min-w-15 text-center font-battambang font-semibold"
  //         >
  //           Reset Password
  //         </button>
  //       )} */}
  //       <button
  //         onClick={() => onView(user)}
  //         className="bg-[#8BAD13] text-white px-3 py-1 rounded-lg hover:bg-green-700 font-semibold"
  //       >
  //         មើល
  //       </button>

  //       {/* <button
  //         onClick={() => onToggleStatus(user)}
  //         className={`px-3 py-1 rounded-lg min-w-15 text-center font-battambang font-semibold text-white ${
  //           user.is_active
  //             ? "bg-orange-500 hover:bg-orange-600"
  //             : "bg-green-600 hover:bg-green-700"
  //         }`}
  //       >
  //         {user.is_active ? "បិទ" : "បើក"}
  //       </button> */}
  //     </div>
  //   ),
  // },

  {
    key: "actions",
    title: "សកម្មភាព",

    render: (user) => (
      <div className="flex items-center gap-2">
        {/* VIEW */}
        <button
          onClick={() => onView(user)}
          className="p-2 rounded-lg bg-[#8BAD13] text-white hover:bg-green-700 transition"
          title="មើលព័ត៌មាន"
        >
          <Eye size={18} />
        </button>

        {/* DELETE */}
        <button
          onClick={() => onDelete(user.id)}
          disabled={currentUser?.id === user.id}
          className="p-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          title="លុប"
        >
          <Trash2 size={18} />
        </button>
      </div>
    ),
  },
];
