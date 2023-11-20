/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'sans': ['Oxygen', 'sans-serif'],
    },
    extend: {
      colors: {
        'primaryGold': '#DFC469',
        'primaryBlack': '#111',
      },
    },
  },
  plugins: [],
}

