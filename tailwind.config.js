/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        black: '#000',
        white: '#fff',
        grey: '#717171',
        primary: '#000',
        Lightgrey: '#EBEBEB',
        grey1: '#EBEBEB'
      }
    },
    variants: {
      extend: {
        placeholderColor: ['focus'] // Bật placeholderColor cho trạng thái focus
      }
    },
    plugins: []
  }
}
