define(['jquery', 'jquery/jquery.windowViewer', 'keys'], function ($, wv, KEYS) {

    var portfolioWindow$,
	innerWindow$,
    portfolioDetail$,
    portfolioDetailWrapper$,
    detailCta$,
    detailImage$,
    closeDetails$,

    otherThumbs$;

    var hideDetail = function () {
        if ($.support.opacity) {
            portfolioDetail$.fadeOut();
        } else {
            portfolioDetail$.hide();
        }
    };
    var showDetail = function (title, caption, imageSrc, moreUrl) {
        portfolio$.removeClass('portfolioTsmall');
        detailImage$.attr('alt', title)
            .attr('src', imageSrc);
        detailCta$
            .attr('href', moreUrl)
            .html('<span class="portfolio-detail-h">' + title + '</span><span>' + caption + '</span>');
        $(window).keydown(function (e) {
            if (e.which === KEYS.ESC) {
                hideDetail();
            }
        });

        if ($.support.opacity) {
            portfolioDetail$.fadeIn();
        } else {
            portfolioDetail$.show();
        }
    };
    var loadFlickr = function () {
        var apiFeed = 'http://api.flickr.com/services/feeds/photos_public.gne?id=49288551@N04&tags=feature&format=json&jsoncallback=?';
        $.ajaxSetup({ cache: false });
        $.getJSON(apiFeed,
                function (data, textStatus) {
                    $.each(data.items, function (i, item) {
                        var item$ = $('<a />', {
                            href: item.link,
                            class: 'cp-workSquare',
                            target: '_blank'
                        });
                        var img$ = $('<img src="' + item.media.m + '" alt="' + item.title + '" />')
                            .load(function () {
                                var img$ = $(this);
                                var height = parseInt(img$.height());
                                var width = parseInt(img$.width());
                                if (height > width) {
                                    img$.attr('width', '149');
                                } else {
                                    img$.attr('height', '149');
                                }
                            })
                            .appendTo(item$);
                        item$.append('<span class="cp-workSquare-caption">' + item.title + '</span>')
                            .appendTo(otherThumbs$);
                        if (i == 6) return false;
                    });
                });
    };

    return {
        init: function () {
            portfolio$ = $('#portfolio');
            portfolioWindow$ = $('#portfolio-window');
            portfolioDetail$ = $('#portfolio-detail');

            // inner window
            innerWindow$ = $('#portfolio-window-inner');
            innerWindow$.delegate('#portfolio-window-inner-work a.cp-workSquare', 'click', function (e) {
                var this$ = $(this);
                showDetail(this$.find('>img').attr('alt'), this$.find('>span').html(), this$.data('largeImage'), this$.attr('href'));
                return false;
            });

            // detail
            portfolioDetailWrapper$ = $('<div id="portfolio-detail-wrapper" />').appendTo(portfolioDetail$);
            detailImage$ = $('<img />').appendTo(portfolioDetailWrapper$);
            detailCta$ = $('<a id="portfolio-detail-cta" class="cc">').appendTo(portfolioDetailWrapper$);
            closeDetails$ = $('<span id="portfolio-detail-close">x</span>')
                .appendTo(portfolioDetail$)
                .click(function (e) {
                    hideDetail();
                });


            portfolioWindow$.windowViewer();

            // otherThumbs$
            otherThumbs$ = $('#portfolio-window-inner-other');
            loadFlickr();
        }
    };

});