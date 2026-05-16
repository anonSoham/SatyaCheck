import {
  AlertTriangle,
  BadgeCheck,
  BrainCircuit,
  MousePointer2,
  SearchCheck,
  ShieldAlert,
  ShieldCheck,
  UploadCloud,
} from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { GlassButton } from "@/components/ui/glass-button";
import { analysisResult, features, impact, sampleClaim, steps } from "@/data/site-content";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import type { AnalysisResult, FeatureItem } from "@/types/analysis";

type Particle = {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  twinkle: number;
  tone: "white" | "blue";
};

function scrollToSection(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
}

function ParticleHeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouse = useRef({ x: -9999, y: -9999, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let animationId = 0;
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const createParticles = () => {
      const density = window.innerWidth < 640 ? 72 : window.innerWidth < 1024 ? 108 : 154;
      const total = prefersReducedMotion ? Math.floor(density * 0.45) : density;

      particles = Array.from({ length: total }, () => {
        const x = Math.random() * width;
        const y = Math.random() * height;
        return {
          x,
          y,
          baseX: x,
          baseY: y,
          vx: 0,
          vy: 0,
          size: Math.random() * 2.4 + 0.55,
          alpha: Math.random() * 0.5 + 0.22,
          twinkle: Math.random() * Math.PI * 2,
          tone: Math.random() > 0.82 ? "blue" : "white",
        };
      });
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      createParticles();
    };

    const drawConnections = () => {
      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.hypot(dx, dy);

          if (distance < 132) {
            const lineAlpha = 0.085 * (1 - distance / 132);
            context.strokeStyle =
              a.tone === "blue" || b.tone === "blue"
                ? `rgba(37, 99, 235, ${lineAlpha + 0.035})`
                : `rgba(56, 189, 248, ${lineAlpha})`;
            context.lineWidth = 0.65;
            context.beginPath();
            context.moveTo(a.x, a.y);
            context.lineTo(b.x, b.y);
            context.stroke();
          }
        }
      }
    };

    const render = () => {
      context.clearRect(0, 0, width, height);

      const glow = context.createRadialGradient(width * 0.5, height * 0.42, 0, width * 0.5, height * 0.42, width * 0.58);
      glow.addColorStop(0, "rgba(29, 78, 216, 0.23)");
      glow.addColorStop(0.44, "rgba(14, 165, 233, 0.075)");
      glow.addColorStop(1, "rgba(2, 6, 23, 0)");
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);

      for (const particle of particles) {
        const dxMouse = particle.x - mouse.current.x;
        const dyMouse = particle.y - mouse.current.y;
        const distance = Math.hypot(dxMouse, dyMouse);
        const radius = mouse.current.active ? 190 : 0;

        if (distance < radius) {
          const force = (radius - distance) / radius;
          const angle = Math.atan2(dyMouse, dxMouse);
          particle.vx += Math.cos(angle) * force * 2.1;
          particle.vy += Math.sin(angle) * force * 2.1;
        }

        particle.vx += (particle.baseX - particle.x) * 0.012;
        particle.vy += (particle.baseY - particle.y) * 0.012;
        particle.vx *= 0.89;
        particle.vy *= 0.89;
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.twinkle += 0.025;
      }

      drawConnections();

      for (const particle of particles) {
        const shimmer = (Math.sin(particle.twinkle) + 1) * 0.2;
        if (particle.tone === "blue") {
          context.fillStyle = `rgba(30, 64, 175, ${Math.min(1, particle.alpha + shimmer + 0.22)})`;
          context.shadowColor = "rgba(37, 99, 235, 1)";
          context.shadowBlur = 26;
        } else {
          context.fillStyle = `rgba(226, 246, 255, ${particle.alpha + shimmer})`;
          context.shadowColor = "rgba(56, 189, 248, 0.72)";
          context.shadowBlur = 13;
        }
        context.beginPath();
        context.arc(
          particle.x,
          particle.y,
          particle.tone === "blue" ? particle.size * 1.45 : particle.size,
          0,
          Math.PI * 2,
        );
        context.fill();
      }

      context.shadowBlur = 0;
      animationId = window.requestAnimationFrame(render);
    };

    const onPointerMove = (event: PointerEvent) => {
      mouse.current = {
        x: event.clientX,
        y: event.clientY,
        active: true,
      };
    };

    const onPointerLeave = () => {
      mouse.current.active = false;
      mouse.current.x = -9999;
      mouse.current.y = -9999;
    };

    resize();
    render();

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerleave", onPointerLeave);

    return () => {
      window.cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-black">
      <div className="absolute left-1/2 top-14 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-500/20 blur-3xl animate-soft-pulse sm:h-[42rem] sm:w-[42rem]" />
      <div className="absolute -bottom-44 left-1/2 h-[34rem] w-[56rem] -translate-x-1/2 rounded-full bg-blue-950/25 blur-3xl" />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.14)_48%,rgba(0,0,0,0.88)_100%)]" />
    </div>
  );
}

function Navbar() {
  const links = [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
  ];

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-3xl border border-white/10 bg-black/35 px-3 py-2.5 shadow-2xl shadow-blue-950/20 backdrop-blur-2xl sm:rounded-full sm:px-5 sm:py-3">
        <a href="#top" className="flex items-center gap-2" aria-label="SatyaCheck home">
          <span className="relative grid h-8 w-8 shrink-0 place-items-center rounded-full border border-cyan-300/30 bg-cyan-400/10 text-cyan-200 shadow-glow sm:h-9 sm:w-9">
            <ShieldAlert className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="text-sm font-semibold tracking-tight text-white sm:text-base">SatyaCheck</span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium tracking-tight text-slate-300 transition hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <GlassButton
          type="button"
          size="sm"
          onClick={() => scrollToSection("#demo")}
          contentClassName="flex items-center gap-1.5 sm:gap-2"
        >
          <ShieldCheck className="h-4 w-4" aria-hidden="true" />
          <span>Verify</span>
          <span className="hidden min-[380px]:inline">Claim</span>
        </GlassButton>
      </nav>
    </header>
  );
}

function HeroSection() {
  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden px-4 pb-24 pt-28 sm:px-6 sm:py-36 lg:px-8 lg:py-40">
      <div className="relative z-10 mx-auto flex w-full max-w-[78rem] flex-col items-center pt-12 text-center sm:pt-16 lg:pt-12">
        <div className="max-w-[76rem]">
          <h1 className="font-display text-[clamp(2.35rem,10vw,3.55rem)] font-semibold leading-[0.98] tracking-[-0.025em] text-white text-balance sm:text-[clamp(2.85rem,6vw,4.8rem)] lg:text-[clamp(3.8rem,6.7vw,6.9rem)]">
            Detect{" "}
            <span className="bg-gradient-to-r from-cyan-100 via-sky-300 to-blue-500 bg-clip-text text-transparent">
              Fake News
            </span>{" "}
            in Indian{" "}
            <span className="bg-gradient-to-r from-white via-cyan-100 to-blue-400 bg-clip-text text-transparent">
              Regional Languages
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-[45rem] text-base leading-7 text-slate-300/90 sm:mt-8 sm:text-lg sm:leading-8">
            Verify suspicious WhatsApp forwards, screenshots, social media posts, and local-language claims using AI-powered credibility analysis.
          </p>

          <div className="mt-8 flex justify-center sm:mt-11">
            <a
              href="#features"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 font-sans text-sm font-semibold tracking-tight text-white backdrop-blur transition hover:-translate-y-0.5 hover:border-cyan-200/50 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-black"
            >
              View Features
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function DemoAnalyzer() {
  const [language, setLanguage] = useState("Marathi");
  const [claim, setClaim] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!claim.trim()) {
      setResult(null);
      setError("Paste a claim before running the analysis.");
      return;
    }

    setError("");
    setResult(analysisResult);
  };

  return (
    <section id="demo" className="relative px-4 pb-16 pt-8 sm:px-6 sm:pb-24 sm:pt-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          title="Analyze a suspicious claim"
          body="Paste a message, headline, or local claim to review its credibility signals."
        />

        <div className="mt-8 grid gap-5 sm:mt-12 sm:gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <form onSubmit={handleSubmit} className="glass-panel reveal-on-scroll rounded-3xl p-4 sm:rounded-[2rem] sm:p-7" data-reveal>
            <div className="grid gap-5">
              <label className="grid gap-2">
                <span className="text-sm font-medium text-slate-200">Language</span>
                <select
                  value={language}
                  onChange={(event) => setLanguage(event.target.value)}
                  className="rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/30"
                >
                  <option>Marathi</option>
                  <option>Hindi</option>
                  <option>English</option>
                </select>
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-medium text-slate-200">Suspicious claim</span>
                <textarea
                  value={claim}
                  onChange={(event) => setClaim(event.target.value)}
                  rows={8}
                  placeholder="Paste suspicious news, WhatsApp forward, or claim here..."
                  className="min-h-44 resize-none rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-4 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/30 sm:min-h-52"
                />
              </label>

              <button
                type="button"
                onClick={() => {
                  setClaim(sampleClaim);
                  setError("");
                }}
                className="w-fit rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-200/40 hover:text-white"
              >
                Use sample claim
              </button>

              <div className="rounded-2xl border border-dashed border-cyan-200/25 bg-cyan-300/[0.04] p-4 sm:p-5">
                <div className="flex items-start gap-3 sm:items-center">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-cyan-300/10 text-cyan-100 sm:h-11 sm:w-11">
                    <UploadCloud className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-medium text-white">Screenshot upload UI</p>
                    <p className="text-sm text-slate-400">Upload screenshots from WhatsApp, social media, or news cards.</p>
                  </div>
                </div>
              </div>

              {error ? (
                <p role="alert" className="rounded-2xl border border-red-300/20 bg-red-500/10 px-4 py-3 text-sm text-red-100">
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-200 to-blue-500 px-5 py-4 text-sm font-semibold text-slate-950 shadow-glow transition hover:-translate-y-0.5 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-black"
              >
                <SearchCheck className="h-5 w-5" aria-hidden="true" />
                Analyze Claim
              </button>
            </div>
          </form>

          <ResultPanel result={result} language={language} />
        </div>
      </div>
    </section>
  );
}

function ResultPanel({ result, language }: { result: AnalysisResult | null; language: string }) {
  if (!result) {
    return (
      <div className="glass-panel reveal-on-scroll grid min-h-[24rem] place-items-center rounded-3xl p-5 text-center sm:min-h-[32rem] sm:rounded-[2rem] sm:p-7" data-reveal>
        <div className="max-w-sm">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-3xl border border-cyan-200/20 bg-cyan-300/10 text-cyan-100">
            <MousePointer2 className="h-7 w-7" aria-hidden="true" />
          </span>
          <h3 className="mt-5 text-xl font-semibold tracking-tight text-white">Result appears here</h3>
          <p className="mt-3 text-slate-400">
            Add a claim and click analyze to preview verdict, confidence, risk level, explanation, and sources.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel min-h-[24rem] rounded-3xl p-4 animate-fade-up sm:min-h-[32rem] sm:rounded-[2rem] sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm text-slate-400">Detected language</p>
          <p className="text-xl font-semibold tracking-tight text-white">{language}</p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-amber-200/30 bg-amber-400/15 px-4 py-2 text-sm font-semibold text-amber-100">
          <AlertTriangle className="h-4 w-4" aria-hidden="true" />
          {result.verdict}
        </span>
      </div>

      <div className="mt-6 grid gap-3 sm:mt-7 sm:grid-cols-2 sm:gap-4">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 sm:p-5">
          <p className="text-sm text-slate-400">Confidence</p>
          <div className="mt-3 flex items-end gap-2">
            <span className="text-4xl font-semibold tracking-tight text-white">{result.confidence}</span>
            <span className="pb-2 text-xl text-cyan-200">%</span>
          </div>
          <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-200 to-blue-500"
              style={{ width: `${result.confidence}%` }}
            />
          </div>
        </div>

        <div className="rounded-3xl border border-red-200/10 bg-red-500/[0.06] p-4 sm:p-5">
          <p className="text-sm text-slate-400">Risk Level</p>
          <p className="mt-3 text-4xl font-semibold tracking-tight text-red-100">{result.riskLevel}</p>
          <p className="mt-4 text-sm text-slate-400">Urgent forwarding and missing sources increase the risk score.</p>
        </div>
      </div>

      <div className="mt-4 rounded-3xl border border-cyan-200/10 bg-cyan-300/[0.06] p-4 sm:p-5">
        <div className="flex items-center gap-2 text-cyan-100">
          <BrainCircuit className="h-5 w-5" aria-hidden="true" />
          <h3 className="font-semibold">AI Explanation</h3>
        </div>
        <p className="mt-3 leading-7 text-slate-300">{result.explanation}</p>
      </div>

      <div className="mt-5">
        <p className="mb-3 text-sm font-medium text-slate-300">Trusted source references</p>
        <div className="flex flex-wrap gap-2">
          {result.sources.map((source) => (
            <span
              key={source}
              className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-slate-200 sm:px-4"
            >
              {source}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, body }: FeatureItem) {
  return (
    <article className="group glass-panel reveal-on-scroll rounded-3xl p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-200/35 hover:shadow-glow sm:p-6" data-reveal>
      <span className="grid h-12 w-12 place-items-center rounded-2xl border border-cyan-200/20 bg-cyan-300/10 text-cyan-100 transition group-hover:scale-105">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>
      <h3 className="mt-5 text-lg font-semibold leading-7 tracking-tight text-white">{title}</h3>
      <p className="mt-3 leading-7 text-slate-400">{body}</p>
    </article>
  );
}

function FeaturesSection() {
  return (
    <section id="features" className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          title="Built around real misinformation workflows"
          body="Review text, screenshots, source credibility, regional language signals, and explanation quality in one flow."
        />
        <div className="mt-8 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="relative px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="absolute inset-x-0 top-1/2 -z-10 h-px bg-gradient-to-r from-transparent via-cyan-300/25 to-transparent" />
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          title="Five clear steps from claim to verdict"
          body="A simple verification flow that keeps the result understandable and easy to act on."
        />
        <div className="mt-8 grid gap-4 sm:mt-12 md:grid-cols-5">
          {steps.map((step, index) => (
            <article
              key={step}
              className="glass-panel reveal-on-scroll relative rounded-3xl p-5 transition hover:-translate-y-1 hover:border-cyan-200/35"
              data-reveal
            >
              <GlassButton
                type="button"
                size="icon"
                aria-label={`Step ${index + 1}`}
                contentClassName="text-sm font-semibold"
              >
                {index + 1}
              </GlassButton>
              <h3 className="mt-5 text-base font-semibold leading-6 tracking-tight text-white">{step}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ImpactSection() {
  return (
    <section id="future-scope" className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="reveal-on-scroll mx-auto max-w-7xl overflow-hidden rounded-3xl border border-cyan-200/15 bg-gradient-to-br from-cyan-300/12 via-blue-500/10 to-white/[0.03] p-5 shadow-card sm:rounded-[2.5rem] sm:p-10 lg:p-12" data-reveal>
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <h2 className="font-display text-[clamp(2.25rem,4.4vw,4.25rem)] font-semibold leading-[1] tracking-[-0.025em] text-white text-balance">
              Designed for misinformation awareness where it spreads fastest.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {impact.map((item) => (
              <div key={item} className="rounded-3xl border border-white/10 bg-black/25 p-4 backdrop-blur sm:p-5">
                <BadgeCheck className="h-6 w-6 text-cyan-200" aria-hidden="true" />
                <p className="mt-4 font-medium leading-7 text-white">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const footerLinks = [
    { label: "Verify Claim", href: "#demo" },
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Future Scope", href: "#future-scope" },
  ];

  return (
    <footer className="px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full border border-cyan-300/30 bg-cyan-400/10 text-cyan-200">
              <ShieldAlert className="h-4 w-4" aria-hidden="true" />
            </span>
            <p className="text-lg font-semibold tracking-tight text-white">SatyaCheck</p>
          </div>
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">
            Regional Fake News Detector for multilingual misinformation awareness.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm text-slate-400 sm:flex sm:flex-wrap">
          {footerLinks.map((item) => (
            <GlassButton
              key={item.href}
              type="button"
              size="sm"
              onClick={() => scrollToSection(item.href)}
            >
              {item.label}
            </GlassButton>
          ))}
        </div>
      </div>
    </footer>
  );
}

function SectionHeader({ title, body }: { title: string; body: string }) {
  return (
    <div className="reveal-on-scroll mx-auto max-w-3xl text-center" data-reveal>
      <h2 className="font-display text-[clamp(2.25rem,4.4vw,4.4rem)] font-semibold leading-[1] tracking-[-0.025em] text-white text-balance">
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-slate-400 sm:mt-5 sm:text-lg sm:leading-8">{body}</p>
    </div>
  );
}

export default function App() {
  useScrollReveal();

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-ink text-white">
      <ParticleHeroBackground />
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <DemoAnalyzer />
        <FeaturesSection />
        <HowItWorks />
        <ImpactSection />
        <Footer />
      </div>
    </main>
  );
}
