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
