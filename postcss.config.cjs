// Use the Tailwind PostCSS adapter package for Tailwind v4+
module.exports = {
  plugins: {
    // adapter replaces the direct `tailwindcss` PostCSS plugin
    // so PostCSS uses the correct integration
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
};
