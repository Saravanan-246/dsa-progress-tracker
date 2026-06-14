/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Added TypeScript extensions for complete coverage
  ],
  theme: {
    extend: {
      fontFamily: {
        // Aligns perfectly with the custom font stack used in your global CSS
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif'
        ],
      },
    },
  },
  plugins: [],
};