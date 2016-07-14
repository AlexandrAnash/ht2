var gulp        = require('gulp');
var browserSync = require('browser-sync').create();

const clientPath = 'client_src';
// Static server
gulp.task('browser-sync', function() {
    
});
gulp.task('start', function () {
    browserSync.init({
        server: {
            baseDir: `./${clientPath}`
        }
    });
    gulp.watch(`${clientPath}/**/*.{html,js,css}`).on('change', browserSync.reload);
    gulp.watch(`${clientPath}/img/*.*`).on('change', browserSync.reload);
})