var concat = require('gulp-concat');
var del = require('del');
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var paths = require('./gulp.config.json');
var rev = require('gulp-rev');
var uglify = require('gulp-uglify');

gulp.task('analisarCodigo', analisarCodigo);
gulp.task('default', padrao);
gulp.task('removerArquivos', removerArquivos);
gulp.task('uglifyJs', ['removerArquivos'], uglifyJs);

function analisarCodigo() {
	gulp.src(paths.js)
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
}

function removerArquivos() {
	del(paths.build);
}

function uglifyJs() {
	gulp.src([].concat(paths.uglify))
		.pipe(concat('app.min.js'))
		.pipe(uglify())
		.pipe(rev())
		.pipe(gulp.dest(paths.build));
}

function padrao() {
	gulp.start('uglifyJs');
	gulp.watch(paths.js, function (evt) {
		gulp.start('uglifyJs');
	});
}