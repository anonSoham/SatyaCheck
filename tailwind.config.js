/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-display)", "Georgia", "serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      colors: {
        ink: "#030712",
        cyanBlue: "#38bdf8",
        electric: "#2563eb",
        signal: "#7dd3fc",
      },
      boxShadow: {
        glow: "0 0 45px rgba(56, 189, 248, 0.24)",
        card: "0 24px 90px rgba(8, 47, 73, 0.35)",
      },
      animation: {
        "fade-up": "fadeUp 700ms ease-out both",
        "soft-pulse": "softPulse 5s ease-in-out infinite",
        float: "float 7s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        softPulse: {
          "0%, 100%": { opacity: "0.55", transform: "scale(1)" },
          "50%": { opacity: "0.9", transform: "scale(1.08)" },
        },
        float: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -14px, 0)" },
        },
      },
    },
  },
  plugins: [],
};
