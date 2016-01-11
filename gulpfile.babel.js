"use strict";

import gulp from "gulp";
import babel from "gulp-babel";
import del from "del";
import plumberNotifier from "gulp-plumber-notifier";
import jshint from "gulp-jshint";
import react from "react";
import rt from "gulp-react-templates";

var webpack = require('gulp-webpack');

/*
 * Delete build files
 */
gulp.task("clean", () => {
    return del([
        "dist/**"  // Distribution files
        ], { force: true });
});

gulp.task("copy-assets", ['clean'], () => {
    return gulp
        .src(["index.html", "**/*.css", "words.js"])
        .pipe(gulp.dest("dist"));
});

/*
 * Transcompile ES2015 to ES5
 */
gulp.task("pack", () => {
    return gulp.src("js/app.js")
        .pipe(jshint())               // check JS
        .pipe(plumberNotifier())      // prevent pipe breaking when plugins generate errors
        .pipe(webpack(require('./webpack.config.js') ))
        .pipe(gulp.dest('dist'));
});

/*
 * Watch for workspace changes and rebuild
 */
gulp.task("watch", () => {
    gulp.watch("js/**/*.js", [ 'copy-assets', 'pack']);
});

/* Default gulp task */
gulp.task("default", ["clean", "copy-assets", "pack"]);

