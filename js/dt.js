/*
	All of the items this file dynamically adds 
	get combined and compressed on deployment.
	@juxtapo.combiner
*/

(function(){

	function getJsLocation(jsFileName){
		var scriptFiles = document.getElementsByTagName("script");
		for (var i=0;i<scriptFiles.length;i++){
			var scriptTag = scriptFiles[i];
			var scriptFileName = scriptTag.src.substring(scriptTag.src.lastIndexOf("/")+1).toLowerCase();
			scriptFileName = scriptFileName.split("?")[0];
			if (scriptFileName == jsFileName){
				return scriptTag.src.substring(0,scriptTag.src.lastIndexOf("/")+1);
			}
		}
	};

	var combinerJsLocation = getJsLocation("dt.js");
	
	var includes = [];
	includes.push("dt_core.js");
	includes.push("dt_eh.js");
	includes.push("dt_portfolio.js");
	includes.push("dt_ui.js");
	includes.push("dt_data.js");

	function includeJs(){
		for (var i=0;i< includes.length;i++){
			document.write("<script type=\"text/javascript\" src=\"" + combinerJsLocation + includes[i] + "\"></script>");
		}
	};
	includeJs();
})();