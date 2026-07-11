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
