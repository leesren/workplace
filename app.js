
var File = require('./file');
var file = new File();


var packagejson = {
  'name': 'asda',
  'version': '0.0.1',
  'description': 'sada',
  'main': 'da',
  'scripts': {
    'test': 'ad'
  },
  'repository': {
    'type': 'git',
    'url': 'asda'
  },
  'keywords': [
    'da'
  ],
  'author': 'sdas',
  'license': 'd',
  'devDependencies': {
    'gulp': '^3.9.0',
    'gulp-autoprefixer': '*',
    'gulp-concat': '^2.6.0',
    'gulp-less': '*',
    'gulp-livereload': '^3.8.0',
    'gulp-minify-css': '*',
    'gulp-notify': '*',
    'gulp-plumber': '^1.0.1',
    'gulp-rename': '*',
    'gulp-uglify': '^1.2.0',
    'gulp-util': '^3.0.6',
    'gulp-watch': '^4.3.3',
    'gulp-minify-html': '*',
    'livereload': '^0.3.7',
    'gulp-rev':'*',
    'gulp-uglify':'*',
  },
  'dependencies': {}
}

var build = ({
  baseUrl: 'dist/js',
  paths:{
    jquery:'../lib/zepto/zepto.min',
    backbone:'../lib/backbone/backbone-min',
    underscore:'../lib/underscore/underscore-min',
  },
  shim:{
    jquery:{
      exports:'$'
    },
    backbone:{
      deps:['underscore','jquery']
    }
  },
  name: 'main',
  optimize: 'none',//是否压缩 默认是压缩的
  out: 'dist/js/main-built.js',

})


var initdir = ['less','dist/css','dist/js','dist/images','dist/lib','dist/fonts','dist/view'];
var initfile = [
    {path:'readme',data:''},
    {path:'less/style.less',data:''},
    {path:'dist/view/index.html',data:''},
    {path:'package.json',data:JSON.stringify(packagejson)},
    {path:'build.js',data:'('+JSON.stringify(build)+')'},
];

file.mkdir(initdir,function(){
    file.createFile(initfile);
});