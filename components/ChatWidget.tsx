"use client";

import { useEffect, useState } from "react";
import { ChatMessage } from "@/lib/gemini";
import { loadHistory, saveHistory } from "@/lib/chatHistory";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() =>
    typeof window === "undefined" ? [] : loadHistory(window.sessionStorage)
  );
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (messages.length > 0) {
      saveHistory(window.sessionStorage, messages);
    }
  }, [messages]);

  async function sendMessage() {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const data = (await res.json()) as { reply: string };
      setMessages([...nextMessages, { role: "model", content: data.reply }]);
    } catch {
      setMessages([
        ...nextMessages,
        {
          role: "model",
          content: "Sorry, I'm having trouble answering right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {open && (
        <div className="mb-3 flex h-96 w-80 flex-col rounded-lg border border-[#E2E8F0] bg-white shadow-xl">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] px-4 py-3">
            <p className="font-semibold text-[#010F31]">Ask AiTrainingPlan</p>
            <button onClick={() => setOpen(false)} aria-label="Close chat">
              ✕
            </button>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
            {messages.length === 0 && (
              <p className="text-sm text-[#5A6A8A]">
                Ask me anything about AiTrainingPlan&apos;s features, sports supported, or how it works.
              </p>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                className={
                  m.role === "user"
                    ? "ml-auto max-w-[85%] rounded-lg bg-[#FF6B35] px-3 py-2 text-sm text-white"
                    : "mr-auto max-w-[85%] rounded-lg bg-[#F8F6F1] px-3 py-2 text-sm text-[#010F31]"
                }
              >
                {m.content}
              </div>
            ))}
            {loading && <p className="text-sm text-[#5A6A8A]">Thinking...</p>}
          </div>
          <form
            className="flex gap-2 border-t border-[#E2E8F0] p-3"
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 rounded border border-[#E2E8F0] px-3 py-2 text-sm"
            />
            <button
              type="submit"
              disabled={loading}
              className="rounded bg-[#FF6B35] px-3 py-2 text-sm font-semibold text-white disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </div>
      )}
      <button
        onClick={() => setOpen((o) => !o)}
        className="rounded-full bg-[#FF6B35] px-5 py-3 font-semibold text-white shadow-lg"
      >
        {open ? "Close" : "Chat"}
      </button>
    </div>
  );
}
