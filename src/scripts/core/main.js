/*global require SyntaxHighlighter */
define("core/main", function(){
	require([
		'core/promos/portfolio-window',
		'core/related/tweets'
		],
		function (promoWindow, tweets) {
			$(function () {
				$('pre code').addClass('brush: js');
				SyntaxHighlighter.config.tagName = 'code';
				SyntaxHighlighter.all();
				promoWindow.init();
				tweets.init('#tweets');
			});
		}
	);
});