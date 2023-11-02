/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'accent-color': 'var(--accent-color)',
        'primary-color': 'var(--primary-color)',
        'secondary-color': 'var(--secondary-color)',
        'special-color':'var(--special-color)'
      },
      textColor: {
        'text-primary-color': 'var(--text-primary-color)',
        'text-secondary-color': 'var(--text-secondary-color)',
      },
    },
  },
  plugins: [],
}
