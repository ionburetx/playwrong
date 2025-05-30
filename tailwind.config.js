/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'tilt-neon': ['"Tilt Neon"', 'cursive'],
      },
    },
  },
  plugins: [],
}

