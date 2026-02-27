interface MessageProps {
  type: "success" | "error" | "info"
  text: string
  onClose?: () => void
}

export default function Message({ type, text, onClose }: MessageProps) {
  const styles = {
    success: "bg-green-100 text-green-700 border-green-300",
    error: "bg-red-100 text-red-700 border-red-300",
    info: "bg-blue-100 text-blue-700 border-blue-300",
  }

  return (
    <div
      className={`
        relative px-4 py-3 rounded-lg border
        shadow-md font-battambang text-md
        transition-all duration-300 ease-in-out
        animate-slideIn
        ${styles[type]}
      `}
    >
      <div className="flex justify-between items-start gap-4">
        <span>{text}</span>

        <button
          onClick={onClose}
          className="text-sm font-bold opacity-60 hover:opacity-100"
        >
          ✕
        </button>
      </div>
    </div>
  )
}