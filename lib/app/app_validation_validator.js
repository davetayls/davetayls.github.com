(function(){
	
	if (typeof(app.validation) == 'undefined') app.validation = {};
	
	app.validation.validator = Class.extend({
		init : function(){},
		validate : function(){return [];}
	});
	
	// required
	app.validation.defaultMessages = {
		required : 'This field is required'
	};
	
	app.validation.requiredValidator = app.validation.validator.extend({
		init : function(errorMessage){
			this._super();
			this.errorMessage = typeof(errorMessage) == 'undefined' ? app.validation.defaultMessages.required : errorMessage;
		},
		validate : function(value){
			return value != '' ? [] : [this.errorMessage];
		}
	});

	// date
	// web service
	
	// regex
	app.validation.regExValidator = app.validation.validator.extend({
		init : function(errorMessage,regExp){
			this._super();
			this.regExp = typeof(regExp) == 'string' ? new RegExp(regExp) : regExp;
			this.errorMessage = errorMessage;
		},
		validate : function(str){
			var errors = [];
			if(!this.regExp.test(str)){
				errors.push(this.errorMessage);
			}
			return errors;
		}
	});

	// validation scripts	
	app.validation.validDate = function(mm,dd,yyyy) {
	   var d = new Date(mm + "/" + dd + "/" + yyyy);
	   return d.getMonth() + 1 == mm && d.getDate() == dd && d.getFullYear() == yyyy;
	}
	
	
})();
