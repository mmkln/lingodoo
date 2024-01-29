/** @type {import('tailwindcss').Config} */
const flipCardPlugin = require('./plugins/flipCardTailwindPlugin');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      rotate: ['active', 'group-hover'],
      display: ['group-hover'],
    },
  },
  plugins: [
    flipCardPlugin,
  ],
}

