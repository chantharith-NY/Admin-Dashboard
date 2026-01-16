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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
        <p className="text-xl font-moul mb-4">
          {user.name ? "កែតម្រូវអ្នកប្រើ" : "បន្ថែមអ្នកប្រើ"}
        </p>

        <div className="space-y-3">
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="ឈ្មោះ"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />

          <input
            className="w-full border rounded px-3 py-2"
            placeholder="Email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
          />

          <select
            className="w-full border rounded px-3 py-2"
            value={form.role}
            onChange={e =>
              setForm({ ...form, role: e.target.value })
            }
          >
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
            <option value="viewer">Viewer</option>
          </select>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg"
          >
            បោះបង់
          </button>

          <button
            onClick={() => onSave(form)}
            className="px-4 py-2 bg-[#8BAD13] text-white rounded-lg"
          >
            រក្សាទុក
          </button>
        </div>
      </div>
    </div>
  )
}
