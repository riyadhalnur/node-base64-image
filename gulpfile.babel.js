import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import {execFile} from 'child_process';
import flow from 'flow-bin';
import {Instrumenter} from 'isparta';

import mochaGlobals from './test/setup/.globals';

// Load all of our Gulp plugins
const $ = loadPlugins();

function onError() {
  $.util.beep();
}

// Lint a set of files
function lint(files) {
  return gulp.src(files)
    .pipe($.plumber())
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failOnError())
    .on('error', onError);
}

function lintSrc() {
  return lint('src/**/*.js');
}

function lintTest() {
  return lint('test/**/*.js');
}

function lintGulpfile() {
  return lint('gulpfile.babel.js');
}

function _mocha() {
  return gulp.src(['test/setup/node.js', 'test/unit/**/*.js'], {read: false})
    .pipe($.mocha({
      reporter: 'spec',
      globals: Object.keys(mochaGlobals.globals),
      ignoreLeaks: false
    }));
}

// Thank you @hallettj for this
function _runFlow(cmd, callback) {
  execFile(flow, cmd, {
    cwd: module.__dirname
  }, function (err, stdout, stderr) {
    if (err && stdout.length > 0) {
      return callback(new $.util.PluginError('flow', stdout));
    } else if (err) {
      $.util.log(stderr);
      return callback(err);
    } else { // eslint-disable-line
      callback();
    }
  });
}

function _registerBabel() {
  require('babel-register');
}

function test() {
  _registerBabel();
  return _mocha();
}

function coverage(done) {
  _registerBabel();
  gulp.src(['src/**/*.js'])
    .pipe($.istanbul({ instrumenter: Instrumenter }))
    .pipe($.istanbul.hookRequire())
    .on('finish', () => {
      return test()
        .pipe($.istanbul.writeReports())
        .on('end', done);
    });
}

function typeCheck(done) {
  _registerBabel();
  _runFlow(['start'], function () {
    _runFlow(['status', '--no-auto-start'], done);
  });
}

function gitTag() {
  _registerBabel();
  return gulp.src(['./package.json'])
    .pipe($.tagVersion());
}

function generateDocs() {
  _registerBabel();
  return gulp.src('src/node-base64-image.js')
    .pipe($.documentation({ format: 'md', filename: 'docs.md' }))
    .pipe(gulp.dest('docs'));
}

// Lint our source code
gulp.task('lint-src', lintSrc);

// Lint our test code
gulp.task('lint-test', lintTest);

// Lint this file
gulp.task('lint-gulpfile', lintGulpfile);

// Lint everything
gulp.task('lint', ['lint-src', 'lint-test', 'lint-gulpfile']);

// Lint and run our tests
gulp.task('test', ['lint', 'flow'], test);

// Set up coverage and run tests
gulp.task('coverage', ['lint'], coverage);

// Set up type checking using flow
gulp.task('flow', typeCheck);

// Tag with version in package.json
gulp.task('tag', gitTag);

// Generate documentation
gulp.task('doc', generateDocs);

// An alias of test
gulp.task('default', ['test']);
