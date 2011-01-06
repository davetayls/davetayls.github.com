(function ($, dt) {
    var filetypes = /\.(zip|exe|pdf|doc*|xls*|ppt*|mp3)$/i;
    dt.analytics = {
        init: function () {
            $('.cp-promo-controller a').trackEvent('SlideViews');
            $('.cp-promo-carousel a').trackLink('SlideAction');
        },
        trackEvent: function (eventName, action, label) {
            if (typeof _gaq !== 'undefined') {
                _gaq = _gaq || [];
                _gaq.push(['_trackEvent', eventName, action, label]);
            }
        },
        trackLink: function (link, category, action) {
            try {
                var pageTracker = _gat._getTracker("UA-4421586-2");
                pageTracker._trackEvent(category, action);
                setTimeout('document.location = "' + link.href + '"', 100)
            } catch (err) { }
        }
    };

    $.fn.trackEvent = function (category) {
        this.click(function () {
            var pageTracker = _gat._getTracker("UA-4421586-2");
            pageTracker._trackEvent(category, this.href);
        });
    };
    $.fn.trackLink = function (category) {
        this.click(function () {
            dt.analytics.trackLink(this, category, this.href);
            return false;
        });
    };

})(jQuery, dt = window.dt || {});

