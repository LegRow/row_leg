const colors = require('tailwindcss/colors')
module.exports = {
  purge: [
    './app/**/*.html.erb',
    './app/helpers/*.rb',
    './app/javascript/**/*.js',
    './app/javascript/**/*.vue'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: theme => ({
        'taskimg':"url('img/task-img.jpg')",
        'city':"linear-gradient(to right, #48556380, #29323c73),url('img/city.jpg')",
      }),
      colors: {
        'light-blue': colors.lightBlue,
        cyan: colors.cyan,
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
    },
  },
  plugins: [],
}
