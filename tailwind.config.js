/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./components/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#F8F9FA",
        primary: "#1A1A1A",
        secondary: "#8E8E93",
        accent: "#1C1C1E",
        glass: "rgba(255, 255, 255, 0.8)",
      },
      borderRadius: {
        "3xl": "24px",
        "4xl": "32px",
      },
    },
  },
  plugins: [],
}

