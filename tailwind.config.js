/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0a7ea4',
        secondary: '#ff6b6b',
        accent: '#ffd93d',
      },
    },
  },
  plugins: [],
};
