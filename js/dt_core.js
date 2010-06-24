var dt = {};

dt.ready = function(){
	dt.ui.init();
	dt.portfolio.init();
};

$().ready(dt.ready);
