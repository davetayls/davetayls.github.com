var validateArgs = function(args,types){
	for(var i=0;i<types.length;i++){
		var arg = args[i],
			type = types[i];
		
		if (typeof(type.type) == 'function') {
			if (!(arg instanceof type.type)) {
				throw 'argument ' + i + ' (' + typeof(arg) + ') is not an instance of correct constructor';
			}
		}else if(typeof(arg) != type.type){
			throw arg + ' is not ' + type.type;
		}  
	}
	return true;
};
var varg = function(sType,req){
	if (sType == 's') sType = 'string';
	if (sType == 'n') sType = 'number';
	if (sType == 'o') sType = 'object';
	if (sType == 'a') sType = 'array';
	return {
		type:sType,
		required: typeof(req) != 'undefined' ? req : false
	};
}
