var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var minifyCss = require("gulp-clean-css");
var uglify = require("gulp-uglify");
var concat = require('gulp-concat');
var del = require('del');
var rename = require('gulp-rename');
var pump = require('pump');

//less
gulp.task('less', function () {
    gulp.src('assets/css/**/*.less')
     .pipe(less({
         paths: [path.join(__dirname, 'less', 'includes')]
     }))
     .pipe(gulp.dest('assets/css'));
});

//CSS Minification
gulp.task('min-css', function () {
    gulp.src(['assets/css/global.css',
                    'assets/lib/loaders.css/loaders.css'])
    .pipe(concat('global.min.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest('assets/css'));
});

//clean scripts
gulp.task('clean-scripts', function () {
    return del('app/app.min.js');
});

//Concat and minification scripts
var jsFiles = [
    'assets/lib/angular/angular.js',
    'assets/lib/angular-animate/angular-animate.js',
    'assets/lib/angular-messages/angular-messages.js',
    'assets/lib/angular-sanitize/angular-sanitize.js',
    'assets/lib/angular-moment/angular-moment.js',
    'assets/lib/moment/moment.js',
    'assets/lib/angular-bootstrap/ui-bootstrap-tpls.js',
    'assets/lib/angular-ui-router/release/angular-ui-router.js',
     'app/app.js',
    'app/**/*.js'
];

gulp.task('scripts', function () {
    pump([
        gulp.src(jsFiles),
        concat('app.min.js'),
        gulp.dest('app'),
        uglify(),
        gulp.dest('app')
    ]);
});

//watchers
gulp.task('watch', function () {
    gulp.watch('assets/css/**/*.less', ['less']);
    gulp.watch(['**/*.js', '!app/app.min.js', '!app/_references.js'], ['scripts']);
})