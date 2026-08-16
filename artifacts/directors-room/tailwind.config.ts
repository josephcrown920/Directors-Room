import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#08090b",
        panel: "#111318",
        line: "#22262e",
        accent: "#7c5cff",
        gold: "#f0b429",
        mute: "#9CA3AF"
      }
    }
  },
  plugins: []
};

export default config;
