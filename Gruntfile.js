'use strict';


module.exports = function(grunt) {
  // load all grunt tasks matching the ['grunt-*', '@*/grunt-*'] patterns
  require('load-grunt-tasks')(grunt);

  var configs = require('load-grunt-configs')(grunt);
  grunt.initConfig(configs);

  grunt.registerTask('serve', ['webpack-dev-server:start']);
  grunt.registerTask('start', ['webpack']);
  grunt.registerTask('build', ['webpack']);
  grunt.registerTask('test', ['karma:run']);
};
