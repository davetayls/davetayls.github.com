/*global require SyntaxHighlighter */
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
	require.ready(function () {
	    tweets.init('#tweets');
	});
});
