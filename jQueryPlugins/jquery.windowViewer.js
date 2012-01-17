(function($) {
    $.fn.windowViewer = function(settings) {
        var config = { 
			onMove: null,
			hPadding: 0,
			vPadding: 0 
		};
        if (settings) $.extend(config, settings);

        this.each(function() {
            // outer window box
			var box = $(this);  //$("#box");            
            box.mousemove(function(e) {
                // get mouse position
				var mouseX = e.pageX;
                var mouseY = e.pageY;

				// get size of window				
                var boxSize = {};
                boxSize.width = box.width();
                boxSize.height = box.height();

				// get distance from left edge
                var boxOffset = box.offset();
                var distanceXDiff;
                distanceXDiff = (mouseX - boxOffset.left);
				
				// get fractional location of mouse to box 0:left edge to 1:right edge
                var distanceX;
                distanceX = (distanceXDiff - config.hPadding) / (boxSize.width - (config.hPadding * 2));

				// get distance from top edge
                var distanceYDiff;
                distanceYDiff = (mouseY - boxOffset.top);
				
				// get fractional distance from top of box
                var distanceY;
                distanceY = (distanceYDiff - config.vPadding) / (boxSize.height - (config.vPadding * 2));

				// get inner box and it's dimensions
                var innerBox = box.find(":first");
                var innerBoxSize = {
					height : innerBox.outerHeight(),
					width : innerBox.outerWidth()
				};
				
				// get location of inner box relative to window box
                var innerBoxOffset = innerBox.offset();

				// get the difference between the larger inner box and smaller window
                var sizeDifferenceX = innerBoxSize.width - boxSize.width;
                var innerBoxLeft = 0 - (distanceX * sizeDifferenceX);
                var sizeDifferenceY = innerBoxSize.height - boxSize.height;
                var innerBoxTop = 0 - (distanceY * sizeDifferenceY);

                innerBox.css({ "position": "absolute" });
                if (distanceX >= 0 && distanceX <= 1) innerBox.css("left", innerBoxLeft + "px");
                if (distanceY >= 0 && distanceY <= 1) innerBox.css("top", innerBoxTop + "px");
				
				if (config.onMove){
					config.onMove.call(this,e,{
						'boxSize' : 		boxSize,
						'boxOffset' : 		boxOffset,
						'distance' : 		{x:distanceX,y:distanceY},
						'innerBoxOffset': 	innerBoxOffset,
						'innerBoxPos' : 	{left:innerBoxLeft},
						'innerBoxSize': 	innerBoxSize
					});
				}

            });
            return this;
        });



    };
})(jQuery);