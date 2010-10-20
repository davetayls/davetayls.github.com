(function(){
	var tweetsLeft$ = $('<ul class="cp-twitter" />');
	var tweetsRight$ = $('<ul class="cp-twitter" />');
	var tweetToHtml = function(tweet) {
	   tweet = tweet.replace(/(^|\s)@(\w+)/g, '$1<a href="http://www.twitter.com/$2">@$2</a>');
	   return tweet.replace(/(^|\s)#(\w+)/g, '$1<a href="http://search.twitter.com/search?q=%23$2">#$2</a>');
	 };

	dt.ui.tweets = {
		init : function(){
			// load tweets
			$.getJSON('http://pipes.yahoo.com/pipes/pipe.run?_id=a0e03346d6fb907ee99c562db4e27301&_render=json&_callback=?',function(data){
				$(data.value.items).each(function(i){
					var html = '' + 
					'<li class="cp-twitter-entry cc">' +
					'	<abbr title="' + this.pubDate +'">' +
					'		' + this.pubDate.substr(8,3) +
					'	</abbr>' +
					'	<span>' +
					'		' + this.pubDate.substr(5,2) +
					'	</span> ' +
					'	' + tweetToHtml(this.title) +
					'</li>';
					
					if (i < 5){
						tweetsLeft$.append(html);					
					}else if (i < 9){
						tweetsRight$.append(html);
					}else {
						return false;
					}
				});
			});
			$('#tweets').html(tweetsLeft$);
			$('#tweetsRight').html(tweetsRight$);
		}
	};
})();
