const gulp = require('gulp')
const less = require('gulp-less')
const del = require('del')
const rename = require('gulp-rename')
const cleanCss = require('gulp-clean-css')
const babel = require('gulp-babel') 
const uglify = require('gulp-uglify') 
const concat = require('gulp-concat')
const sourcemaps = require('gulp-sourcemaps')
const autoprefixer = require('gulp-autoprefixer')
const imagemin = require('gulp-imagemin')
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
    images : {
        src: 'src/img/**/*.{jpg,jpeg,png,svg,gif}',
        dest: 'dist/img/'

    }
}
// Функция для очистки dist
function clean(){
    return del(['dist'])
}
// Функция для обработки стилей
function styles(){
    return gulp.src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(autoprefixer({
			cascade: false
		}))
    .pipe(cleanCss(
        {level: 2}
    ))
    .pipe(rename(
        {basename:'main',
         suffix : '.min'
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.styles.dest))
}
// Функция для обработки скриптов
function scripts(){
    return gulp.src(paths.scripts.src)
    .pipe(sourcemaps.init())
    .pipe(babel({
         presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.scripts.dest))
}
// Минификация изображений
function img(){
    return gulp.src(paths.images.src, { encoding: false })
    .pipe(imagemin())
    .pipe(gulp.dest(paths.images.dest))
}
// Функция для наблюдения за каталогом стилей
function watch(){
    gulp.watch(paths.styles.src,styles )
    gulp.watch(paths.scripts.src,scripts )
}
// Функция для запуска билда сборки стилей
const build = gulp.series(clean,gulp.parallel(styles, scripts, img), watch)

exports.clean = clean
exports.styles = styles
exports.scripts = scripts
exports.img = img
exports.watch = watch
exports.build = build
exports.default = build
