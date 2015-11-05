module.exports = {
  jsx: {
    files: [{
      expand: true,
      cwd: 'js',
      src: ['**/*.jsx'],
      dest: 'public/js/components/',
      ext: '.js',
    }],
  },
};
