import { ChatMessage } from "./gemini";

export const CHAT_HISTORY_KEY = "atp-chat-history";

export function loadHistory(storage: Storage): ChatMessage[] {
  const raw = storage.getItem(CHAT_HISTORY_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as ChatMessage[];
  } catch {
    return [];
  }
}

export function saveHistory(storage: Storage, history: ChatMessage[]): void {
  storage.setItem(CHAT_HISTORY_KEY, JSON.stringify(history));
}
