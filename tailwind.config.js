const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx}",
    "./src/common/components/**/*.{js,ts,jsx,tsx}",
    "./src/modules/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: "#fce301",
        "primary-light": "#fce301",
        "primary-dark": "#efd700",
        secondary: "#1e46d1",
        black: "#0a0a0a",
        "black-light": "#18191d",
        "neutral-1": "#191919",
        "neutral-2": "#1f1f1f",
        "neutral-3": "#6b6b6b",
        "neutral-4": "#9a9a97",
        white: "#f0f0f0",
      },
      scale: {
        101: "1.01",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
