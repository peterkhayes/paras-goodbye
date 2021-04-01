/**
 * CRACO modifies create-react-app's config without fully ejecting.
 * This allows Tailwind's CSS processing to work properly.
 */
module.exports = {
  style: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
};
