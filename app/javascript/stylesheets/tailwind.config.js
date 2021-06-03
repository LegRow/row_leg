const colors = require("tailwindcss/colors");
module.exports = {
  purge: [
    "./app/**/*.html.erb",
    "./app/helpers/*.rb",
    "./app/javascript/**/*.js",
    "./app/javascript/**/*.vue",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        notfound: "url('../images/notfound.jpg')",
      }),
      colors: {
        "light-blue": colors.lightBlue,
        cyan: colors.cyan,
        orange: {
          primary: '#ffcb03',
          darker: '#ffbb00',
        }
      },
    },
    screens: {
      'iPhone-Plus': '414px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      'xxl': '1500px',
      '3xl': '1740px',
    },
  },
  variants: {
    extend: {
      backgroundColor: ["active"],
    },
  },
  plugins: [],
};
