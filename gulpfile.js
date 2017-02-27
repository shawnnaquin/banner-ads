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
    // package = JSON.parse(fs.readFileSync('./package.json')),

    // version = package.version,

	paths = [
		// './source/trex-deck-slider-v2-red/728x90-to-728x360/',
		// './source/trex-deck-slider-v2-gray/728x90-to-728x300/',
		'./source/servpro-water/300x600/',
		'./source/servpro-water/300x250/',
		'./source/servpro-water/728x90/'
	];

	// zipPath = './build/zip/';

	// zipOnePaths = [
	// 	zipPath + 'servpro-water-300x600-'+version+'.zip',
	// 	zipPath + 'servpro-water-300x250-'+version+'.zip',
	// 	zipPath + 'servpro-water-728x90-'+version+'.zip',
	// ],

	// zipTwoPaths = [
	// 	zipPath + 'servpro-water-160x600-build-'+version+'.zip',
	// 	zipPath + 'servpro-water-300x250-build-'+version+'.zip',
	// 	zipPath + 'servpro-water-300x600-build-'+version+'.zip',
	// 	zipPath + 'servpro-water-728x90-build-'+version+'.zip',
	// ],

/* default
----------------------------------------------------------------------------------------------------------------------*/
gulp.task('clean', function () {
	return del([
			'./build/zip',
			'./build/**/*',
			'!./build/index.html',
			'!./build/index-assets/',
			'!./build/index-assets/**'
		]);
});

gulp.task('build', ['clean'], function() {
	return paths.forEach(function(obj) {
		gulp.src( obj+'gulpfile.js', { read: true } )
			.pipe( chug() )
	        .pipe(gutil.noop());
	});
});

gulp.task( 'default', ['build'] );


/* version
----------------------------------------------------------------------------------------------------------------------*/
// gulp.task('warn', function(){
// 	gutil.log(gutil.colors.magenta('update index.html with new version: '+version));
// 	gutil.log(gutil.colors.magenta('and run gulp ftpIndex !'));
// });
//
// gulp.task('version', function(){
//   gulp.src('./package.json')
//   .pipe(bump({key: "version"}))
//   .pipe(gulp.dest('./'));
// });

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
// gulp.task('name', function() {
// 	return gulp.src('./build/zip/**/*.zip')
// 		.pipe( rename({
// 			suffix: '-'+version,
// 			extname: '.zip'
//     	}) )
// 		.pipe(gulp.dest('./build/zip/rename/'));
// });
//
// gulp.task('rename', ['name'], function(){
// 	return del([
// 			'./build/zip/*.zip',
// 		]);
// });

/* zip
----------------------------------------------------------------------------------------------------------------------*/

// gulp.task('zipOne', function () {
// 	return gulp.src('./build/zip/*.zip')
//         .pipe(zip.dest(zipPath+'servpro-water-300x250-300x600-728x90' + (gutil.env.version ? '-' + gutil.env.version : '') + '.zip'))
//         .pipe(gutil.noop());
// });

// gulp.task('zipTwo', function () {
// 	return gulp.src(zipTwoPaths)
//         .pipe(zip.dest(zipPath+'servpro-water-160x600-300x250-300x600-728x90-'+version+'.zip'))
//         .pipe(gutil.noop());
// });

gulp.task( 'zip', ['zipOne'] );

/* serve
----------------------------------------------------------------------------------------------------------------------*/
gulp.task('serve', function () {
  browserSync({ server: {
      baseDir: './build/'
    }});
});
