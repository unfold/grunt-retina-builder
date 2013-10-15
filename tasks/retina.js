/*
 * grunt-retina-builder
 * https://github.com/unfold/grunt-retina-builder
 *
 * Copyright (c) 2013 Simen Brekken
 * Licensed under the MIT license.
 */

'use strict';

var retina = require('retina');
var path = require('path');

module.exports = function(grunt) {
  grunt.registerMultiTask('retina', 'Grunt task for generating retina CSS rules and images', function() {
    var options = this.options({
      imagesDestination: null
    });

    this.files.forEach(function(f) {
      var imagesDestination = options.imagesDestination || path.dirname(f.dest);
      var src = f.src.filter(function(filepath) {
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        return retina(grunt.file.read(filepath), path.dirname(filepath), imagesDestination);
      }).join(grunt.util.normalizelf(grunt.util.linefeed));

      grunt.file.write(f.dest, src);
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
