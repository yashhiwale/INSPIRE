export const SKILL_TAXONOMY: { key: string; aliases: string[] }[] = [
  { key: "react", aliases: ["react", "reactjs"] },
  { key: "typescript", aliases: ["typescript", "ts"] },
  { key: "javascript", aliases: ["javascript", "js"] },
  { key: "node", aliases: ["node", "nodejs"] },
  { key: "api", aliases: ["rest", "rest api", "apis", "backend api"] },
  { key: "git", aliases: ["git", "github", "gitlab"] },
  { key: "sql", aliases: ["sql", "postgres", "mysql"] },
  { key: "database", aliases: ["database", "db", "mongodb"] },
  { key: "python", aliases: ["python"] },
  { key: "ml", aliases: ["machine learning", "ml"] },
  { key: "wiring", aliases: ["wiring", "cabling"] },
  { key: "electrical_safety", aliases: ["safety", "electrical safety", "sop"] },
  { key: "troubleshooting", aliases: ["troubleshoot", "troubleshooting", "diagnosis"] },
];

export function normalizeSkill(s: string) {
  return s.trim().toLowerCase().replace(/\s+/g, "_");
}