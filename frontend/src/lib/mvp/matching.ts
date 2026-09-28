import { SKILL_TAXONOMY } from "./taxonomy";

export function extractSkills(text: string): string[] {
  const t = (text || "").toLowerCase();
  const found = new Set<string>();

  for (const skill of SKILL_TAXONOMY) {
    for (const a of skill.aliases) {
      const rx = new RegExp(`\\b${escapeRegExp(a.toLowerCase())}\\b`, "i");
      if (rx.test(t)) found.add(skill.key);
    }
  }
  return Array.from(found);
}

export function matchScore(opSkills: string[], studentSkills: string[]) {
  const need = new Set(opSkills.map((s) => s.toLowerCase()));
  const have = new Set(studentSkills.map((s) => s.toLowerCase()));

  const matched: string[] = [];
  const missing: string[] = [];

  need.forEach((s) => (have.has(s) ? matched.push(s) : missing.push(s)));

  const score = need.size === 0 ? 0 : Math.round((matched.length / need.size) * 100);
  return { score, matched, missing };
}

function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}