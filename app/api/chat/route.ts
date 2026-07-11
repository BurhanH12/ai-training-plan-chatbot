import { NextRequest, NextResponse } from "next/server";
import { callGemini, ChatMessage } from "@/lib/gemini";

export function buildErrorReply(_error: unknown): string {
  return "Sorry, I'm having trouble answering right now. Please try again in a moment.";
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { messages?: ChatMessage[] };
  const messages = body.messages ?? [];

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({
      reply: buildErrorReply(new Error("missing GEMINI_API_KEY")),
      error: true,
    });
  }

  try {
    const reply = await callGemini(messages, apiKey);
    return NextResponse.json({ reply });
  } catch (err) {
    return NextResponse.json({ reply: buildErrorReply(err), error: true });
  }
}
