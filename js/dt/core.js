var dt = {};

dt.ready = function(){
	dt.ui.init();
	dt.portfolio.init();
	dt.analytics.init();
};

$().ready(dt.ready);
