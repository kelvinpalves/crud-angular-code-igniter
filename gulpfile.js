var concat = require('gulp-concat');
var del = require('del');
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var minifyCss = require('gulp-minify-css');
var paths = require('./gulp.config.json');
var rev = require('gulp-rev');
var uglify = require('gulp-uglify');

gulp.task('analisarCodigo', analisarCodigo);
gulp.task('default', padrao);
gulp.task('removerArquivos', removerArquivos);
gulp.task('minify', minify);
gulp.task('compilar', ['removerArquivos', 'minify'], uglifyJs);

function analisarCodigo() {
	gulp.src(paths.js)
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
}

function removerArquivos() {
	del(paths.build);
}

function minify() {
	gulp.src([].concat(paths.minify))
		.pipe(concat(paths.app.css))
		.pipe(minifyCss())
		.pipe(rev())
		.pipe(gulp.dest(paths.build));
}

function uglifyJs() {
	gulp.src([].concat(paths.uglify))
		.pipe(concat(paths.app.js))
		.pipe(uglify())
		.pipe(rev())
		.pipe(gulp.dest(paths.build));
}

function padrao() {
	gulp.start('compilar');
	gulp.watch(paths.js, function (evt) {
		gulp.start('compilar');
	});
}