import { createContext, useContext, useState } from "react"
import Message from "./Message"

type MessageType = "success" | "error" | "info"

interface MessageState {
  type: MessageType
  text: string
}

interface MessageContextType {
  showMessage: (type: MessageType, text: string) => void
}

const MessageContext = createContext<MessageContextType | null>(null)

export function MessageProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState<MessageState | null>(null)

  const showMessage = (type: MessageType, text: string) => {
    setMessage({ type, text })

    setTimeout(() => {
      setMessage(null)
    }, 3000)
  }

  return (
    <MessageContext.Provider value={{ showMessage }}>
      {children}

      {/* Toast container */}
      {message && (
        <div className="fixed bottom-5 right-5 z-50 w-80">
          <Message type={message.type} text={message.text} />
        </div>
      )}
    </MessageContext.Provider>
  )
}

export function useMessage() {
  const ctx = useContext(MessageContext)
  if (!ctx) {
    throw new Error("useMessage must be used inside MessageProvider")
  }
  return ctx
}
