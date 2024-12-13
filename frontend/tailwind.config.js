/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        'bg-second': '#39005e', // Вторичный фон
        'basic-text': '#39005e', // Основной текст
        'accent-text': '#EAB500', // Акцентный текст
        'dark-text': '#1a202c', // Текст для темной темы
        'light-text': '#202938', // Текст для светлой темы
        'choised-text': '#6c22a5',
        // Светлая тема
        'light-bg': '#eeeef6', // Фон для светлой темы
        'light-bg-second': '#eeb8ff', // Вторичный фон для светлой темы
        'light-text': '#202938', // Текст для светлой темы

        // Темная тема
        'dark-bg': '#202938', // Фон для темной темы
        'dark-bg-second': '#39005e', // Вторичный фон для темной темы
        'dark-text': '#9ba2ad', // Текст для темной темы
        // Цвета для фона при наведении
        'hover-bg': '#EAB500', // Акцентный фон для наведения
      },
      boxShadow: {
        'inner-left-top': 'inset 5px 5px 5px 0px rgba(0,0,0,0.48)',
      },
    },
  },
  plugins: [],
};
