interface ConfirmModalProps {
  open: boolean
  title?: string
  message: string
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmModal({
  open,
  title = "បញ្ជាក់សកម្មភាព",
  message,
  confirmText = "យល់ព្រម",
  cancelText = "បោះបង់",
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
      <div className="
        bg-white
        w-full
        max-w-lg
        max-h-[90vh]
        overflow-y-auto
        rounded-xl
        p-6
        space-y-4
      ">
        <p className="text-xl font-moul mb-3">{title}</p>

        <p className="text-gray-600 font-battambang mb-6">
          {message}
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg border hover:bg-gray-100"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}
