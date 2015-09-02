
// 全局配置gulp

// 1、导入需要的任务插件
// gulp gulp-less gulp-concat gulp-minify-css gulp-livereload gulp-rename gulp-watch gulp-notify gulp-plumber gulp-autoprefixer
var gulp = require('gulp'),// 导入gulp
	less = require('gulp-less'),// 导入less插件
	concat = require('gulp-concat'),// 合并文件插件
	minifycss = require('gulp-minify-css'),//压缩CSS插件
	livereload = require('gulp-livereload'),// 刷新插件
	rename = require('gulp-rename'),// 重命名插件
	watch = require('gulp-watch'),// 监听插件
	notify = require('gulp-notify'),// 消息插件
	plumber = require('gulp-plumber'),// 错误处理插件
	autoprefixer = require('gulp-autoprefixer'),// 自动添加前缀
	minhtml = require('gulp-minify-html'),// 压缩html
	md5postfix = require('gulp-rev')// 给文件加MD5后缀
	uglify = require('gulp-uglify')// 给文件加MD5后缀
//////////////////////////////// 开始 less任务 //////////////////////////////////////

// gulp.task('less',function() {
// 	livereload.listen();// 启动监听服务器
// 	// 一旦有less 文件发生变化，name就会对LESS进行编译，然后自动刷新界面
// 	gulp.watch("less/*.less",['compileLess']).on('change',livereload.changed);
// });

// 3 编译LESS文件
gulp.task('compileLess',function(){
	gulp.src('less/*.less')
	.pipe(plumber({errorHandler:notify.onError('Error:<%= error.message %>')}))// less错误处理
	.pipe(notify({message:"开始编译LESS"}))// 编译less
	.pipe(less())
	.pipe(notify({message:"完成编译"}))
	.pipe(minifycss())//压缩CSS
	.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))//自动添加前缀
	.pipe(rename({suffix:".min"}))// 重名CSS文件
	.pipe(gulp.dest("dist/css/"))
	.pipe(notify({message:"CSS导出完成"}))
});
//////////////////////////////// 结束less任务 //////////////////////////////////////
gulp.task('less',function(){
	livereload.listen();// 启动监听服务器
	// 一旦有less 文件发生变化，name就会对LESS进行编译，然后自动刷新界面
	gulp.watch("less/*.less",['compileLess']).on('change',livereload.changed);
});

///////////////////////// 结束初始化  /////////////////////

////////////////////////////压缩html////////////////////////////// 
gulp.task('minhtml',function(){
	gulp.src('*.html')
	.pipe(minhtml())  
    .pipe(gulp.dest('app/html/'));  
});


// 合并CSS
gulp.task('combinecss',function(){
	gulp.src('dist/css/*.css')
	.pipe(minifycss())
	.pipe(concat('style.min.css'))// 合并后文件名
	.pipe(md5postfix())// 文件名后面加MD5后缀
	.pipe(gulp.dest('dist/css'))
});

// 压缩合并ＪＳ
gulp.task('distjs',function(){
	gulp.src('dist/js/*.js')
	.pipe(uglify())
	.pipe(concat('script.min.js'))
	.pipe(gulp.dest('dist/js'))
})