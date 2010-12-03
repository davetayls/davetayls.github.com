var dt = {};

require(
[
	'jquery/jquery.windowViewer',
	'jquery/jquery.hint',
	'h5f/h5f',
	'core/debug',
	'core/promos/portfolio-window'
], 
function() {
    require.ready(function() {
    	dt.portfolio.init();
    });
});
