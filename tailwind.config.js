/** @type {import('tailwindcss').Config} */
// Minimal Tailwind config. Neutral palette only, no custom design tokens
// or branded color scales are introduced here.
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
