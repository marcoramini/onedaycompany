import type { AssetBrief } from "./contracts";

export type VisualDirection = {
  palette: { primary: string; secondary: string; surface: string; ink: string };
  fontFamily: "system-sans";
  styleDescription: string;
};

const palettes = [
  { primary: "#6d28d9", secondary: "#4338ca", surface: "#f5f3ff", ink: "#111827" },
  { primary: "#0f766e", secondary: "#0369a1", surface: "#f0fdfa", ink: "#0f172a" },
  { primary: "#be123c", secondary: "#c2410c", surface: "#fff7ed", ink: "#1c1917" },
] as const;

export function proposeVisualDirection(brief: AssetBrief): VisualDirection {
  const seed = Array.from(brief.companyContext.name).reduce((total, character) => total + character.charCodeAt(0), 0);
  return {
    palette: palettes[seed % palettes.length],
    fontFamily: "system-sans",
    styleDescription: "Clear, contemporary and approachable with restrained geometric accents.",
  };
}
