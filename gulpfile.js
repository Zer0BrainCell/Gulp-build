const gulp = require('gulp')
const less = require('gulp-less')
const del = require('del')
const rename = require('gulp-rename')
const cleanCss = require('gulp-clean-css')
const babel = require('gulp-babel') 
const uglify = require('gulp-uglify') 
const concat = require('gulp-concat') 
// Константа с путями изначальных файлов и файлов назначения
const paths = {
    styles:{
        src: 'src/styles/**/*.less',
        dest: 'dist/css/'
    },
    scripts:{
        src: 'src/scripts/**/*.js',
        dest: 'dist/js/'
    },
}
// Функция для очистки dist
function clean(){
    return del(['dist'])
}
// Функция для обработки стилей
function styles(){
    return gulp.src(paths.styles.src)
    .pipe(less())
    .pipe(cleanCss())
    .pipe(rename(
        {basename:'main',
         suffix : '.min'
    }))
    .pipe(gulp.dest(paths.styles.dest))
}
// Функция для обработки скриптов
function scripts(){
    return gulp.src(paths.scripts.src, {sourcemaps: true})
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest(paths.scripts.dest))
}
// Функция для наблюдения за каталогом стилей
function watch(){
    gulp.watch(paths.styles.src,styles )
    gulp.watch(paths.scripts.src,scripts )
}
// Функция для запуска билда сборки стилей
const build = gulp.series(clean,gulp.parallel(styles, scripts), watch)

exports.clean = clean
exports.styles = styles
exports.scripts = scripts
exports.watch = watch
exports.build = build
exports.default = build
