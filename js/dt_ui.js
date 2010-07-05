(function(){
	dt.ui = {
		init : function(){
			$('.nav-tabs').tabs();
			// load tweets
			var tweetsLeft$ = $('<ul class="cp-twitter" />');
			var tweetsRight$ = $('<ul class="cp-twitter" />');
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
					'	<a href="' + this.link + '">' + this.title + '</a>' +
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
