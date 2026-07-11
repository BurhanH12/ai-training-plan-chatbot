# AI Training Plan Dummy Site + Content Chatbot — Design

## Goal

Build a 2-page Next.js (App Router) dummy clone of aitrainingplan.app (landing page + `/features`), content-faithful but not pixel-perfect, with a floating chatbot widget that answers visitor questions using only the site's own content, powered by the Gemini free-tier API.

## Non-goals

- Pixel-perfect visual clone, animations, or exact component styling.
- Real waitlist form backend, search (Cmd+K), login/gated app.
- Vector DB / embeddings retrieval — content is small enough for full context stuffing.
- Multi-language versions, other site pages (guides, calculators, etc.).

## Content Source of Truth

All scraped copy (nav, hero, feature cards + FAQs, testimonials, integrations, sports/priority tables, CTAs) lives in `content/site-content.ts` as structured TS objects/arrays, organized by page and section. Sourced from the research report gathered earlier in this session (raw HTML/text saved at `/tmp/claude-1000/-home-cygnis-Practice/a7a1f124-c736-4730-9308-af2a41a6409d/scratchpad/home.txt` and `features.txt`).

Both the page components and the chatbot's system prompt import from this single file, so displayed content and chatbot knowledge cannot drift apart.

## Pages

- `app/page.tsx` — landing page: hero, pain-point/feature grid, comparison section, "how it works" steps, feature catalog preview, guide teasers (titles/descriptions only, no real article pages), founder testimonial, final CTA.
- `app/features/page.tsx` — full 34-feature catalog grouped into 6 categories, each with description + bullets + FAQ (plain `<details>` accordions), supported sports, race priority tiers, integrations, final CTA.
- Shared `Header` / `Footer` / `WaitlistModal` (UI-only stub, no submit backend) in root layout.
- Styling: Tailwind CSS, brand palette (navy `#010F31`, coral `#FF6B35`, off-white `#F8F6F1`) applied via Tailwind theme config. Generic layout/components — no attempt to replicate animations or exact spacing.

## Chatbot

- **Widget:** Floating launcher (bottom-right) in root layout, opens a slide-up panel. Client component (`components/ChatWidget.tsx`) holds `messages` state, mirrors to `sessionStorage` (key e.g. `atp-chat-history`) so conversation survives navigation between the two pages and reloads within the tab; cleared when tab closes.
- **API route:** `app/api/chat/route.ts` (Node runtime). Accepts `POST { messages: {role, content}[] }`. Builds a system prompt embedding the full serialized content from `content/site-content.ts` plus instructions to answer only from that content and say so plainly when something isn't covered. Sends full conversation history to Gemini. Returns `{ reply: string }` as a single JSON response (no streaming).
- **Model:** `gemini-2.0-flash` (free-tier friendly). API key read server-side only from `process.env.GEMINI_API_KEY`; never exposed to the client.
- **Error handling:** Catch Gemini errors (quota/network/invalid key) in the route and return a friendly fallback message with a non-500 shape the widget can render inline, rather than crashing the UI.

## Data flow

User submits message in widget → client appends to local state + sessionStorage → POST `/api/chat` with full message history → route assembles `[system prompt with site content] + [history]` → Gemini call → JSON `{ reply }` → client appends assistant message, persists to sessionStorage.

## Tech stack

- Next.js (App Router, latest stable), TypeScript, Tailwind CSS.
- `@google/generative-ai` (or current official Gemini SDK) for the API route.
- No database, no auth, no external services beyond Gemini.

## Testing/verification approach

- Manual E2E via dev server: load both pages, verify content renders, open chat widget, ask questions answerable from site content and one question that isn't (to confirm graceful "I don't know" behavior), verify persistence across navigating between pages.
- No pixel-perfection requirement per user (time-boxed); prioritize correct RAG behavior and content accuracy.
