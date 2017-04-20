// Require node modules
var gulp = require('gulp'),
	browserSync = require('browser-sync'),
	autoprefixer = require('gulp-autoprefixer'),
	concat = require('gulp-concat'),
	cssmin = require('gulp-cssmin'),
	sass = require('gulp-sass'),
	maps = require('gulp-sourcemaps'),
	uglify = require('gulp-uglify'),
	gulpUtil = require('gulp-util'),
	htmlmin = require('gulp-htmlmin'),
	jslint = require('gulp-jslint'),

	build = '../../../build/kylotto-speedometer-300x600-build/',
	src = './src/',

	paths = {
		'sass': src + 'sass/',
		'scripts': src + 'scripts/',
		'images': src + 'images/',
		'css': build + 'css',
		'js': build + 'js'
	};


// Sass task: Compile SCSS files to CSS
gulp.task('sass', function () {
	return gulp.src(paths.sass + '*.scss')
		.pipe(maps.init())
		.pipe(sass())
		.on('error', sass.logError )
		.pipe(autoprefixer())
		.pipe(maps.write())
		.pipe(cssmin())
		.pipe(gulp.dest(paths.css))
		.pipe(browserSync.reload({ stream: true })); // Reload browser
});


// Browser sync task: to launch a server and auto-reload
gulp.task('browser-sync', ['default'], function () {
	browserSync({ server: {
		baseDir: build
	}});
});


// Scripts task: Compile TypeScript files to js
gulp.task('scripts', function () {
  return gulp.src([ paths.scripts + 'app.js', paths.scripts + 'script.js' ])
	.pipe(jslint())
	.pipe(maps.init())
	.pipe(maps.write())
	.pipe(concat('scripts.js'))
	.pipe(uglify())
	.pipe(gulp.dest(paths.js))
	.pipe(browserSync.reload({ stream: true })); // Reload browser
});

gulp.task('EBLoader', function() {
	return gulp.src(paths.scripts + 'EBLoader.js')
		.pipe(uglify())
		.pipe(gulp.dest(paths.js))
		.pipe(browserSync.reload({stream:true}));
});

gulp.task('html', function () {
	return gulp.src(src + '**/*.html')
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest(build))
		.pipe(browserSync.reload({ stream: true })); // Reload browser
});

gulp.task('images', function () {
	return gulp.src(paths.images + '*.*')
		.pipe(gulp.dest(build+'images'))
		.pipe(browserSync.reload({ stream: true })); // Reload browser
});

// Watch task: watch for file changes and
// trigger appropriate task.
gulp.task('watch', function () {
	gulp.watch(paths.sass + '**/*.scss', ['sass']); // Watch sass files
	gulp.watch([paths.scripts + 'app.js', paths.scripts + 'script.js'], ['scripts']); // Watch .ts files
	gulp.watch(paths.scripts + 'EBLoader.js', ['EBLoader']); // Watch .ts files
	gulp.watch(src + '**/*.html', ['html']); // Watch html files
});

// Default task: Run `gulp` to launch browser-sync
//and watch for file changes.
gulp.task('serve', ['browser-sync', 'watch']);
gulp.task('default', ['sass', 'scripts', 'EBLoader', 'html', 'images' ]);
