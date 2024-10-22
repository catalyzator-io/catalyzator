/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
      extend: {
        colors: {
          'electric-blue': '#7DF9FF',
          'soft-orange': '#FFB366',
          'light-cyan': '#E0FFFF',
          'lavender': '#E6E6FA',
          'pale-pink': '#FFD1DC',
          'cool-purple': '#dbc2d1',
        },
      },
    },
    plugins: [],
  };