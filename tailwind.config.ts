import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        greenLogo: "#28d3a0",
        purpleLogo: "#210b4d",
        background: "#00060f",
        customPurple: "#210b4d",
        customPurple2: "#4F46E5",
      },
    },
  },
  plugins: [],
} satisfies Config;
