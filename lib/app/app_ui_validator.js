(function($){

	app.ui.validatorRuleSet = Class.extend({
		init : function(rules,actionSelectors,onValidateComplete){
			var validatorSet = this;
			this.actionSelectors = actionSelectors;
			this.errors = [];
			this.onValidateComplete = onValidateComplete;
			this.rules = rules;
			$().ready(function(){
				for (var i=0;i<actionSelectors.length;i++){
					$(actionSelectors[i]).click(function(){
						return validatorSet.validate(); 
					});
				}
			});
		},
		validate : function(){
			this.errors = [];
			for (var i=0;i<this.rules.length;i++){
				var rule = this.rules[i];
				if (rule instanceof app.ui.validatorRule){
					var elem = document.getElementById(rule.elementId);
					if (rule.validator instanceof app.validation.validator){
						var result = rule.validator.validate($(elem).val());
						if (result.length > 0) this.errors.push({element: elem, elementId: rule.elementId, errors: result});
					}
				}
			}
			var resultText = this.errors.length == 0 ? 'valid' : 'invalid';
			var ret = this.errors.length == 0;
			if (typeof(this.onValidateComplete) == 'function') {
				var b = this.onValidateComplete(resultText, this.errors);
				if (typeof(b) == 'boolean') ret = b;
			}
			return ret;
		}
	});
	app.ui.validatorRule = Class.extend({
		init : function(elementId,validator){
			this.elementId = elementId;
			this.validator = validator;				
		}
	});
	
})(jQuery);