(function($) {

var portfolioWindow$,
	innerWindow$;
	
    dt.portfolio = {
        init: function() {
			portfolioWindow$ = $('#portfolio-window');
			innerWindow$ = $('#portfolio-window-inner');
					
			portfolioWindow$.windowViewer();
			innerWindow$.delegate('a.cp-workSquare', 'click',function(e){
				
				
				
			});


        }
    };
	
})(jQuery);