(function ($) {
    var filetypes = /\.(zip|exe|pdf|doc*|xls*|ppt*|mp3)$/i;
    dt.analytics = {
        init: function () {},
        trackEvent: function (eventName, action, label) {
            if (typeof _gaq !== 'undefined') {
                _gaq = _gaq || [];
                _gaq.push(['_trackEvent', eventName, action, label]);
            }
        },
		trackLink : function(link, category, action) {
		  try {
		    var pageTracker=_gat._getTracker("UA-4421586-2");
		    pageTracker._trackEvent(category, action);
		    setTimeout('document.location = "' + link.href + '"', 100)
		  }catch(err){}
		}
    };
})(jQuery);
