(function($){
	
	$.fn.promo = function(){
		this.each(function(){
			
			var container = $(this),
				controller = container.find('.cp-promo-controller'),
				carousel = container.find('.cp-promo-carousel'),
				carouselWrapper = carousel.children(':first'),
				carouselItems = carouselWrapper.children(),
				active = null;

			container.addClass('cp-promo-active');
			
			//Set Default State of each portfolio piece
			controller.find('li:first').addClass("nav-selected");
				
			//Get size of images, how many there are, then determin the size of the image reel.
			var imageWidth = carousel.width();
			var imageSum = carouselItems.size();
			var imageReelWidth = imageWidth * imageSum;
			
			//Adjust the image reel to its new size
			carousel.css({
				overflow: 'hidden'
			});
			carouselWrapper.css({
				position: 'relative',
				'width' : imageReelWidth
			});
			carouselItems.each(function(i){
				var item = $(this);
				item.css({
					position: 'absolute',
					top:'0px',
					left: (i*imageWidth) + 'px'
				});
			});
			
			//Paging + Slider Function
			rotate = function(){
				var nextItem = $(active.find('a').attr("href"));	
				var triggerID = nextItem.length > 0 ?
									carouselItems.index(nextItem):
									0; //Get number of times to slide
				var image_reelPosition = triggerID * imageWidth; //Determines the distance the image reel needs to slide
		 
				controller.find('li').removeClass('nav-selected'); //Remove all active class
				active.addClass('nav-selected'); //Add active class (the $active is declared in the rotateSwitch function)
				
				//Slider Animation
				carouselWrapper.animate({ 
					left: -image_reelPosition
				}, 500 );
				
			}; 
			
			//Rotation + Timing Event
			rotateSwitch = function(){		
				play = setInterval(function(){ //Set timer - this will repeat itself every 3 seconds
					active = controller.find('li.nav-selected').next();
					if ( active.length === 0) { //If paging reaches the end...
						active = controller.find('li:first'); //go back to first
					}
					rotate(); //Trigger the paging and slider function
				}, 7000); //Timer speed in milliseconds (3 seconds)
			};
			
			rotateSwitch(); //Run function on launch
			
			//On Hover
			carouselWrapper.children().hover(function() {
				clearInterval(play); //Stop the rotation
			}, function() {
				rotateSwitch(); //Resume rotation
			});	
			
			//On Click
			controller.find('a').click(function() {	
				active = $(this).parent(); //Activate the clicked paging
				//Reset Timer
				clearInterval(play); //Stop the rotation
				rotate(); //Trigger rotation immediately
				rotateSwitch(); // Resume rotation
				return false; //Prevent browser jump to link anchor
			});	
			
		});
	}
	
	
	
})(jQuery);
