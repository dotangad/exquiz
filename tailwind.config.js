module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        exun: "#2977f5",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
