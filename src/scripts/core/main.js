/*jslint white:false */
/*global $ require SyntaxHighlighter window*/
$('pre>code').each(function(){
    var this$ = $(this);
    this$.parent()
        .addClass('brush: js')
        .text(this$.text());
});
SyntaxHighlighter.all();

require(['core/related/tweets'], function (tweets) {	
	$(window).load(function () {
	    tweets.init('#tweets');
	});
});
