(function(){
	var scrWidth = $(window).width();
	var scrHeight = $(window).height();
	var wrapper$;
	var flyout$;
	
	
	$.fn.xnav = function(){
		this.each(function(){
			var this$ = $(this);
			var navUl$ = this$.find('>ul');
			
			var isOpen = function(){
				return this$.css('display') === 'block';
			};
			var showFlyout = function(b){
				if (b){
					flyout$
						.animate({
							'right': -430
						})					
						.animate({
							'right': 0
						});					
				}
			};
			this$.find('li').hover(function(){
				var tier = $(this).closest('li').parentsUntil('#xnav > ul').length;
				this$
					.removeClass('xnav-t0')
					.removeClass('xnav-t2')
					.removeClass('xnav-t4')
					.removeClass('xnav-t6')
					.removeClass('xnav-t8');
				this$.addClass('xnav-t'+tier);
			});
			this$.find('a').click(function(){
				showFlyout(true);
				this$.fadeOut(100);
				return false;
			});
			$('#tray-menu a').click(function(){
				showFlyout(true);
				return false;				
			});
			$(document).click(function(e){
				this$.removeClass('xnav-anchorRight');
				this$.removeClass('xnav-anchorBottom');
				
				if (isOpen()){
					this$.fadeOut(100);
					return;
				}
				
				var cssLocation = {
					left: e.pageX+'px',
					top: e.pageY + 'px'						
				};
				if (e.pageX > (scrWidth-300)){
					cssLocation.left = 'auto';
					cssLocation.right = (scrWidth - e.pageX) + 'px';
					this$.addClass('xnav-anchorRight'); 
				}
				if (scrHeight > 300 && e.pageY > (scrHeight - 300)){
					this$.addClass('xnav-anchorBottom'); 
				}
				if (e.pageY > (scrHeight - 70)){
					cssLocation.top = scrHeight - 70;
				}
				this$
					.css(cssLocation)
					.fadeIn(200);				
			});
			
		});
	};
	var resizeWindow = function(){
		scrHeight = $(window).height();
		wrapper$.height(scrHeight);
	};
	$().ready(function(){
		wrapper$ = $('#wrapper');
		resizeWindow();
		flyout$ = $('#flyout');
		$('#xnav').xnav();
	});
	$(window).resize(resizeWindow);
	
})(jQuery);
