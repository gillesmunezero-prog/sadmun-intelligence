import type { Config } from "tailwindcss";

// Configuration Tailwind - support du mode sombre via la classe "dark"
const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0f9f6",
          100: "#d7f0e6",
          300: "#7fd4b6",
          500: "#1f9d73",
          700: "#146a4d",
          900: "#0b3a2a",
        },
      },
      borderRadius: {
        xl: "1rem",
      },
    },
  },
  plugins: [],
};

export default config;
