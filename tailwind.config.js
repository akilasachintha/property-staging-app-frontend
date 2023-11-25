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
      backgroundImage: theme => ({
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-radial-at-t': 'radial-gradient(at top, var(--tw-gradient-stops))',
      }),
      colors: {
        'primaryGold': '#DFC469',
        'primaryBlack': '#111',
        'primaryWhite': '#FFF',
        'primaryGrey': '#E5E5E5',
      },
    },
  },
  plugins: [],
}

