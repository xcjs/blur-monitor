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

function browserSyncInit(baseDir, browser, taskName) {
    browser = browser === undefined ? 'default' : browser;

    nodemon({
        script: './api/server.js',
        args: [taskName],
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
    browserSyncInit([path.join(conf.paths.tmp, '/serve'), conf.paths.src], undefined, 'serve');
});

gulp.task('serve:dist', ['build'], function () {
    browserSyncInit(conf.paths.dist, undefined, 'serve:dist');
});

gulp.task('serve:e2e', ['inject'], function () {
    browserSyncInit([conf.paths.tmp + '/serve', conf.paths.src], []);
});

gulp.task('serve:e2e-dist', ['build'], function () {
    browserSyncInit(conf.paths.dist, []);
});
