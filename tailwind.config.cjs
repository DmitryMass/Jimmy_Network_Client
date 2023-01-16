/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontSize: {},
    lineHeight: {},
    extend: {
      spacing: {},
      backgroundColor: {
        main: '#2d1c3b',
        card: '#8e13bdc2',
        form: '#4d0a67',
        input: '#e8f0fe',
        hover: '#48305c',
      },
      boxShadow: {
        card: '0 2px 6px 0px rgba(115, 72, 126, 0.8)',
      },
      borderColor: {
        cardBorder: '#9c62bc',
      },
      colors: {
        gray: '#bcbcbc',
        input: '#e8f0fe',
        main: '#2d1c3b',
        error: '#d45757',
      },
    },
  },
  plugins: [],
};
