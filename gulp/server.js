/*jslint node: true */

'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var nodemon = require('gulp-nodemon');

var browserSync = require('browser-sync');
var browserSyncSpa = require('browser-sync-spa');

var util = require('util');

var proxyMiddleware = require('http-proxy-middleware');

function browserSyncInit(environment, browser) {
    browser = browser === undefined ? 'default' : browser;

    nodemon({
        script: './index.js',
        args: ['-e', environment],
        ext: 'js'
    }).on('start', function() {
        browserSync.instance = browserSync.init({
            startPath: '/',
            proxy: {
              target: 'localhost:3000'
            },
            port: 8080,
            browser: browser,
            ghostMode: false
        });
    });
}

gulp.task('serve', ['watch'], function () {
    browserSyncInit('dev');
});

gulp.task('serve:dist', ['build'], function () {
    browserSyncInit('prod');
});

gulp.task('serve:e2e', ['inject'], function () {
    browserSyncInit('dev');
});

gulp.task('serve:e2e-dist', ['build'], function () {
    browserSyncInit('prod');
});
