
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
	inject = require('gulp-inject-string'),
	fs = require('fs'),
	package = JSON.parse(fs.readFileSync('./package.json')),
	projects = JSON.parse(fs.readFileSync('./projects.json')),
	projectName = projects.currentProject,
	project = projects[projectName],
	projectDir = project.directory,
	files = project.files,
	HTMLIndex = project.index,
	versionKey = projectName+'-version',
	version = project[versionKey];

/* clean
----------------------------------------------------------------------------------------------------------------------*/
gulp.task('clean', function() {
	return del(projects.del);
});
/* version
----------------------------------------------------------------------------------------------------------------------*/
gulp.task('version', function(){
	gulp.src('./projects.json')
		.pipe(bump({key: versionKey }))
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
	return conn.rmdir(project.remotePath+'zip', function(err){
		cb();
	});
});

gulp.task( 'ftp', ['cleanremote'], function () {
	var conn = ftp.create(connOptions);

	return gulp.src( './build/**/*', { base: './build/', buffer: false } )
		.pipe( conn.newer( project.remotePath ) ) // only upload newer files
		.pipe( conn.dest( project.remotePath ) );
});

gulp.task( 'ftpIndex', function () {
	var conn = ftp.create(connOptions);
	return gulp.src( ['./build/index.html', './build/index-assets/**/*'], { base: './build/', buffer: false } )
		.pipe( conn.dest( project.remotePath ) );
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

gulp.task('moveIndex', function() {
	return gulp.src(projectDir+'/'+HTMLIndex)
        .pipe(inject.after('<!-- inject -->','\n<script type="text/javascript">( function(w) {window.addEventListener("load", function() { document.querySelector(".js-replace-href").setAttribute("href", "zip/all-ads-'+version+'.zip"); }); })(window);</script>'))
		.pipe( rename({
			basename: 'index',
			extname: '.html'
		}) )
		.pipe(gulp.dest('./build'));
});

/* build
----------------------------------------------------------------------------------------------------------------------*/
gulp.task('build', ['clean', 'moveIndex'], function() {
	return files.forEach(function(obj) {
		gulp.src( obj+'gulpfile.js', { read: true } )
			.pipe( chug() )
			.pipe(gutil.noop());
	});
});

gulp.task('default', ['serve'] );

/* serve
----------------------------------------------------------------------------------------------------------------------*/
gulp.task('serve', function () {
	browserSync({ server: {
		baseDir: './build/'
	}});
});