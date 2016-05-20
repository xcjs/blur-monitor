/*jslint node: true */

'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('api', function() {
    nodemon({
        script: './api/server.js',
        ext: 'js'
    });
});