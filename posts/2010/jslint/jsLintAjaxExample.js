// Load the src in to a variable from a js file
// this example uses the jQuery ajax method
var jsLintCheck = function(jsFile,fnResult){
	var fnComplete = function(res,status){
		var source = res;
		var options = {
		    adsafe: false,
		    bitwise: true,
		    browser: true,
		    cap: false,
		    debug: false,
		    eqeqeq: true,
		    evil: true,
		    forin: false,
		    fragment: false,
		    indent: 4,
		    laxbreak: false,
		    msajax: true,
		    nomen: false,
		    on: false,
		    passfail: false,
		    plusplus: true,
		    predef: ['window','jQuery','$','escape','unescape'],
		    regexp: false,
		    rhino: false,
		    safe: false,
		    sidebar: false,
		    sub: true,
		    undef: true,
		    white: false,
		    widget: false
		};
		if (source){
			var myResult = JSLINT(source, options);
			fnResult.call(jsFile, myResult, JSLINT.errors);
		}else{
			alert('could not load '+ jsFile);
		}		
	};
	$.ajax({
		url : jsFile,
		dataType: 'text/javascript',
		success: fnComplete
	});
};
