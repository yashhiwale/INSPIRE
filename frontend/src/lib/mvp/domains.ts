export const DIMENSIONS = [
  "analytical_thinking",
  "numerical_ability",
  "scientific_thinking",
  "spatial_mechanical",
  "problem_solving",
  "learning",
  "creativity",
  "design",
  "communication",
  "media",
  "social_interaction",
  "empathy",
  "leadership",
  "teamwork",
  "independence",
  "practical_interest",
  "technology_adoption",
  "organization",
  "entrepreneurship",
  "outdoor_activity",
] as const;

export type DimensionKey = (typeof DIMENSIONS)[number];

export const DOMAINS = [
  "Technology & Computing",
  "Engineering & Manufacturing",
  "Science & Research",
  "Healthcare",
  "Agriculture",
  "Skilled Trades & Vocational",
  "Business & Entrepreneurship",
  "Finance",
  "Law & Public Service",
  "Creative Industries",
  "Media & Communication",
  "Education & Social Services",
  "Environment & Renewable Energy",
  "Sports",
  "Traditional Crafts & Local Skills",
] as const;

export type DomainKey = (typeof DOMAINS)[number];

// Very simple expert mapping (MVP)
export const DOMAIN_WEIGHTS: Record<DomainKey, Partial<Record<DimensionKey, number>>> = {
  "Technology & Computing": {
    analytical_thinking: 1.2,
    problem_solving: 1.2,
    technology_adoption: 1.3,
    numerical_ability: 0.8,
    learning: 0.8,
  },
  "Engineering & Manufacturing": {
    spatial_mechanical: 1.2,
    problem_solving: 1.0,
    numerical_ability: 0.9,
    practical_interest: 1.0,
    organization: 0.7,
  },
  "Science & Research": {
    scientific_thinking: 1.3,
    analytical_thinking: 1.0,
    learning: 0.9,
    numerical_ability: 0.7,
  },
  Healthcare: { empathy: 1.0, communication: 0.9, learning: 0.8, organization: 0.7 },
  Agriculture: { practical_interest: 0.9, outdoor_activity: 0.9, organization: 0.6, learning: 0.6 },
  "Skilled Trades & Vocational": { spatial_mechanical: 1.3, practical_interest: 1.2, problem_solving: 0.8 },
  "Business & Entrepreneurship": { entrepreneurship: 1.3, leadership: 0.9, communication: 0.9, organization: 0.8 },
  Finance: { numerical_ability: 1.2, analytical_thinking: 1.0, organization: 0.8 },
  "Law & Public Service": { communication: 1.0, leadership: 0.8, empathy: 0.7, organization: 0.7 },
  "Creative Industries": { creativity: 1.3, design: 1.0, media: 0.8 },
  "Media & Communication": { media: 1.3, communication: 1.1, social_interaction: 0.8 },
  "Education & Social Services": { empathy: 1.0, communication: 0.9, leadership: 0.7, learning: 0.7 },
  "Environment & Renewable Energy": { scientific_thinking: 0.9, practical_interest: 0.9, outdoor_activity: 0.7, learning: 0.6 },
  Sports: { teamwork: 0.9, leadership: 0.8, outdoor_activity: 1.0, independence: 0.7 },
  "Traditional Crafts & Local Skills": { practical_interest: 1.0, creativity: 0.8, design: 0.7, outdoor_activity: 0.5 },
};

export function computeDomainAffinities(dimensions: Record<string, number>) {
  const results = (DOMAINS as readonly DomainKey[]).map((d) => {
    const w = DOMAIN_WEIGHTS[d];
    let score = 0;
    let totalW = 0;

    Object.entries(w).forEach(([k, weight]) => {
      const v = dimensions[k] ?? 0;
      score += v * (weight ?? 0);
      totalW += weight ?? 0;
    });

    const normalized = totalW === 0 ? 0 : Math.round(score / totalW);

    // "Why" = top 3 contributing dimensions
    const contributions = Object.entries(w)
      .map(([k, weight]) => ({ k, val: (dimensions[k] ?? 0) * (weight ?? 0) }))
      .sort((a, b) => b.val - a.val)
      .slice(0, 3)
      .map((x) => prettyDim(x.k));

    return { domain: d, score: normalized, why: contributions };
  });

  return results.sort((a, b) => b.score - a.score);
}

function prettyDim(k: string) {
  return k.replace(/_/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
}