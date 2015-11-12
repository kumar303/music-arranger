module.exports = {
  lax: {
    options: {
      csslintrc: '.csslintrc',
    },
    src: ['public/dist/app.css'],
  },
  strict: {
    options: {
      'adjoining-classes': false,
      'box-sizing': false,
      'bulletproof-font-face': false,
    },
    src: ['public/dist/app.css'],
  },
};
