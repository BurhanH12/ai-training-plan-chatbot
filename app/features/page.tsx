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
