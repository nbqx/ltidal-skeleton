var gulp = require('gulp'),
    connect = require('gulp-connect'),
    pandoc = require('gulp-pandoc');

gulp.task('doc',function(){
  return gulp.src('./src/*.ltidal')
    .pipe(pandoc({
      from: 'markdown+lhs',
      to: 'html',
      ext: '.html',
      args: ['--template=./tpl/tpl.html','-s']
    }))
    .pipe(gulp.dest('./web'));
});

gulp.task('reload',function(){
  gulp.src('./web/*.html')
    .pipe(connect.reload());
});

gulp.task('server',function(){
  connect.server({
    root: ['./web/'],
    port: 3333,
    livereload: true
  });
});

gulp.task('watch',function(){
  gulp.watch(['./src/*.ltidal'],['doc']);
  gulp.watch(['./web/*.html'],['reload']);
});

gulp.task('default',['doc','server','watch']);
