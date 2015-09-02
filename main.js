requirejs.config({
	baseUrl:'dist/js',
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
			deps:['underscore','jquery'],
			exports:'Backbone'
		}
	}
});
// requirejs(['backbone'],function(Backbone){});
requirejs(['c'],function(C){
	
});

/*合并之前的配置

合并： 使用RequireJS佩带的r.js进行合并模块
node  r.js -o build.js 

// 合并之后如何使用模块呢？
直接 var module = require('模块名');
*/