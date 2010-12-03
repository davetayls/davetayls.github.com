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
	release: 	path.join(process.cwd(), '../src-build'),
	requirejs:	path.join(process.cwd(), '../requirejs/build'),
	rhino: 		path.join(process.cwd(), '../requirejs/build/lib/rhino/js.jar'),
	closure:	path.join(process.cwd(), '../requirejs/build/lib/closure/compiler.jar'),
	test: '',
	tools:''
}
console.log(dir);
desc('default task.');
task('default', ['less'], function (params) {
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
			console.log('file: '+ cssDir + '/' + file );
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
		console.log('reading: ' + path);
		less.render(str, { paths: [dir.release], optimization: 0 }, function (err, css) {
            if (err) {
                callback(err);
            } else {
                try {
                    callback(null, css);
                } catch (e) {
                    callback(e);
                }
            }
        });
    });
}


// jslint ********************************************************
desc('Validating js.');
task('js.validate',[], function(){
  sys.puts('*********** validating js ************');
  if (!JSLINT('blh', {})) {
    for (var i = 0; i < JSLINT.errors.length; i += 1) {
        var e = JSLINT.errors[i];
        if (e) {
            // Output file and line numbers in Visual Studio syntax.
            console.log('path' + '(' + (e.line + 1) + '): ' + e.reason);
            // What does this RegExp do?
            console.log((e.evidence || '').replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1"));
        }
    }
    console.log(JSLINT.errors.length + ' errors!');
  }
});

