var gulp = require( 'gulp' ),
	chug = require( 'gulp-chug' ),
	del = require( 'del'),
	gutil = require('gulp-util'),
	ftp = require( 'vinyl-ftp' ),
	secret = require('./.secret.json'),
	browserSync = require('browser-sync'),
	zip = require('gulp-vinyl-zip'),
	rename = require('gulp-rename'),
	bump = require('gulp-bump'),
	fs = require('fs'),
	package = JSON.parse(fs.readFileSync('./package.json')),
	projects = JSON.parse(fs.readFileSync('./projects.json')),
	version = package.version,

	project = projects.kylottospeedometer,
	projectDir = project.directory,
	files = project.files,
	HTMLIndex = project.index;

/* clean
----------------------------------------------------------------------------------------------------------------------*/
gulp.task('clean', function() {
	return del(projects.del);
});
/* version
----------------------------------------------------------------------------------------------------------------------*/
gulp.task('version', function(){
	gulp.src('./package.json')
		.pipe(bump({key: "version"}))
		.pipe(gulp.dest('./'));
});

/* ftp
----------------------------------------------------------------------------------------------------------------------*/
var connOptions = {
	host:     secret.host,
	user:     secret.user,
	password: secret.pass,
	log:      gutil.log,
	debug: 	  true
};

gulp.task('cleanremote', function(cb) {
	var conn = ftp.create(connOptions);
	return conn.rmdir(secret.remotePath+'zip', function(err){
		cb();
	});
});

gulp.task( 'ftp', ['cleanremote'], function () {
	var conn = ftp.create(connOptions);

	return gulp.src( './build/**/*', { base: './build/', buffer: false } )
		.pipe( conn.newer( secret.remotePath ) ) // only upload newer files
		.pipe( conn.dest( secret.remotePath ) );
});

gulp.task( 'ftpIndex', function () {
	var conn = ftp.create(connOptions);
	return gulp.src( './build/index.html', { base: './build/', buffer: false } )
		.pipe( conn.dest( secret.remotePath ) );
});

/* rename
----------------------------------------------------------------------------------------------------------------------*/
gulp.task('name', function() {
	return gulp.src('./build/zip/**/*.zip')
		.pipe( rename({
			suffix: '-'+version,
			extname: '.zip'
		}) )
		.pipe(gulp.dest('./build/zip-version'));
});

gulp.task('moveindex', ['clean'], function() {
	return gulp.src(projectDir+'/'+HTMLIndex)
		.pipe( rename({
			basename: 'index',
			extname: '.html'
		}) )
		.pipe(gulp.dest('./build'));
});

/* build
----------------------------------------------------------------------------------------------------------------------*/
gulp.task('build', ['clean', 'moveindex'], function() {
	return files.forEach(function(obj) {
		gulp.src( obj+'gulpfile.js', { read: true } )
			.pipe( chug() )
			.pipe(gutil.noop());
	});
});

/* serve
----------------------------------------------------------------------------------------------------------------------*/
gulp.task('serve', function () {
	browserSync({ server: {
		baseDir: './build/'
	}});
});