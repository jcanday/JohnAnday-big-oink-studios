/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
    },
    container:{
      padding:'5rem',
    }

  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
