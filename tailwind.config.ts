import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "w2w": {
          base:       "#071A17",
          card:       "#0F2A24",
          "card-hover": "#163830",
          accent:     "#16C47F",
          highlight:  "#22FF88",
          heading:    "#E6FFF4",
          sub:        "#A7D7C5",
          muted:      "#5A8A78",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "Inter", "sans-serif"],
      },
      boxShadow: {
        "glow-sm":  "0 0 15px rgba(22, 196, 127, 0.25)",
        "glow-md":  "0 0 30px rgba(22, 196, 127, 0.3)",
        "glow-lg":  "0 0 50px rgba(22, 196, 127, 0.35)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float":      "float 4s ease-in-out infinite",
        "fade-in-up": "fadeInUp 0.7s ease-out forwards",
      },
      backgroundImage: {
        "hero-radial":
          "radial-gradient(ellipse 80% 60% at 50% -20%, rgba(22,196,127,0.15) 0%, transparent 70%)",
        "card-gradient":
          "linear-gradient(135deg, #0F2A24 0%, #0a2018 100%)",
        "accent-gradient":
          "linear-gradient(135deg, #22FF88 0%, #16C47F 50%, #0EA572 100%)",
      },
      maxWidth: {
        "8xl": "1400px",
      },
    },
  },
  plugins: [],
};

export default config;
