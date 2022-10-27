/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  important: "#__next",
  // set important for everything is important mainly because of modal - it's even outside of next root component
  // important: true,
  theme: {
    extend: {},
  },
  plugins: [],
};
