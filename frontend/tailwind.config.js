/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
      extend: {
        colors: {
          'electric-blue': '#7DF9FF',
          'soft-orange': '#FFB366',
          'crazy-orange': '#FF7F50',
          'light-cyan': '#E0FFFF',
          'lavender': '#E6E6FA',
          'pale-pink': '#ba90f5',
          'cool-purple': '#dbc2d1',
          'purple-900': '#772f96',
        },
      },
    },
    plugins: [],
  };