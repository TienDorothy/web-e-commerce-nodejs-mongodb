/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    daisyui: {
      themes: ["light", "dark", "night"],
    },
    extend: {},
  },
  plugins: [
    require("tailwindcss-animated"),
    require("@tailwindcss/forms"),
    require("daisyui"),
  ],
};
