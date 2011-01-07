/* Author: 
 */
(function($){

    var container = window,
		hall$, 
		main$, 
		shutterLeft$, 
		shutterRight$, 
		wall$,
    	hallWidth,
		hallHiddenPixels,
		mainWidth,
		mainHalf,
		mainHeight,
		wallWidth,
		wallAspRatio,
		visibleFrac;

	var setViewport = function(){
		var containerHeight = $(container).height() - 61;
		var containerWidth = $(container).width();
		var hallHeight = containerWidth * wallAspRatio;
		console.log('hallHeight: ' + hallHeight);
		mainHeight = containerHeight - hallHeight;
		main$.height(mainHeight);
		hall$.height(hallHeight);
		getDimensions();
	};
	var getDimensions = function(){
		if (hall$){
	        // get values of main section
        	hallWidth = hall$.width();
			mainWidth = main$.width();
			mainHalf = mainWidth / 2;
			wallWidth = wall$.width();

            // get difference between the main width and the wall width
            hallHiddenPixels = wallWidth - mainWidth;

			// what fraction of the wall is visible
            visibleFrac = mainWidth / wallWidth;

		}
	};
	var setWallCenter = function(fracPos){
	
		// get number of pixels from left of wall fractional pos is
		var distFromLeft = (wallWidth * fracPos) - mainHalf;
		if (distFromLeft > hallHiddenPixels) {
			distFromLeft = hallHiddenPixels;
		}
		var leftVal = 0 - distFromLeft;
		wall$.animate({
			left: leftVal > 0 ? 0 : leftVal
		});
	}		
	var setHallCenter = function(fracPos){
		// get width of hall window
		var hallWindowWidth = hallWidth * visibleFrac;
		var halfHallWin = hallWindowWidth/2;
		
		// get left side of window
		var distFrmHallLeft = (hallWidth * fracPos) - halfHallWin;
		if (distFrmHallLeft < 0){
			distFrmHallLeft = 0;
		}
		if (distFrmHallLeft > hallWidth - hallWindowWidth){
			distFrmHallLeft = hallWidth - hallWindowWidth;
		}
		shutterLeft$.animate({
			width: distFrmHallLeft
		});
		
		// get right side of window
		var rightSideWidth = hallWidth - distFrmHallLeft - hallWindowWidth;
		shutterRight$.animate({
			width: rightSideWidth
		});		
	};
	
	var createHall = function(){
		$('#wall .painting').each(function(){
			var this$ = $(this);
			var hallPainting$ = $(this.outerHTML);
			hall$.append(hallPainting$);
		});
	};
	
	 
    $().ready(function(){
        hall$ = $('#hall');
        main$ = $('#main');
        wall$ = $('#wall');
        shutterLeft$ = $('#shutter-left');
        shutterRight$ = $('#shutter-right');
		wallAspRatio = wall$.height() / wall$.width();
		console.log('wallAspRatio:' + wallAspRatio);
		createHall();
		setViewport();
		$(window).resize(setViewport);	        
        
        hall$.click(function(ev){
            var mouseX = ev.pageX;          			
            
			// get fractional position of mouse on hall
            var fracPos = mouseX / hallWidth;
            
			setWallCenter(fracPos);
			setHallCenter(fracPos);
        });
        
		var wallDrag = function(event, ui){
			var fractionCentre = Math.abs(ui.position.left) / (wallWidth - mainWidth);
			setHallCenter(fractionCentre);
		};
        wall$.draggable({
            axis: 'x',
			stop: wallDrag
        });
        
        $('#paintings').selectable();
		
		setWallCenter(0.5);
		setHallCenter(0.5);
    });
    
})(jQuery);




















