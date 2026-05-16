import {
  BrainCircuit,
  FileSearch,
  ImageUp,
  Languages,
  Link2,
  MessageSquareWarning,
  Mic2,
  ShieldCheck,
} from "lucide-react";
import type { AnalysisResult, FeatureItem } from "@/types/analysis";

export const analysisResult: AnalysisResult = {
  verdict: "Misleading",
  confidence: 87,
  riskLevel: "High",
  explanation:
    "This claim appears suspicious because it uses emotional language, lacks official sources, and resembles previously debunked viral messages.",
  sources: ["PIB Fact Check", "Alt News", "BOOM Live", "Factly"],
};

export const sampleClaim =
  "Forwarded message claims a new government scheme gives instant cash benefits if citizens register through an unknown link today.";

export const features: FeatureItem[] = [
  {
    icon: FileSearch,
    title: "Text-Based Fake News Detection",
    body: "Analyze suspicious forwards, headlines, and local claims for credibility signals.",
  },
  {
    icon: ImageUp,
    title: "Screenshot/Image Verification",
    body: "Upload WhatsApp screenshots, social posts, and edited news cards for review.",
  },
  {
    icon: Link2,
    title: "Fact-Check Source Matching",
    body: "Surface trusted references from PIB Fact Check, Alt News, BOOM Live, and Factly.",
  },
  {
    icon: Languages,
    title: "Regional Language Support",
    body: "Supports Marathi, Hindi, and English, with more Indian languages on the roadmap.",
  },
  {
    icon: BrainCircuit,
    title: "AI Explanation System",
    body: "Show why a claim looks suspicious instead of only returning a label.",
  },
  {
    icon: MessageSquareWarning,
    title: "WhatsApp Forward Risk Score",
    body: "Highlight panic language, missing sources, and viral message patterns.",
  },
  {
    icon: ShieldCheck,
    title: "Government Scheme Verification",
    body: "Check jobs, exams, schemes, and public notices for authenticity signals.",
  },
  {
    icon: Mic2,
    title: "Voice Note Verification",
    body: "Analyze speech-to-text transcripts from audio claims and forwarded voice notes.",
  },
];

export const steps = [
  "Select language",
  "Paste text or upload screenshot",
  "AI detects language and claim pattern",
  "Credibility analysis runs",
  "Verdict, score, explanation, and references appear",
];

export const impact = [
  "Supports underserved regional languages",
  "Designed for WhatsApp-forward verification",
  "Explains why a claim is suspicious",
  "Built for real-world social impact",
];
