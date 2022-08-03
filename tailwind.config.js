/** @type {import('tailwindcss').Config} */

module.exports = {
  mode: 'jit',
  content: [
    "./pages/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
