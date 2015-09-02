
var fs = require('fs');

var File = function(){};
var fp = File.prototype;
fp.log = function(value){
	console.log(value);
}

fp.mkdir = function(path,callback){
	var me = this;
	var paraType = Object.prototype.toString.call(path);
	if(paraType.indexOf("String") !== -1){// 字符串的参数
		check(path);
	}else if(paraType.indexOf("Array") !== -1){// 数组类型的参数
		iterator(path);
	}

		function iterator(list){
			for(var len = list.length-1;len>-1;len--){
				check(list[len]);
			}
		}

		function splitPath(path){ //拆分路径
			var type = Object.prototype.toString.call(path);
			if(/\//.test(path))// 是否含有子路径
			{
				// 拆分
				var arr = path.split('/');
				var temp = '';
				for(var i=0;i<arr.length;i++){
					var el = arr[i];
					if(!temp){
						temp = el;
					}else{
						temp = [temp,el].join('/');
					}
					check(temp);
				}
			}else{
				// console.log(path+"不含子路径");
				check(path);
			}
		}

		function check(path) {// 检查路径
			fs.exists(path,function(exist){
				if(!exist){
					splitPath(path);
					fs.mkdir(path, callback);
				}else{
					me.log("存在文件夹 "+path);
				}
			});
		}	
}
fp.createFile = function(path,data){
	var me = this;

	// 判断文件路径是不是包含目录结构 如 ab/ddd/adsd.css
	if(path){
		// 判断参数类型
		if(this.paramType(path).isArray){
			path.forEach(function(el){
				initfile(el.path,el.data);
			});
		}else if(this.paramType(path).isString){
			initfile(path,data);
		}

	}
	function initfile(path,data){
			var arr = path.split('/');
			if(arr.length>0){
				// 获得文件名
				var filename = arr.pop();
				// 获得文件目录
				var dir = arr.join('/');
				// 先创建文件目录
				if(dir){
						fs.exists(dir,function(exist){
							if(!exist){
								me.log("不存在文件夹 "+dir);
								me.mkdir(dir);
							}else{
								me.log("存在文件夹 "+dir);
							}
							writeFile(path,data);
						});		 	  
				}else{
					writeFile(path,data);
				}
			 }
		}
	function writeFile(path,data){
		fs.writeFile(path, data,function(err){
			if(err){
				throw new Error();
			}
			me.log('创建文件成功');
		});
	}
}

fp.deleteFile = function(){
	var me = this;
	if(fs.existsSync(path)){
		fs.unlinkSync(path);
		me.log('删除成功');
	}else{
		me.log("文件不存在");
	}
}

// 判断参数类型
fp.paramType = function(value){
	var obj = {
		isArray:false,
		isString:false,
		isNumber:false,
		isObject:false,
		isBoolean:false,
		isUndefined:false
	}
	// 检测参数类型
	var check = Object.prototype.toString.call(value);
	switch(check){
		case '[object String]':{
			obj.isString = true;
			break;
		}
		case "[object Array]":{
			obj.isArray = true;
			break;
		}
		case '[object Object]':{
			obj.isObject = true;
			break;
		}
		case "[object Undefined]":{
			obj.isUndefined = true;
			break;
		}		
		case '[object Boolean]':{
			obj.isBoolean = true;
			break;
		}
		case "[object Number]":{
			obj.isNumber = true;
			break;
		}
		default:{
			return obj;
		}
	}
	return obj;
}
fp.v  = '0.0.1';

// var listpath = ['less','dist/css',"dist/js","dist/images/icon","dist/lib"];
// var filelist = ['gulpfile.js','package.json'];
// iterator(listpath);//创建文件目录
// createFile("hello.txt");
// deleteFile('hello.txt');

// var file = new File();
// file.createFile(filelist);
// file.mkdir(listpath,function(){});
// file.mkdir('test/abc');
// var t = ['xx',[],{},undefined,true,343]
// t.forEach(function(el){
// 	// console.log(fp.paramType(el));
// })

// file.createFile("less/less.less",'abds');
// file.createFile("less/xxxx.less",'xxxx');
// file.createFile("reset.less",'xxxx');
// file.createFile("index.html",'xxxx');
// file.createFile("readme",'xxxx');

module.exports = File;