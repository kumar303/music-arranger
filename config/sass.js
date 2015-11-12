var path = require('path');

var env_ = 'local';

if (process.env.DEV) {
  env_ = 'dev';
}


module.exports = {
  options: {
    sourceMap: true,
    includePaths: [
      path.join('public/scss/config/', env_),
    ],
  },
  dev: {
    options: {
      outputStyle: 'expanded',
    },
    files: {
      'public/dist/app.css': 'public/scss/app.scss',
    },
  },
  min: {
    options: {
      outputStyle: 'compressed',
    },
    files: {
      'public/dist/app.min.css': 'public/scss/app.scss',
    },
  },
};
