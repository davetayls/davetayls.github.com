require.paths.unshift('../lib');
var path = require('path'),
    fs = require('fs'),
    sys = require('sys'),
	jslint = require('jslint').JSLINT,
	less = require('less');
	
var taskHeader = function(task){
	sys.puts('');
	sys.puts(task.description);
	sys.puts('*********************************************************');
};	

// build settings	
var dir = {
	current: 	process.cwd(),
	project: 	path.join(process.cwd(), '../src'),
	release: 	path.join(process.cwd(), '../../davetayls.github.com-master'),
	requirejs:	path.join(process.cwd(), '../requirejs/build'),
	rhino: 		path.join(process.cwd(), '../requirejs/build/lib/rhino/js.jar'),
	closure:	path.join(process.cwd(), '../requirejs/build/lib/closure/compiler.jar'),
	test: '',
	tools:''
}
console.log(dir);
desc('default task.');
task('default', ['js.validate','less'], function (params) {
  taskHeader(this);
});

// require **************************************************
desc('requirejs optimisation');
task('requirejs', [], function(){
	taskHeader(this);
	
});


// less ************************************************************************
desc('less compilation');
task('less', [], function (params) {
	taskHeader(this);
	var cssDir = dir.release + '/css';
	fs.readdirSync(cssDir).forEach(function (file) {
		if (! /\.less/.test(file)) { return }
		toCSS(cssDir + '/' + file, function (err, less) {
			var name = path.basename(file, '.less'),
				filePath = path.join(cssDir, name) + '.css';
			if (err){
				console.log('toCSS error: ');
				console.log(err);
			}else if (less){
				var fd = fs.openSync(filePath, 'w', 0666);
				fs.writeSync(fd, less, 0);
				console.log('processed: '+ filePath);
			}
		});
	});
});

function toCSS(path, callback) {
    var tree, css;
    fs.readFile(path, 'utf-8', function (e, str) {
        if (e) { return callback(e) }
		var paths = [dir.release];
		less.render(
			str, 
			{ paths: paths
			, optimization: 0 
			}, 
			function (err, css) {
				if (err) {
					callback(err);
				} else {
					try {
						callback(null, css);
					} catch (e) {
						callback(e);
					}
				}
			}
		);
    });
}


// jslint ********************************************************
desc('Validating js.');
task('js.validate',[], function(){
	taskHeader(this);
	var jsDir = dir.project + '/scripts/core';
	fs.readdirSync(jsDir).forEach(function (file) {
		// check if this is a javascript file
		if (! /\.js/.test(file)) { return }
		
		// load the file
		var filePath = jsDir + '/' + file,
			str = fs.readFileSync(filePath, 'utf-8');
			
		// validate
		console.log('validating file: ' + filePath);
		if (!jslint(str, {})) {
			throw new Error(jslint.errors);
		}
	});
});

