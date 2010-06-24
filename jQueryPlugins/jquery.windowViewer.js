(function($) {
    $.fn.windowViewer = function(settings) {
        var config = { onMove: null };
        if (settings) $.extend(config, settings);

        this.each(function() {
            var box;
            box = $(this);  //$("#box");            
            box.mousemove(function(e) {
                var mouseX;
                mouseX = e.pageX;
                var mouseY;
                mouseY = e.pageY;

                var boxOffset; boxOffset = box.offset();
                var boxSize; boxSize = {};
                boxSize.width = box.width();
                boxSize.height = box.height();

                var distanceXDiff;
                distanceXDiff = (mouseX - boxOffset.left);
                var distanceX;
                distanceX = distanceXDiff / boxSize.width;

                var distanceYDiff;
                distanceYDiff = (mouseY - boxOffset.top);
                var distanceY;
                distanceY = distanceYDiff / boxSize.height;

                var innerBox;
                innerBox = box.find(":first");
                var innerBoxOffset; innerBoxOffset = innerBox.offset();
                var innerBoxSize; innerBoxSize = {};
                innerBoxSize.width = innerBox.width();
                innerBoxSize.height = innerBox.height();

                var sizeDifferenceX; sizeDifferenceX = innerBoxSize.width - boxSize.width;
                var innerBoxLeft = 0 - (distanceX * sizeDifferenceX);
                var sizeDifferenceY; sizeDifferenceY = innerBoxSize.height - boxSize.height;
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