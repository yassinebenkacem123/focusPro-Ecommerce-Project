import { useMemo, useState } from "react";
import { FiSend } from "react-icons/fi";

interface ChatMessage {
  id: number;
  sender: "admin" | "seller";
  message: string;
  date: string;
}

const initialMessages: ChatMessage[] = [
  {
    id: 1,
    sender: "seller",
    message: "Hello admin, I need help with payout verification for this week.",
    date: "2026-03-20T10:00:00Z",
  },
  {
    id: 2,
    sender: "admin",
    message: "Sure, I can help. Please confirm the affected order IDs.",
    date: "2026-03-20T10:05:00Z",
  },
];

const AdminSellingCommunication = ({
  sellerName,
  onClose,
}: {
  sellerName: string;
  onClose?: () => void;
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");

  const totalMessages = useMemo(() => messages.length, [messages]);

  const handleSendMessage = () => {
    const trimmed = newMessage.trim();
    if (!trimmed) {
      return;
    }

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "admin",
        message: trimmed,
        date: new Date().toISOString(),
      },
    ]);
    setNewMessage("");
  };

  return (
    <section className="w-full rounded-2xl border border-stone-200 dark:border-gray-700/50 bg-white dark:bg-gray-800 p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between border-b border-stone-200 dark:border-gray-700/50 pb-4">
        <div>
          <h2 className="text-lg font-semibold text-stone-800 dark:text-gray-100">Internal Seller Chat</h2>
          <p className="text-sm text-stone-500 dark:text-gray-400">
            Conversation with {sellerName} inside the admin dashboard
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-stone-100 dark:bg-gray-700/60 px-3 py-1 text-xs font-medium text-stone-700 dark:text-gray-300">
            {totalMessages} messages
          </span>

          {onClose && (
            <button
              onClick={onClose}
              className="inline-flex h-8 cursor-pointer items-center rounded-lg border border-stone-300 dark:border-gray-600 px-3 text-xs font-medium text-stone-700 dark:text-gray-300 transition hover:bg-stone-100 dark:hover:bg-gray-700"
            >
              Close chat
            </button>
          )}
        </div>
      </div>

      <div className="h-80 space-y-3 overflow-y-auto rounded-xl border border-stone-200 dark:border-gray-700/50 bg-stone-50 dark:bg-gray-900/40 p-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "admin" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                message.sender === "admin"
                  ? "bg-stone-900 dark:bg-gray-700 text-white"
                  : "border border-stone-200 dark:border-gray-700/50 bg-white dark:bg-gray-800 text-stone-700 dark:text-gray-200"
              }`}
            >
              <p className="text-sm leading-relaxed">{message.message}</p>
              <p
                className={`mt-1 text-right text-[11px] ${
                  message.sender === "admin" ? "text-stone-300 dark:text-gray-300" : "text-stone-400 dark:text-gray-400"
                }`}
              >
                {new Date(message.date).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-3">
        <input
          type="text"
          placeholder="Write a message to seller..."
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSendMessage();
            }
          }}
          className="h-11 w-full rounded-xl border border-stone-300 dark:border-gray-600 bg-white dark:bg-gray-900/60 px-4 text-sm text-stone-800 dark:text-gray-100 outline-none transition placeholder:text-stone-400 dark:placeholder:text-gray-500 focus:border-stone-700 dark:focus:border-gray-400"
        />

        <button
          onClick={handleSendMessage}
          className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-xl bg-stone-900 dark:bg-gray-700 px-4 text-sm font-medium text-white transition hover:bg-stone-700 dark:hover:bg-gray-600"
          title="Send message"
        >
          <FiSend size={16} />
          Send
        </button>
      </div>
    </section>
  );
};

export default AdminSellingCommunication;
