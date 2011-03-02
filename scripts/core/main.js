/*global define */
define('core/promos/portfolioWindow',['jquery/jquery.windowViewer', 'keys'], function (wv, KEYS) {

    var portfolio$,
        portfolioWindow$,
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
                            'class': 'cp-workSquare',
                            target: '_blank'
                        });
                        var img$ = $('<img src="' + item.media.m + '" alt="' + item.title + '" />')
                            .load(function () {
                                var img$ = $(this);
                                var height = parseInt(img$.height(), 10);
                                var width = parseInt(img$.width(), 10);
                                if (height > width) {
                                    img$.attr('width', '149');
                                } else {
                                    img$.attr('height', '149');
                                }
                            })
                            .appendTo(item$);
                        item$.append('<span class="cp-workSquare-caption">' + item.title + '</span>')
                            .appendTo(otherThumbs$);
                        if (i === 6) {
                            return false;
                        }
                    });
                });
    };

    return {
        init: function () {
		
			// don't initialise if on a very small screen
			if ($(window).width() < 481){
				return;
			}
		
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
            
			$(window).load(loadFlickr);
        }
    };

});
/*jslint white:false */
/*global $ require SyntaxHighlighter window*/
$('pre>code').each(function(){
    var this$ = $(this);
    this$.parent()
        .addClass('brush: js')
        .text(this$.text());
});
SyntaxHighlighter.all();

require(['core/dt'], function (dt) {});
require(['core/promos/portfolioWindow'], function (promoWindow) {
	promoWindow.init();
});
require(['core/related/tweets'], function (tweets) {
	
	$(window).load(function () {
	    tweets.init('#tweets');
	});
});
define("core/main", function(){});
/*global define */
define('core/dt',{});
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
					height : innerBox.height(),
					width : innerBox.width()
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
define("jquery/jquery.windowViewer", function(){});
// key codes
/*global define */
define('keys',{
    ENTER:  13,
    ESC:    27,
    TAB:    9
});
define('core/related/tweets',['jquery/jquery.tweet'], {

    init: function (selector) {
        $(selector).tweet({
            username: 'davetayls'
        });
    }

});
(function($) {
 
  $.fn.tweet = function(o){
    var s = {
      username: ["seaofclouds"],              // [string]   required, unless you want to display our tweets. :) it can be an array, just do ["username1","username2","etc"]
      list: null,                              //[string]   optional name of list belonging to username
      avatar_size: null,                      // [integer]  height and width of avatar if displayed (48px max)
      count: 3,                               // [integer]  how many tweets to display?
      intro_text: null,                       // [string]   do you want text BEFORE your your tweets?
      outro_text: null,                       // [string]   do you want text AFTER your tweets?
      join_text:  null,                       // [string]   optional text in between date and tweet, try setting to "auto"
      auto_join_text_default: "i said,",      // [string]   auto text for non verb: "i said" bullocks
      auto_join_text_ed: "i",                 // [string]   auto text for past tense: "i" surfed
      auto_join_text_ing: "i am",             // [string]   auto tense for present tense: "i was" surfing
      auto_join_text_reply: "i replied to",   // [string]   auto tense for replies: "i replied to" @someone "with"
      auto_join_text_url: "i was looking at", // [string]   auto tense for urls: "i was looking at" http:...
      loading_text: null,                     // [string]   optional loading text, displayed while tweets load
      query: null,                            // [string]   optional search query
      refresh_interval: null                  // [integer]  optional number of seconds after which to reload tweets
    };
    
    if(o) $.extend(s, o);
    
    $.fn.extend({
      linkUrl: function() {
        var returning = [];
        var regexp = /((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi;
        this.each(function() {
          returning.push(this.replace(regexp,"<a href=\"$1\">$1</a>"));
        });
        return $(returning);
      },
      linkUser: function() {
        var returning = [];
        var regexp = /[\@]+([A-Za-z0-9-_]+)/gi;
        this.each(function() {
          returning.push(this.replace(regexp,"<a href=\"http://twitter.com/$1\">@$1</a>"));
        });
        return $(returning);
      },
      linkHash: function() {
        var returning = [];
        var regexp = /(?:^| )[\#]+([A-Za-z0-9-_]+)/gi;
        this.each(function() {
          returning.push(this.replace(regexp, ' <a href="http://search.twitter.com/search?q=&tag=$1&lang=all&from='+s.username.join("%2BOR%2B")+'">#$1</a>'));
        });
        return $(returning);
      },
      capAwesome: function() {
        var returning = [];
        this.each(function() {
          returning.push(this.replace(/\b(awesome)\b/gi, '<span class="awesome">$1</span>'));
        });
        return $(returning);
      },
      capEpic: function() {
        var returning = [];
        this.each(function() {
          returning.push(this.replace(/\b(epic)\b/gi, '<span class="epic">$1</span>'));
        });
        return $(returning);
      },
      makeHeart: function() {
        var returning = [];
        this.each(function() {
          returning.push(this.replace(/(&lt;)+[3]/gi, "<tt class='heart'>&#x2665;</tt>"));
        });
        return $(returning);
      }
    });

    function parse_date(date_str) {
      // The non-search twitter APIs return inconsistently-formatted dates, which Date.parse
      // cannot handle in IE. We therefore perform the following transformation:
      // "Wed Apr 29 08:53:31 +0000 2009" => "Wed, Apr 29 2009 08:53:31 +0000"
      return Date.parse(date_str.replace(/^([a-z]{3})( [a-z]{3} \d\d?)(.*)( \d{4})$/i, '$1,$2$4$3'));
    }

    function relative_time(time_value) {
      var parsed_date = parse_date(time_value);
      var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
      var delta = parseInt((relative_to.getTime() - parsed_date) / 1000);
      var r = '';
      if (delta < 60) {
	r = delta + ' seconds ago';
      } else if(delta < 120) {
	r = 'a minute ago';
      } else if(delta < (45*60)) {
	r = (parseInt(delta / 60, 10)).toString() + ' minutes ago';
      } else if(delta < (2*60*60)) {
	r = 'an hour ago';
      } else if(delta < (24*60*60)) {
	r = '' + (parseInt(delta / 3600, 10)).toString() + ' hours ago';
      } else if(delta < (48*60*60)) {
	r = 'a day ago';
      } else {
	r = (parseInt(delta / 86400, 10)).toString() + ' days ago';
      }
      return 'about ' + r;
    }

    function build_url() {
      var proto = ('https:' == document.location.protocol ? 'https:' : 'http:');
      if (s.list) {
        return proto+"//api.twitter.com/1/"+s.username[0]+"/lists/"+s.list+"/statuses.json?per_page="+s.count+"&callback=?";
      } else if (s.query == null && s.username.length == 1) {
        return proto+'//api.twitter.com/1/statuses/user_timeline.json?screen_name='+s.username[0]+'&count='+s.count+'&include_rts=1&callback=?';
      } else {
        var query = (s.query || 'from:'+s.username.join(' OR from:'));
        return proto+'//search.twitter.com/search.json?&q='+encodeURIComponent(query)+'&rpp='+s.count+'&callback=?';
      }
    }

    return this.each(function(i, widget){
      var list = $('<ul class="tweet_list">').appendTo(widget);
      var intro = '<p class="tweet_intro">'+s.intro_text+'</p>';
      var outro = '<p class="tweet_outro">'+s.outro_text+'</p>';
      var loading = $('<p class="loading">'+s.loading_text+'</p>');

      if(typeof(s.username) == "string"){
        s.username = [s.username];
      }

      if (s.loading_text) $(widget).append(loading);
      $(widget).bind("load", function(){
        $.getJSON(build_url(), function(data){
          if (s.loading_text) loading.remove();
          if (s.intro_text) list.before(intro);
          list.empty();
          var tweets = (data.results || data);
          $.each(tweets, function(i,item){
            // auto join text based on verb tense and content
            if (s.join_text == "auto") {
              if (item.text.match(/^(@([A-Za-z0-9-_]+)) .*/i)) {
                var join_text = s.auto_join_text_reply;
              } else if (item.text.match(/(^\w+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&\?\/.=]+) .*/i)) {
                var join_text = s.auto_join_text_url;
              } else if (item.text.match(/^((\w+ed)|just) .*/im)) {
                var join_text = s.auto_join_text_ed;
              } else if (item.text.match(/^(\w*ing) .*/i)) {
                var join_text = s.auto_join_text_ing;
              } else {
                var join_text = s.auto_join_text_default;
              }
            } else {
              var join_text = s.join_text;
            };
   
            var from_user = item.from_user || item.user.screen_name;
            var profile_image_url = item.profile_image_url || item.user.profile_image_url;
            var join_template = '<span class="tweet_join"> '+join_text+' </span>';
            var join = ((s.join_text) ? join_template : ' ');
            var avatar_template = '<a class="tweet_avatar" href="http://twitter.com/'+from_user+'"><img src="'+profile_image_url+'" height="'+s.avatar_size+'" width="'+s.avatar_size+'" alt="'+from_user+'\'s avatar" title="'+from_user+'\'s avatar" border="0"/></a>';
            var avatar = (s.avatar_size ? avatar_template : '');
            var date = '<span class="tweet_time"><a href="http://twitter.com/'+from_user+'/statuses/'+item.id_str+'" title="view tweet on twitter">'+relative_time(item.created_at)+'</a></span>';
            var text = '<span class="tweet_text">' +$([item.text]).linkUrl().linkUser().linkHash().makeHeart().capAwesome().capEpic()[0]+ '</span>';
   
            // until we create a template option, arrange the items below to alter a tweet's display.
            list.append('<li>' + avatar + date + join + text + '</li>');
   
            list.children('li:first').addClass('tweet_first');
            list.children('li:odd').addClass('tweet_even');
            list.children('li:even').addClass('tweet_odd');
          });
          if (s.outro_text) list.after(outro);
          $(widget).trigger("loaded").trigger((tweets.length == 0 ? "empty" : "full"));
          if (s.refresh_interval) {
            window.setTimeout(function() { $(widget).trigger("load"); }, 1000 * s.refresh_interval);
          };
        });
      }).trigger("load");
    });
  };
})(jQuery);
define("jquery/jquery.tweet", function(){});
