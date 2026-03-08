/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0f1419',
        'dark-card': '#1a1f2e',
        'dark-border': '#2a3142',
        'dark-hover': '#252d3a',
        'accent-blue': '#6fa3ff',
        'accent-blue-dark': '#5a8adc',
        'accent-green': '#50d890',
        'accent-orange': '#ff9f53',
        'text-primary': '#e0e0e0',
        'text-secondary': '#b0b8c4',
        'text-tertiary': '#a0a8b4',
      },
    },
  },
  plugins: [],
}
