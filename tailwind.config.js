/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './_includes/**/*.{html,js,md}',
    './_layouts/**/*.{html,js,md}',
    './_pages/**/*.{html,md,js}',
    './_posts/**/*.{html,md}',
    './assets/js/**/*.js',
    './*.html',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9ff',
          500: '#0ea5e9',
          600: '#0284c7',
          900: '#0f172a',
        },
      },
      boxShadow: {
        soft: '0 20px 45px -20px rgba(15, 23, 42, 0.28)',
      },
    },
  },
  plugins: [],
};
