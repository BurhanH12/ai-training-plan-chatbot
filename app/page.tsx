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
