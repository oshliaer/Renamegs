var gulp = require('gulp');
var del = require('del');
var exec = require('child_process').exec;
var cnfg = {
  fileId: '1ucwU6y3C-yxfUTJ8HUUSoqLGZ5-p3KCY1CsR7hXeg3yp7WOE15llf5Bs'
};

gulp.task('default', ['src'], function (cb) {
  exec('gapps push', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('app', ['get-from-server', 'clean-app'], function () {

  return gulp.src(['src/**/*'])
    .pipe(gulp.dest('app'));

});

gulp.task('clean-app', function () {
  del([
    'app/*'
  ]);
});

gulp.task('clean', function () {
  del([
    'src/*'
  ]);
});

gulp.task('del-config', function () {
  del([
    'gapps.config.json'
  ]);
});

gulp.task('src', ['clean'], function () {
  return gulp.src(['app/**/*'])
    .pipe(gulp.dest('src'));
});

gulp.task('get-from-server', ['clean', 'del-config'], function (cb) {
  exec(`gapps init ${cnfg.fileId}`, function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  })
});

gulp.task('addmodules', function(){

});