let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('frontEnd/js/index/index.js', 'public/js');
mix.sass('frontEnd/css/app.scss', 'public/css');
mix.js('frontEnd/js/show/show.js', 'public/js')
//     .sass('frontEnd/css/app.scss', 'public/css');
mix.js('frontEnd/js/app/app.js', 'public/js');
mix.browserSync({
    proxy: 'report',
    serveStatic: [{
        route: '/js',
        dir: 'public/js'
    }],
    port: '8888',
    files: [
        'public'
    ]
})