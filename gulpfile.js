var gulp = require('gulp');
var templateCache = require('gulp-angular-templatecache');
var browserSync = require('browser-sync');
var uglifyjs = require('gulp-uglify');
var concat = require("gulp-concat");
var ngAnnotate = require('gulp-ng-annotate');
var sass = require('gulp-sass');

gulp.task('ngTemplate', function() {
    return gulp.src('./src/*.html')
        .pipe(templateCache({
            standalone: true,
            module: 'enuo.grid',
            root: 'enuo/grid/templates'
        }))
        .pipe(gulp.dest('./src'));
});

gulp.task('build', function() {
    return gulp.src([
            "./src/templates.js",
            "./src/bw.paging.js",
            "./src/emptyResult.js",
            "./src/enuoGridCell.js",
            "./src/*.js",
        ])
        .pipe(ngAnnotate())
        .pipe(uglifyjs({
            output: {
                max_line_len: 100000
            }
        }))
        .pipe(concat('enuo-grid.js'))
        .pipe(gulp.dest("./dist"));
});

gulp.task('sass', function() {
    return gulp.src("./src/*.scss")
        .pipe(sass())
        .pipe(concat('enuo-grid.css'))
        .on('error', sass.logError)
        .pipe(gulp.dest("./dist"));
});

gulp.task('watch', ['ngTemplate', 'build', 'sass'], function() {
    gulp.watch([
        "./*.html",
        './dist/*.js'
    ], function(event) {
        browserSync.reload();
    });

    gulp.watch("./src/*.html", ['ngTemplate'], function(event) {

    });

    gulp.watch("./src/*.js", ['build'], function(event) {

    });

    gulp.watch("./src/*.scss", ['sass'], function(event) {

    });
});

gulp.task('serve', ['watch'], function() {
    var baseDir = "./";
    var server = {
        baseDir: baseDir
    };
    browserSync.instance = browserSync.init({
        startPath: '/test.html',
        server: server,
        port: 3010,
        ui: {
            port: 3011
        },
        browser: 'default',
        ghostMode: false
    });
});

gulp.task('default', ['watch'], function() {
    console.log("it works!");
});