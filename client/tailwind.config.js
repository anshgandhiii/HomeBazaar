/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#20cfff',
        dark:'rgb(15 16 18)',
        secondary:'gray',
        'dark-gradient': 'linear-gradient(90deg, #1e3a8a 0%, #312e81 100%)',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ['light', 'dark'], // Enables light/dark mode
  },
}

