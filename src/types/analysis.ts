import type { LucideIcon } from "lucide-react";

export type AnalysisResult = {
  verdict: string;
  confidence: number;
  riskLevel: string;
  explanation: string;
  sources: string[];
};

export type FeatureItem = {
  icon: LucideIcon;
  title: string;
  body: string;
};
