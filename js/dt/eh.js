/*
    dt.eh
-----------------------------------------------------------*/
dt.eh = {};
(function() {

dt.eh.Exception = function(message,innerException){
	this.message = message;
	this.innerException = innerException;
};
dt.eh.Exception.prototype = { message:"", innerException:null };
dt.eh.logError = function(err){
	var message = ""
	if (err.constructor == dt.eh.Exception){
		message = err.message
	}
	if (typeof(console) != "undefined"){
		console.error(err);
	}
};

})();



