/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui"),
  ],

  // Optional: DaisyUI themes
  daisyui: {
    themes: ["light", "dark", "cupcake"], // choose your themes
  },
}
