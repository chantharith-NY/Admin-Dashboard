import { createContext, useContext, useState } from "react";
import Message from "./Message";
import { ConfirmDialog } from "./ConfirmMessage";

type MessageType = "success" | "error" | "info";

interface MessageState {
  type: MessageType;
  text: string;
}

interface MessageContextType {
  showMessage: (type: MessageType, text: string) => void;
  showConfirm: (text: string, onConfirm: () => void) => void;
}

const MessageContext = createContext<MessageContextType | null>(null);

export function MessageProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState<MessageState | null>(null);

  const [confirm, setConfirm] = useState<{
    text: string;
    onConfirm: () => void;
  } | null>(null);

  const showMessage = (type: MessageType, text: string) => {
    setMessage({ type, text });

    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  const showConfirm = (text: string, onConfirm: () => void) => {
    setConfirm({ text, onConfirm });
  };

  const closeMessage = () => {
    setMessage(null);
  };

  return (
    <MessageContext.Provider value={{ showMessage, showConfirm }}>
      {children}

      {message && (
        <div className="fixed bottom-5 right-5 z-50 w-80">
          <Message
            type={message.type}
            text={message.text}
            onClose={closeMessage}
          />
        </div>
      )}
      {confirm && (
        <ConfirmDialog
          text={confirm.text}
          onConfirm={() => {
            confirm.onConfirm();
            setConfirm(null);
          }}
          onCancel={() => setConfirm(null)}
        />
      )}
    </MessageContext.Provider>
  );
}

export function useMessage() {
  const ctx = useContext(MessageContext);
  if (!ctx) {
    throw new Error("useMessage must be used inside MessageProvider");
  }
  return ctx;
}
