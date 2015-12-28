var gulp = require('gulp'),
    rename = require('gulp-rename'),
    traceur = require('gulp-traceur'),
    webserver = require('gulp-webserver');

// run init tasks
gulp.task('default', ['dependencies', 'js', 'html', 'css']);

// run development task
gulp.task('dev', ['watch', 'serve']);

// serve the build dir
gulp.task('serve', function () {
  gulp.src('serve-dir')
    .pipe(webserver({
      open: true
    }));
});

// watch for changes and run the relevant task
gulp.task('watch', function () {
  gulp.watch('client/**/*.js', ['js']);
  gulp.watch('client/**/*.html', ['html']);
  gulp.watch('client/**/*.css', ['css']);
});

// move dependencies into build dir
gulp.task('dependencies', function () {
  return gulp.src([
    'node_modules/traceur/bin/traceur-runtime.js',
    'node_modules/systemjs/dist/system-csp-production.src.js',
    'node_modules/systemjs/dist/system.js',
    'node_modules/reflect-metadata/Reflect.js',
    'node_modules/angular2/bundles/angular2.js'
  ])
    .pipe(gulp.dest('serve-dir/lib'));
});

// transpile & move js
gulp.task('js', function () {
  return gulp.src('client/app/**/*.js')
    .pipe(rename({
      extname: ''
    }))
    .pipe(traceur({
      modules: 'instantiate',
      moduleName: true,
      annotations: true,
      types: true,
      memberVariables: true
    }))
    .pipe(rename({
      extname: '.js'
    }))
    .pipe(gulp.dest('serve-dir'));
});

// move html
gulp.task('html', function () {
  return gulp.src('client/**/*.html')
    .pipe(gulp.dest('serve-dir'))
});

// move css
gulp.task('css', function () {
  return gulp.src('src/**/*.css')
    .pipe(gulp.dest('serve-dir'))
});
