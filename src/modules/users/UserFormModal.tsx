import { useState } from "react"
import type { AdminUser } from "../../types/adminUser"

interface Props {
  user: AdminUser
  onSave: (u: AdminUser) => void
  onClose: () => void
}

export default function UserFormModal({ user, onSave, onClose }: Props) {
  const [form, setForm] = useState(user)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 sm:p-6">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md sm:max-w-lg p-4 sm:p-6 md:p-8">
        <p className="text-lg sm:text-xl md:text-2xl font-moul mb-4">
          {user.name ? "កែតម្រូវអ្នកប្រើ" : "បន្ថែមអ្នកប្រើ"}
        </p>

        <div className="space-y-3">
          <input
            className="w-full border rounded px-2 sm:px-3 py-2 sm:py-2.5 text-sm sm:text-base"
            placeholder="ឈ្មោះ"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />

          <input
            className="w-full border rounded px-2 sm:px-3 py-2 sm:py-2.5 text-sm sm:text-base"
            placeholder="Email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
          />

          <input
            className="w-full border rounded px-2 sm:px-3 py-2 sm:py-2.5 text-sm sm:text-base"
            placeholder="ពាក្យសម្ងាត់"
            type="password"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
          />

          <select
            className="w-full border rounded px-2 sm:px-3 py-2 sm:py-2.5 text-sm sm:text-base"
            value={form.role}
            onChange={e => setForm({ ...form, role: e.target.value })}
          >
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
            <option value="viewer">Viewer</option>
          </select>
          
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-3 sm:px-4 py-2 border rounded-lg text-sm sm:text-base"
          >
            បោះបង់
          </button>

          <button
            onClick={() => onSave(form)}
            className="px-3 sm:px-4 py-2 bg-[#8BAD13] text-white rounded-lg text-sm sm:text-base"
          >
            រក្សាទុក
          </button>
        </div>
      </div>
    </div>
  )
}