import colors from 'tailwindcss/colors.js'

/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
export default {
  content: ['index.html', './ui/**/*.{ts,tsx}'],
  theme: {
    colors: {
      transparent: colors.transparent,
      current: colors.current,
      white: colors.white,
      black: colors.black,
      neutral: colors.stone,
      brand: colors.rose,
    },
    extend: {},
  },
  plugins: [],
}
