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
        secondary:'gray'
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

