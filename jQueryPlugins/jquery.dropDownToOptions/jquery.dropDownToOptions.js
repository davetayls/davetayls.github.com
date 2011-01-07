/*
addShadow
------------------------------------------------------------*/
(function($) {
    $.fn.dropDownToOptions = function() {
        this.each(function() {
            var this$ = $(this);
			var optList$ = $('<ul class="dd2Opt-list" />');
			if (this.tagName.toLowerCase() == 'select'){
				this$.wrap('<div class="dd2Opt-cont" />')
					 .after(optList$)
					 .find("option")
					 .each(function(){
					 	var option$ = $(this);
						optList$.append('<li><a href="#" role="option">' + option$.text() + '</a></li>')
					 });
			}

        });
    };
})(jQuery);
