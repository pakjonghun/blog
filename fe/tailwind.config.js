/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{tsx,ts}"],
  theme: {
    extend: {
      keyframes: {
        leftMenuShow: {
          "0%": { transform: `scaleX(20%)` },
          "100%": { transform: "scaleX(100%)" },
        },
        leftMenuHide: {
          "0%": { transform: `scaleX(100%)` },
          "100%": { transform: "scaleX(20%)" },
        },
        fadeOut: {
          from: { opacity: 1 },
          to: { opacity: 0.3 },
        },
      },
    },
  },
  plugins: [],
};
