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
      },
      spacing: {
        "108": "27rem",
        "116": "29rem",
        "128": "32rem", // following the standard of 128 / 4 = 32
        "152": "38rem",
        "160": "40rem",
        "192": "48rem",
        "200": "50rem",
        "208": "52rem",
      },
    },
  },
  plugins: [],
};
export default config;
