/**
 * Configuration for Tailwind CSS.
 * Custom styling can be defined here.
 * Additionally, this sets up tree shaking of Tailwind styles.
 */
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
