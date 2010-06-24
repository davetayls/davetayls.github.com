(function($){
	app.ui.validationPresenter = function(resultText,errors){
		var errorSummary$ = $('.form-errorSummary');
		errorSummary$.html("");
		$('.label-error-num,.field-group-error-num').remove();
		if (resultText == 'invalid'){
			var errorHeader = $('<h3>There were errors on the form</h3>').appendTo(errorSummary$);
			var errorList = $('<ul />').appendTo(errorSummary$);
			for(var i=0;i<errors.length;i++){
				var error = errors[i];
				var errornum = i+1;
				var el$ = $(error.element);
				var label$ = el$.closest('label').addClass('label-error');
				var fieldset$ = el$.closest('fieldset').addClass('fieldset-error');
				var fieldgroup$ = el$.closest('.field-group',fieldset$).addClass('field-group-error');
				var fielditem$ = el$.closest('.field-item',fieldset$).addClass('field-item-error');
				errorList.append('<li><a href="#error-' + errornum + '">'+errornum+'. '+error.errors[0]+'</a></li>')

				var errorNumClass = fieldgroup$.length > 0 ? "field-group-error-num" : "label-error-num";
				var labelerrornum$ = $('<span id="error-'+errornum+'" class="'+errorNumClass+'"><span class="accessibility-item">Error: </span>'+errornum+'</span>');			
				fieldgroup$.length > 0 ? fieldgroup$.prepend(labelerrornum$) : label$.prepend(labelerrornum$);
				
			}
		}
		resultText == 'valid' ? errorSummary$.hide() : errorSummary$.show();
	}	
})(jQuery);
