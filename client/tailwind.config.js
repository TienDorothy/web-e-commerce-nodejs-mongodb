/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    daisyui: {
      themes: ['light', 'dark', 'night'],
    },
    extend: {
      colors: {
        bgPrimary: '#F4F5F9',
        grey: {
          DEFAULT: '',
        },
        second: '#FB9340',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateX(-30px) scale(0.5)' },
          '100%': { opacity: 1, transform: 'translateX(0px) scale(1)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-in both',
      },
    },
  },
  plugins: [
    require('tailwindcss-animated'),
    require('@tailwindcss/forms'),
    require('daisyui'),
  ],
};
