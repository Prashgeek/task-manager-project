/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',         // scan all files inside src/app/
    './src/pages/**/*.{js,ts,jsx,tsx}',  // scan components inside src/components/
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
