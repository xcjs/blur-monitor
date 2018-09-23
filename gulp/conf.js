/*jslint node: true */

/**
 *  This file contains the variables used in other gulp files
 *  which defines tasks
 *  By design, we only put there very generic config values
 *  which are used in several places to keep good readability
 *  of the tasks
 */

const path = require('path');

var gutil = require('gulp-util');

/**
 *  The main paths of your project handle these with care
 */
exports.paths = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../release'),
    tmp: path.join(__dirname, '../.tmp'),
    e2e: path.join(__dirname, '../e2e')
};

/**
 *  Wiredep is the lib which inject bower dependencies in your project
 *  Mainly used to inject script tags in the index.html but also used
 *  to inject css preprocessor deps and js files in karma
 */
exports.wiredep = {
    exclude: [/\/bootstrap\.js$/, /\/bootstrap-sass\/.*\.js/,
        /\/require\.js/],
    directory: path.join(__dirname, '../bower_components')
};

/**
 *  Common implementation for an error handler of a Gulp plugin
 */
exports.errorHandler = function (title) {
    'use strict';

    return function (err) {
        gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
        this.emit('end');
    };
};
