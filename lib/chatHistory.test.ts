import { describe, it, expect, beforeEach } from "vitest";
import { loadHistory, saveHistory, CHAT_HISTORY_KEY } from "./chatHistory";
import { ChatMessage } from "./gemini";

class FakeStorage implements Storage {
  private store = new Map<string, string>();
  get length() {
    return this.store.size;
  }
  clear(): void {
    this.store.clear();
  }
  getItem(key: string): string | null {
    return this.store.get(key) ?? null;
  }
  key(index: number): string | null {
    return Array.from(this.store.keys())[index] ?? null;
  }
  removeItem(key: string): void {
    this.store.delete(key);
  }
  setItem(key: string, value: string): void {
    this.store.set(key, value);
  }
}

describe("chatHistory", () => {
  let storage: Storage;

  beforeEach(() => {
    storage = new FakeStorage();
  });

  it("returns an empty array when nothing is stored", () => {
    expect(loadHistory(storage)).toEqual([]);
  });

  it("round-trips saved history", () => {
    const history: ChatMessage[] = [
      { role: "user", content: "What sports do you support?" },
      { role: "model", content: "Running, cycling, triathlon, HYROX, and Spartan Race." },
    ];
    saveHistory(storage, history);
    expect(loadHistory(storage)).toEqual(history);
    expect(storage.getItem(CHAT_HISTORY_KEY)).toBeTruthy();
  });

  it("returns an empty array if stored value is corrupted JSON", () => {
    storage.setItem(CHAT_HISTORY_KEY, "{not valid json");
    expect(loadHistory(storage)).toEqual([]);
  });
});
