interface ConfirmProps {
  text: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({ text, onConfirm, onCancel }: ConfirmProps) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Light blur background (NOT black) */}
      <div
        className="absolute inset-0 backdrop-blur-sm bg-black/10"
        onClick={onCancel}
      />

      {/* Modal */}
      <div
        className="
        relative z-10
        w-95
        bg-white/90 backdrop-blur-md
        border border-gray-200
        rounded-2xl
        shadow-xl
        p-6
        animate-[fadeIn_0.2s_ease]
      "
      >
        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Confirm Action
        </h2>

        {/* Message */}
        <p className="text-sm text-gray-600 mb-6 leading-relaxed">{text}</p>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="
              px-4 py-2 text-sm
              bg-gray-100 hover:bg-gray-200
              text-gray-700
              rounded-lg
              transition
            "
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="
              px-4 py-2 text-sm
              bg-red-500 hover:bg-red-600
              text-white
              rounded-lg
              shadow-sm
              transition
            "
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
