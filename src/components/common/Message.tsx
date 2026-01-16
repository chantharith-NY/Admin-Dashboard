interface MessageProps {
  type: "success" | "error" | "info"
  text: string
}

export default function Message({ type, text }: MessageProps) {
  const styles = {
    success: "bg-green-100 text-green-700 border-green-300",
    error: "bg-red-100 text-red-700 border-red-300",
    info: "bg-blue-100 text-blue-700 border-blue-300",
  }

  return (
    <div
      className={`
        px-4 py-3 rounded-lg border
        shadow-sm font-battambang text-md
        ${styles[type]}
      `}
    >
      {text}
    </div>
  )
}
