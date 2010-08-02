(function ($) {
    var filetypes = /\.(zip|exe|pdf|doc*|xls*|ppt*|mp3)$/i;
    dt.analytics = {
        init: function () {
    		/*
            $('a').each(function () {
                var href = $(this).attr('href');
                if (!!href) {
                    if (href.match(filetypes) && !(href.match(/^https?\:/i))) {
                        $(this).click(function () {
                            var extension = (/[.]/.exec(href)) ? /[^.]+$/.exec(href) : undefined;
                            brc.analytics.trackEvent('Download', 'Click - ' + extension, href);
                            brc.eh.log("Tracking document download " + href);
                        });
                    }
                }
            });*/
        },

        trackEvent: function (eventName, action, label) {
            if (typeof _gaq !== 'undefined') {
                _gaq = _gaq || [];
                _gaq.push(['_trackEvent', eventName, action, label]);
            }
        }
    };
})(jQuery);
