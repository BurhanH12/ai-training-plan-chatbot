# AI Training Plan Dummy Site + Content Chatbot Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 2-page Next.js App Router dummy clone of aitrainingplan.app (landing + `/features`) with a floating chatbot widget that answers questions using only that site's own content, via the free-tier Gemini API.

**Architecture:** All scraped copy lives in one structured content file (`content/site-content.ts`) that both the page components and the chat API route import from, so what's shown on the page and what the bot knows can never diverge. The chat route stuffs the full serialized content into a Gemini system prompt (no vector DB — content is small) and returns a single non-streaming JSON reply. A client-side widget persists conversation in `sessionStorage`.

**Tech Stack:** Next.js (App Router, TypeScript), Tailwind CSS, `@google/genai` (official Gemini SDK), Vitest for logic unit tests.

## Global Constraints

- No pixel-perfect visual cloning — content-faithful, generic Tailwind styling only (per spec).
- No vector DB / embeddings — full context stuffing only (per spec).
- No real waitlist backend, search, or login — UI stubs only (per spec).
- `GEMINI_API_KEY` is read server-side only (in the API route), never exposed to the client.
- Chat API responses are single complete JSON (no streaming), per spec.
- Chat history persists via browser `sessionStorage`, not a server/database.
- Source content must be pulled faithfully from the research extraction files at `/tmp/claude-1000/-home-cygnis-Practice/a7a1f124-c736-4730-9308-af2a41a6409d/scratchpad/home.txt` and `features.txt` (full verbatim FAQ text lives there) — do not invent facts, numbers, or feature names not present in that source.

---

## File Structure

```
ai-training-plan-chatbot/
  package.json
  vitest.config.ts
  content/
    site-content.ts        # single source of truth: nav, hero, features, FAQs, etc.
  lib/
    gemini.ts               # buildSystemPrompt() + callGemini() wrapper
    gemini.test.ts
    chatHistory.ts           # sessionStorage read/write helpers (pure, injectable storage)
    chatHistory.test.ts
  app/
    layout.tsx               # root layout: Header, Footer, ChatWidget
    page.tsx                 # landing page
    features/page.tsx
    api/chat/route.ts
  components/
    Header.tsx
    Footer.tsx
    WaitlistModal.tsx         # UI-only stub
    FeatureCard.tsx
    FaqAccordion.tsx
    ChatWidget.tsx
```

---

### Task 1: Scaffold the Next.js project

**Files:**
- Create: entire project scaffold via `create-next-app` in `/home/cygnis/Practice/ai-training-plan-chatbot`
- Modify: `package.json` (add `vitest`, `@google/genai`)

**Interfaces:**
- Produces: a working Next.js dev server (`npm run dev`) and build (`npm run build`) that later tasks add pages/components/routes into.

- [ ] **Step 1: Run create-next-app non-interactively**

```bash
cd /home/cygnis/Practice/ai-training-plan-chatbot
npx --yes create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*" --use-npm --yes
```

- [ ] **Step 2: Verify the scaffold builds**

Run: `npm run build`
Expected: build completes with the default Next.js starter page, exit code 0.

- [ ] **Step 3: Install additional dependencies**

```bash
npm install @google/genai
npm install -D vitest
```

- [ ] **Step 4: Add a `test` script to `package.json`**

In `package.json` `scripts`, add:
```json
"test": "vitest run"
```

- [ ] **Step 5: Create `vitest.config.ts`**

```typescript
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
  },
});
```

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "Scaffold Next.js app with Tailwind, Gemini SDK, and Vitest"
```

---

### Task 2: Content data layer

**Files:**
- Create: `content/site-content.ts`
- Test: `content/site-content.test.ts`

**Interfaces:**
- Consumes: raw text at `/tmp/claude-1000/-home-cygnis-Practice/a7a1f124-c736-4730-9308-af2a41a6409d/scratchpad/home.txt` and `features.txt` (source copy to transcribe).
- Produces (types other tasks rely on exactly):

```typescript
export interface FaqEntry {
  question: string;
  answer: string;
}

export interface FeatureEntry {
  name: string;
  status: "Live";
  description: string;
  bullets: string[];
  faqs: FaqEntry[];
}

export interface FeatureCategory {
  id: string;          // e.g. "training", "ai-coach"
  label: string;        // e.g. "Training", "AI Coach"
  description: string;
  features: FeatureEntry[];
}

export interface NavLink {
  label: string;
  href: string;
}

export const siteContent: {
  brand: { name: string; tagline: string };
  nav: NavLink[];
  footerNav: NavLink[];
  landing: {
    heroWords: { word: string; tagline: string }[];
    heroHeadlineSuffix: string;
    painPoints: { quote: string; feature: string; description: string }[];
    comparison: { label: string; traditional: string; atp: string }[];
    howItWorks: { category: string; step: number; title: string; description: string; tag?: string }[];
    testimonial: { quote: string; name: string; title: string };
    finalCta: { heading: string; subhead: string };
  };
  featureCategories: FeatureCategory[];
  sports: { category: string; raceTypes: string[] }[];
  racePriorities: { tier: string; name: string; description: string }[];
  integrations: { name: string; description: string }[];
};
```

- [ ] **Step 1: Write the failing test asserting content shape and completeness**

```typescript
// content/site-content.test.ts
import { describe, it, expect } from "vitest";
import { siteContent } from "./site-content";

describe("siteContent", () => {
  it("has brand info", () => {
    expect(siteContent.brand.name).toBe("AiTrainingPlan");
  });

  it("has all 6 feature categories", () => {
    expect(siteContent.featureCategories).toHaveLength(6);
    const ids = siteContent.featureCategories.map((c) => c.id);
    expect(ids).toEqual([
      "training",
      "ai-coach",
      "nutrition",
      "health",
      "performance",
      "settings",
    ]);
  });

  it("has 34 total features across categories", () => {
    const total = siteContent.featureCategories.reduce(
      (sum, c) => sum + c.features.length,
      0
    );
    expect(total).toBe(34);
  });

  it("every feature has a non-empty description, at least one bullet, and at least one FAQ", () => {
    for (const category of siteContent.featureCategories) {
      for (const feature of category.features) {
        expect(feature.description.length).toBeGreaterThan(0);
        expect(feature.bullets.length).toBeGreaterThan(0);
        expect(feature.faqs.length).toBeGreaterThan(0);
        for (const faq of feature.faqs) {
          expect(faq.question.length).toBeGreaterThan(0);
          expect(faq.answer.length).toBeGreaterThan(0);
        }
      }
    }
  });

  it("has 5 sport categories and 4 race priority tiers", () => {
    expect(siteContent.sports).toHaveLength(5);
    expect(siteContent.racePriorities).toHaveLength(4);
  });

  it("has 5 integrations", () => {
    expect(siteContent.integrations).toHaveLength(5);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run content/site-content.test.ts`
Expected: FAIL — `site-content.ts` does not exist yet.

- [ ] **Step 3: Transcribe content into `content/site-content.ts`**

Read `/tmp/claude-1000/-home-cygnis-Practice/a7a1f124-c736-4730-9308-af2a41a6409d/scratchpad/home.txt` and `features.txt` in full. Populate every field of the `siteContent` object typed above with the verbatim copy from those files:
- `brand`: name `"AiTrainingPlan"`, tagline from the footer line "The world's most data-driven AI training coach. For professional athletes ... and wannabes."
- `nav` / `footerNav`: the header/footer links listed in the research (Features, Why ATP?, Calculators, FIT Tools, Nutrition, Alternatives, Guides, Compare, Privacy, Terms) — use the real `/features/`, `/how-its-different/`, etc. paths as `href` values, but note only `/` and `/features` will actually resolve in this dummy app (other links can point to `"#"` since those pages are out of scope — see Task 4 for how this is handled).
- `landing.heroWords`: all 7 rotating words (Personalized, Real-time, Multi-AI-led, Adaptive, Portable, Scientific, Versatile) with their exact taglines from the research report.
- `landing.painPoints`: all 10 quote/feature/description triples from the "Underwhelmed with your training app?" section.
- `landing.comparison`: all 5 rows from "How AiTrainingPlan Fixes This".
- `landing.howItWorks`: all 5 steps from "How The System Works".
- `landing.testimonial`: the Thomas Prommer quote, name, and title.
- `landing.finalCta`: heading "Ready to Train Smarter?" and the subhead.
- `featureCategories`: all 6 categories (`training`, `ai-coach`, `nutrition`, `health`, `performance`, `settings`) each with their `description` and every feature listed under them in `features.txt`, including every bullet and every FAQ question **and its full verbatim answer text** as found in `features.txt` (the research report only summarized FAQ questions — the actual answer bodies are in the raw file and must be transcribed in full, not paraphrased).
- `sports`: the 5 sport categories (Running, Cycling, Triathlon, HYROX, Spartan Race) with their race-type lists.
- `racePriorities`: the 4 tiers (A/B/C/D) with names and descriptions.
- `integrations`: the 5 integration cards (Strava, Garmin Connect, Intervals.icu, Zwift, Apple Health) with descriptions.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run content/site-content.test.ts`
Expected: PASS, all assertions green.

- [ ] **Step 5: Commit**

```bash
git add content/
git commit -m "Add structured site content transcribed from scraped pages"
```

---

### Task 3: Shared layout components (Header, Footer, WaitlistModal stub)

**Files:**
- Create: `components/Header.tsx`, `components/Footer.tsx`, `components/WaitlistModal.tsx`
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: `siteContent.brand`, `siteContent.nav`, `siteContent.footerNav` from Task 2.
- Produces: `<Header />`, `<Footer />`, `<WaitlistModal open, onClose />` components rendered in root layout, plus a `WaitlistModal` open/close pattern (`useState<boolean>`) that `ChatWidget` and page CTAs do NOT need to know about internally — each CTA button just needs an `onClick` prop wired to a shared open-state living in a small client wrapper.

- [ ] **Step 1: Create `components/WaitlistModal.tsx`**

```tsx
"use client";

interface WaitlistModalProps {
  open: boolean;
  onClose: () => void;
}

export default function WaitlistModal({ open, onClose }: WaitlistModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-[#010F31]">Join the Waitlist</h2>
        <p className="mt-1 text-sm text-[#5A6A8A]">
          Get notified when AiTrainingPlan launches.
        </p>
        <form
          className="mt-4 flex flex-col gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            onClose();
          }}
        >
          <label className="text-sm font-medium text-[#010F31]">
            Email *
            <input
              type="email"
              required
              className="mt-1 w-full rounded border border-[#E2E8F0] px-3 py-2"
            />
          </label>
          <label className="text-sm font-medium text-[#010F31]">
            Role
            <select className="mt-1 w-full rounded border border-[#E2E8F0] px-3 py-2">
              <option>Select your role...</option>
              <option>Pro Athlete</option>
              <option>Fitness Influencer</option>
              <option>Coach</option>
              <option>Amateur Athlete</option>
            </select>
          </label>
          <p className="text-xs text-[#5A6A8A]">
            By joining, you agree to our Privacy Policy.
          </p>
          <button
            type="submit"
            className="rounded bg-[#FF6B35] px-4 py-2 font-semibold text-white"
          >
            Join Waitlist
          </button>
        </form>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create `components/Header.tsx`**

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { siteContent } from "@/content/site-content";
import WaitlistModal from "./WaitlistModal";

export default function Header() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  return (
    <header className="flex items-center justify-between border-b border-[#E2E8F0] bg-white px-6 py-4">
      <Link href="/" className="text-lg font-bold text-[#010F31]">
        {siteContent.brand.name}
      </Link>
      <nav className="hidden gap-5 md:flex">
        {siteContent.nav.map((link) => (
          <Link
            key={link.label}
            href={link.href === "/" || link.href === "/features/" ? link.href.replace(/\/$/, "") || "/" : "#"}
            className="text-sm text-[#5A6A8A] hover:text-[#010F31]"
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <button
        onClick={() => setWaitlistOpen(true)}
        className="rounded bg-[#FF6B35] px-4 py-2 text-sm font-semibold text-white"
      >
        Join Waitlist
      </button>
      <WaitlistModal open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </header>
  );
}
```

- [ ] **Step 3: Create `components/Footer.tsx`**

```tsx
import Link from "next/link";
import { siteContent } from "@/content/site-content";

export default function Footer() {
  return (
    <footer className="border-t border-[#E2E8F0] bg-[#F8F6F1] px-6 py-8 text-sm text-[#5A6A8A]">
      <p className="max-w-md">{siteContent.brand.tagline}</p>
      <nav className="mt-4 flex flex-wrap gap-4">
        {siteContent.footerNav.map((link) => (
          <Link
            key={link.label}
            href={link.href === "/" || link.href === "/features/" ? link.href.replace(/\/$/, "") || "/" : "#"}
            className="hover:text-[#010F31]"
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <p className="mt-6">&copy; 2026 {siteContent.brand.name}</p>
    </footer>
  );
}
```

- [ ] **Step 4: Wire Header and Footer into `app/layout.tsx`**

Replace the body of `app/layout.tsx` with:

```tsx
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

export const metadata: Metadata = {
  title: "AI Training Plan — Your Personal AI Coach for Every Sport",
  description:
    "Stop guessing. AI Training Plan adapts your workouts in real time — training load, race-day fueling, and pace predictions all in one place. Free to start.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-[#F8F6F1] text-[#010F31]">
        <Header />
        {children}
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
```

Note: `ChatWidget` doesn't exist yet — it's created in Task 8. For now, stub it so the app builds:

- [ ] **Step 5: Create a placeholder `components/ChatWidget.tsx`**

```tsx
export default function ChatWidget() {
  return null;
}
```

- [ ] **Step 6: Verify the app builds and starter page still renders with header/footer**

Run: `npm run build`
Expected: exit code 0, no type errors.

- [ ] **Step 7: Commit**

```bash
git add components/ app/layout.tsx
git commit -m "Add shared Header, Footer, and WaitlistModal stub components"
```

---

### Task 4: Landing page

**Files:**
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `siteContent.landing`, `siteContent.featureCategories` (for the "34 Features" preview section) from Task 2; `WaitlistModal` pattern from Task 3.

- [ ] **Step 1: Replace `app/page.tsx` with the landing page composition**

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { siteContent } from "@/content/site-content";
import WaitlistModal from "@/components/WaitlistModal";

export default function Home() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const { landing, featureCategories } = siteContent;
  const totalFeatures = featureCategories.reduce((n, c) => n + c.features.length, 0);

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      {/* Hero */}
      <section className="py-12 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-[#FF6B35]">
          Now in Beta
        </p>
        <h1 className="mt-4 text-4xl font-bold md:text-5xl">
          {landing.heroWords[0].word} {landing.heroHeadlineSuffix}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-[#5A6A8A]">
          {landing.heroWords[0].tagline}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {landing.heroWords.map((w) => (
            <span
              key={w.word}
              className="rounded-full border border-[#E2E8F0] px-3 py-1 text-xs text-[#5A6A8A]"
              title={w.tagline}
            >
              {w.word}
            </span>
          ))}
        </div>
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => setWaitlistOpen(true)}
            className="rounded bg-[#FF6B35] px-6 py-3 font-semibold text-white"
          >
            Join the Waitlist
          </button>
          <a href="#how-it-works" className="rounded border border-[#E2E8F0] px-6 py-3 font-semibold">
            See how it works
          </a>
        </div>
      </section>

      {/* Pain points */}
      <section className="py-12">
        <h2 className="text-center text-3xl font-bold">
          Underwhelmed with your training app? That&apos;s what we thought.
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-[#5A6A8A]">
          Rich feature set addressing the shortcomings of Garmin, Strava, Runna, TrainingPeaks and the alike.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {landing.painPoints.map((p) => (
            <div key={p.feature} className="rounded-lg border border-[#E2E8F0] bg-white p-5">
              <p className="italic text-[#5A6A8A]">&ldquo;{p.quote}&rdquo;</p>
              <p className="mt-2 font-semibold">{p.feature}</p>
              <p className="mt-1 text-sm text-[#5A6A8A]">{p.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link href="/features" className="font-semibold text-[#FF6B35]">
            See all features →
          </Link>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-12">
        <h2 className="text-center text-3xl font-bold">How AiTrainingPlan Fixes This</h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-[#5A6A8A]">
          We built what existing tools refuse to: adaptive coaching that treats your data as the source of truth.
        </p>
        <div className="mt-8 space-y-4">
          {landing.comparison.map((row) => (
            <div key={row.label} className="grid gap-4 rounded-lg border border-[#E2E8F0] bg-white p-5 md:grid-cols-3">
              <p className="font-semibold">{row.label}</p>
              <p className="text-sm text-[#5A6A8A]">
                <span className="font-medium text-[#010F31]">Traditional:</span> {row.traditional}
              </p>
              <p className="text-sm text-[#5A6A8A]">
                <span className="font-medium text-[#FF6B35]">AiTrainingPlan:</span> {row.atp}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-12">
        <h2 className="text-center text-3xl font-bold">How The System Works</h2>
        <ol className="mt-8 space-y-4">
          {landing.howItWorks.map((step) => (
            <li key={step.step} className="rounded-lg border border-[#E2E8F0] bg-white p-5">
              <p className="text-xs font-semibold uppercase text-[#FF6B35]">
                {step.category} {step.tag ? `· ${step.tag}` : ""}
              </p>
              <p className="mt-1 font-semibold">
                Step {step.step}: {step.title}
              </p>
              <p className="mt-1 text-sm text-[#5A6A8A]">{step.description}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Feature catalog preview */}
      <section className="py-12">
        <h2 className="text-center text-3xl font-bold">{totalFeatures} Features. One Platform.</h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-[#5A6A8A]">
          Everything a serious endurance athlete needs — from AI coaching to injury prevention to race-day fueling.
        </p>
        <div className="mt-8 grid gap-3 md:grid-cols-3">
          {featureCategories.map((cat) => (
            <div key={cat.id} className="rounded-lg border border-[#E2E8F0] bg-white p-4">
              <p className="font-semibold">{cat.label}</p>
              <p className="mt-1 text-sm text-[#5A6A8A]">{cat.features.length} features</p>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link href="/features" className="font-semibold text-[#FF6B35]">
            Explore all features in detail →
          </Link>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-12 text-center">
        <p className="mx-auto max-w-2xl text-lg italic">&ldquo;{landing.testimonial.quote}&rdquo;</p>
        <p className="mt-4 font-semibold">{landing.testimonial.name}</p>
        <p className="text-sm text-[#5A6A8A]">{landing.testimonial.title}</p>
      </section>

      {/* Final CTA */}
      <section className="py-12 text-center">
        <h2 className="text-3xl font-bold">{landing.finalCta.heading}</h2>
        <p className="mt-2 text-[#5A6A8A]">{landing.finalCta.subhead}</p>
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={() => setWaitlistOpen(true)}
            className="rounded bg-[#FF6B35] px-6 py-3 font-semibold text-white"
          >
            Join the Waitlist
          </button>
        </div>
        <p className="mt-3 text-xs text-[#5A6A8A]">
          No credit card required. Sign in with Google.
        </p>
      </section>

      <WaitlistModal open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </main>
  );
}
```

Note: this references `landing.heroHeadlineSuffix`, which must be set in Task 2's content file to `"training planning."` (the tail of the hero headline after the rotating word).

- [ ] **Step 2: Verify it builds and the dev server renders the page**

Run: `npm run build`
Expected: exit code 0.

Run: `npm run dev` (in background/separate terminal), then fetch `http://localhost:3000/` and confirm the hero, pain points, comparison, how-it-works, feature preview, testimonial, and final CTA sections all render with real copy (not "undefined").

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "Build landing page from site content"
```

---

### Task 5: Features page

**Files:**
- Create: `components/FaqAccordion.tsx`
- Create: `app/features/page.tsx`

**Interfaces:**
- Consumes: `siteContent.featureCategories`, `siteContent.sports`, `siteContent.racePriorities`, `siteContent.integrations` from Task 2.
- Produces: `<FaqAccordion faqs={FaqEntry[]} />` reusable component.

- [ ] **Step 1: Create `components/FaqAccordion.tsx`**

```tsx
import { FaqEntry } from "@/content/site-content";

export default function FaqAccordion({ faqs }: { faqs: FaqEntry[] }) {
  return (
    <div className="mt-3 space-y-2">
      <p className="text-xs font-semibold text-[#5A6A8A]">
        Common questions ({faqs.length})
      </p>
      {faqs.map((faq) => (
        <details key={faq.question} className="rounded border border-[#E2E8F0] p-3">
          <summary className="cursor-pointer text-sm font-medium">{faq.question}</summary>
          <p className="mt-2 text-sm text-[#5A6A8A]">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Create `app/features/page.tsx`**

```tsx
import { siteContent } from "@/content/site-content";
import FaqAccordion from "@/components/FaqAccordion";

export const metadata = {
  title: "All Features — AiTrainingPlan",
  description:
    "Explore all 34 features of AiTrainingPlan: AI consensus coaching, training load monitoring, nutrition tracking, injury prevention, and more.",
};

export default function FeaturesPage() {
  const { featureCategories, sports, racePriorities, integrations } = siteContent;
  const totalFeatures = featureCategories.reduce((n, c) => n + c.features.length, 0);

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <section className="py-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-[#FF6B35]">
          {totalFeatures} Features. One Platform.
        </p>
        <h1 className="mt-4 text-4xl font-bold">Everything AiTrainingPlan Can Do</h1>
        <p className="mx-auto mt-2 max-w-2xl text-[#5A6A8A]">
          From AI consensus coaching to injury prevention — every tool a serious endurance athlete needs, in one place.
        </p>
      </section>

      {featureCategories.map((category) => (
        <section key={category.id} className="py-8">
          <h2 className="text-2xl font-bold">{category.label}</h2>
          <p className="mt-1 text-[#5A6A8A]">{category.description}</p>
          <div className="mt-6 space-y-6">
            {category.features.map((feature) => (
              <div key={feature.name} className="rounded-lg border border-[#E2E8F0] bg-white p-5">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{feature.name}</h3>
                  <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                    {feature.status}
                  </span>
                </div>
                <p className="mt-1 text-sm text-[#5A6A8A]">{feature.description}</p>
                <ul className="mt-2 list-inside list-disc text-sm text-[#5A6A8A]">
                  {feature.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <FaqAccordion faqs={feature.faqs} />
              </div>
            ))}
          </div>
        </section>
      ))}

      <section className="py-8">
        <h2 className="text-2xl font-bold">Supported Sports</h2>
        <p className="mt-1 text-[#5A6A8A]">
          Every sport gets its own training zones, race types, and periodization strategy.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {sports.map((s) => (
            <div key={s.category} className="rounded-lg border border-[#E2E8F0] bg-white p-4">
              <p className="font-semibold">{s.category}</p>
              <p className="mt-1 text-sm text-[#5A6A8A]">{s.raceTypes.join(", ")}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-8">
        <h2 className="text-2xl font-bold">Race Priority System</h2>
        <p className="mt-1 text-[#5A6A8A]">
          Not every race gets the same treatment. Assign priorities and your AI coach adjusts taper, intensity, and recovery accordingly.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {racePriorities.map((p) => (
            <div key={p.tier} className="rounded-lg border border-[#E2E8F0] bg-white p-4">
              <p className="font-semibold">
                {p.tier} — {p.name}
              </p>
              <p className="mt-1 text-sm text-[#5A6A8A]">{p.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-8">
        <h2 className="text-2xl font-bold">Integrations</h2>
        <p className="mt-1 text-[#5A6A8A]">
          Connect your existing tools. All data flows into one unified dashboard.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {integrations.map((i) => (
            <div key={i.name} className="rounded-lg border border-[#E2E8F0] bg-white p-4">
              <p className="font-semibold">{i.name}</p>
              <p className="mt-1 text-sm text-[#5A6A8A]">{i.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 text-center">
        <h2 className="text-3xl font-bold">Ready to Train Smarter?</h2>
        <p className="mt-2 text-[#5A6A8A]">
          {totalFeatures} features. Two AI coaches. One consensus plan built for you.
        </p>
      </section>
    </main>
  );
}
```

- [ ] **Step 3: Verify build and manual render**

Run: `npm run build`
Expected: exit code 0.

With `npm run dev` running, fetch `http://localhost:3000/features` and confirm all 6 categories, all features, FAQs (expandable), sports, race priorities, and integrations render with real copy.

- [ ] **Step 4: Commit**

```bash
git add components/FaqAccordion.tsx app/features/
git commit -m "Build features page from site content"
```

---

### Task 6: Gemini system prompt builder + client wrapper (core RAG logic)

**Files:**
- Create: `lib/gemini.ts`
- Test: `lib/gemini.test.ts`

**Interfaces:**
- Consumes: `siteContent` from Task 2.
- Produces (exact signatures later tasks rely on):

```typescript
export function buildSystemPrompt(): string;

export interface ChatMessage {
  role: "user" | "model";
  content: string;
}

export async function callGemini(
  history: ChatMessage[],
  apiKey: string
): Promise<string>;
```

`callGemini` throws on any Gemini SDK error; the API route (Task 7) is responsible for catching and converting to a friendly fallback.

- [ ] **Step 1: Write failing tests for `buildSystemPrompt`**

```typescript
// lib/gemini.test.ts
import { describe, it, expect, vi } from "vitest";
import { buildSystemPrompt } from "./gemini";
import { siteContent } from "@/content/site-content";

describe("buildSystemPrompt", () => {
  it("includes the brand name", () => {
    expect(buildSystemPrompt()).toContain(siteContent.brand.name);
  });

  it("includes every feature name so the bot can answer questions about any of them", () => {
    const prompt = buildSystemPrompt();
    for (const category of siteContent.featureCategories) {
      for (const feature of category.features) {
        expect(prompt).toContain(feature.name);
      }
    }
  });

  it("includes instructions to only answer from the provided content", () => {
    const prompt = buildSystemPrompt();
    expect(prompt.toLowerCase()).toContain("only");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run lib/gemini.test.ts`
Expected: FAIL — `lib/gemini.ts` does not exist.

- [ ] **Step 3: Implement `lib/gemini.ts`**

```typescript
import { GoogleGenAI } from "@google/genai";
import { siteContent } from "@/content/site-content";

export interface ChatMessage {
  role: "user" | "model";
  content: string;
}

function serializeContent(): string {
  const { brand, landing, featureCategories, sports, racePriorities, integrations } =
    siteContent;

  const featuresText = featureCategories
    .map((category) => {
      const featuresText = category.features
        .map((f) => {
          const bullets = f.bullets.map((b) => `  - ${b}`).join("\n");
          const faqs = f.faqs
            .map((faq) => `  Q: ${faq.question}\n  A: ${faq.answer}`)
            .join("\n");
          return `- ${f.name} (${f.status}): ${f.description}\n${bullets}\n${faqs}`;
        })
        .join("\n\n");
      return `## ${category.label}\n${category.description}\n\n${featuresText}`;
    })
    .join("\n\n");

  const sportsText = sports
    .map((s) => `- ${s.category}: ${s.raceTypes.join(", ")}`)
    .join("\n");

  const prioritiesText = racePriorities
    .map((p) => `- ${p.tier} (${p.name}): ${p.description}`)
    .join("\n");

  const integrationsText = integrations
    .map((i) => `- ${i.name}: ${i.description}`)
    .join("\n");

  return `
# ${brand.name}
${brand.tagline}

# Landing Page Content
Hero angles: ${landing.heroWords.map((w) => `${w.word} (${w.tagline})`).join("; ")}
Pain points addressed: ${landing.painPoints
    .map((p) => `"${p.quote}" -> ${p.feature}: ${p.description}`)
    .join("; ")}
How it compares: ${landing.comparison
    .map((c) => `${c.label} - Traditional: ${c.traditional} | AiTrainingPlan: ${c.atp}`)
    .join("; ")}
How the system works: ${landing.howItWorks
    .map((s) => `Step ${s.step} (${s.category}): ${s.title} - ${s.description}`)
    .join("; ")}
Testimonial: "${landing.testimonial.quote}" - ${landing.testimonial.name}, ${landing.testimonial.title}

# Full Feature Catalog
${featuresText}

# Supported Sports
${sportsText}

# Race Priority System
${prioritiesText}

# Integrations
${integrationsText}
`.trim();
}

export function buildSystemPrompt(): string {
  return `You are the AI Training Plan website assistant. Answer visitor questions using ONLY the information below, which describes the AiTrainingPlan product and its website content. If a question cannot be answered from this content, say plainly that you don't have that information rather than guessing or inventing details. Be concise and friendly.

${serializeContent()}`;
}

export async function callGemini(
  history: ChatMessage[],
  apiKey: string
): Promise<string> {
  const ai = new GoogleGenAI({ apiKey });

  const contents = history.map((m) => ({
    role: m.role,
    parts: [{ text: m.content }],
  }));

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents,
    config: {
      systemInstruction: buildSystemPrompt(),
    },
  });

  const text = response.text;
  if (!text) {
    throw new Error("Gemini returned an empty response");
  }
  return text;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run lib/gemini.test.ts`
Expected: PASS, all assertions green.

- [ ] **Step 5: Commit**

```bash
git add lib/gemini.ts lib/gemini.test.ts
git commit -m "Add Gemini system prompt builder and client wrapper"
```

---

### Task 7: Chat API route

**Files:**
- Create: `app/api/chat/route.ts`
- Test: `app/api/chat/route.test.ts`

**Interfaces:**
- Consumes: `callGemini`, `ChatMessage` from `lib/gemini.ts` (Task 6).
- Produces: `POST /api/chat` accepting `{ messages: ChatMessage[] }`, responding `200 { reply: string }` on success or `200 { reply: string, error: true }` with a friendly fallback message on any Gemini failure (kept as `200` so the widget can render it as a normal assistant bubble instead of handling a separate error UI state).

- [ ] **Step 1: Write a failing test for the route's error-fallback behavior**

Extract the fallback logic into a small pure function so it's testable without hitting the network or mocking `next/server` request internals:

```typescript
// app/api/chat/route.test.ts
import { describe, it, expect } from "vitest";
import { buildErrorReply } from "./route";

describe("buildErrorReply", () => {
  it("returns a friendly, non-technical fallback message", () => {
    const reply = buildErrorReply(new Error("quota exceeded"));
    expect(reply).toMatch(/trouble|unable|try again/i);
    expect(reply).not.toContain("quota exceeded");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run app/api/chat/route.test.ts`
Expected: FAIL — `route.ts` does not exist / `buildErrorReply` not exported.

- [ ] **Step 3: Implement `app/api/chat/route.ts`**

```typescript
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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run app/api/chat/route.test.ts`
Expected: PASS.

- [ ] **Step 5: Add `.env.local.example` documenting the required env var**

```
GEMINI_API_KEY=your-gemini-api-key-here
```

Create this as `.env.local.example` (committed) — the real `.env.local` (gitignored by the Next.js scaffold by default) is where the actual key goes locally.

- [ ] **Step 6: Commit**

```bash
git add app/api/chat/ .env.local.example
git commit -m "Add /api/chat route with Gemini integration and error fallback"
```

---

### Task 8: Chat widget UI with sessionStorage persistence

**Files:**
- Create: `lib/chatHistory.ts`
- Test: `lib/chatHistory.test.ts`
- Modify: `components/ChatWidget.tsx` (replace the Task 3 placeholder)

**Interfaces:**
- Consumes: `ChatMessage` type from `lib/gemini.ts` (Task 6); `POST /api/chat` from Task 7.
- Produces (exact signatures):

```typescript
export const CHAT_HISTORY_KEY = "atp-chat-history";
export function loadHistory(storage: Storage): ChatMessage[];
export function saveHistory(storage: Storage, history: ChatMessage[]): void;
```

`loadHistory`/`saveHistory` take a `Storage` argument (rather than reading `window.sessionStorage` directly) so they're unit-testable with an in-memory fake, and reusable if the storage strategy ever changes.

- [ ] **Step 1: Write failing tests for `lib/chatHistory.ts`**

```typescript
// lib/chatHistory.test.ts
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run lib/chatHistory.test.ts`
Expected: FAIL — `lib/chatHistory.ts` does not exist.

- [ ] **Step 3: Implement `lib/chatHistory.ts`**

```typescript
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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run lib/chatHistory.test.ts`
Expected: PASS.

- [ ] **Step 5: Implement `components/ChatWidget.tsx`**

```tsx
"use client";

import { useEffect, useState } from "react";
import { ChatMessage } from "@/lib/gemini";
import { loadHistory, saveHistory } from "@/lib/chatHistory";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMessages(loadHistory(window.sessionStorage));
  }, []);

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
```

- [ ] **Step 6: Run the full test suite**

Run: `npm run test`
Expected: all tests across `content/`, `lib/`, `app/api/chat/` PASS.

- [ ] **Step 7: Verify build**

Run: `npm run build`
Expected: exit code 0.

- [ ] **Step 8: Commit**

```bash
git add lib/chatHistory.ts lib/chatHistory.test.ts components/ChatWidget.tsx
git commit -m "Add chat widget UI with sessionStorage-backed conversation history"
```

---

### Task 9: End-to-end manual verification

**Files:** none (verification only)

**Interfaces:** N/A

- [ ] **Step 1: Set a real Gemini API key locally**

Copy `.env.local.example` to `.env.local` and set `GEMINI_API_KEY` to a real free-tier key.

- [ ] **Step 2: Start the dev server**

Run: `npm run dev`

- [ ] **Step 3: Verify landing page content**

Load `http://localhost:3000/` — confirm hero, pain points, comparison, how-it-works, feature preview, testimonial, and final CTA all show real (non-placeholder) copy.

- [ ] **Step 4: Verify features page content**

Load `http://localhost:3000/features` — confirm all 6 categories and all features render, FAQ `<details>` expand/collapse, sports/priorities/integrations sections render.

- [ ] **Step 5: Verify chatbot answers from site content**

Open the chat widget and ask a question clearly answerable from the site content, e.g. "What sports does AiTrainingPlan support?" or "What does the ACWR Injury Scoring feature do?". Confirm the reply is accurate and matches `content/site-content.ts`.

- [ ] **Step 6: Verify graceful "I don't know" behavior**

Ask a question with no answer in the site content, e.g. "What's the weather today?" or "How much does the paid plan cost per month?" (pricing isn't in the scraped content). Confirm the bot says it doesn't have that information rather than fabricating an answer.

- [ ] **Step 7: Verify chat persistence across navigation**

With an active conversation in the widget, navigate from `/` to `/features` (or reload the page). Confirm the conversation is still present.

- [ ] **Step 8: Verify error fallback**

Temporarily set `GEMINI_API_KEY` to an invalid value in `.env.local`, restart the dev server, send a chat message, confirm the widget shows the friendly fallback message (not a crash or raw error). Restore the real key afterward.

- [ ] **Step 9: Commit any fixes found during verification**

If any issues were found and fixed during this task, commit them with a descriptive message per fix.

---

## Self-Review Notes

- **Spec coverage:** content data layer (Task 2), pages (Tasks 4-5), chat widget UI + persistence (Task 8), API route + Gemini integration (Tasks 6-7), error handling (Task 7), manual E2E verification (Task 9) — all spec sections have a corresponding task.
- **Type consistency:** `ChatMessage` is defined once in `lib/gemini.ts` (Task 6) and imported by `lib/chatHistory.ts` (Task 8), `app/api/chat/route.ts` (Task 7), and `components/ChatWidget.tsx` (Task 8) — no redefinition.
- **No placeholders:** Task 2's content transcription step points to exact source files and exact fields rather than "TBD"; all other tasks contain complete, runnable code.
