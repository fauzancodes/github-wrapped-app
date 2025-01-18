import type { Config } from "tailwindcss";

export default {
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
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          "accent": "#ef4444",
          "primary": "#006bff",
          "neutral": "#ececec",
          "base-100": "#e0e0e0",
          "--glass-blur": "4px",
          "base-300": "#1d1d1d",
          // "secondary": "#f6d860",
        },
      },
    ],
  },
} satisfies Config;
