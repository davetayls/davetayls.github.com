/*jslint browser: true, vars: true, white: true, forin: true, nomen: true */
/*global define,require */
(function($){
    'use strict';
    
$.fn.extend = $.fn.extend || function(){
    var args = Array.prototype.slice.call(arguments);
    args.unshift($.fn);
    $.extend.apply($.fn, args);
};

$('pre>code').parent().addClass('prettyprint');
window.prettyPrint();

require(['related/tweets'], function (tweets) {	
    tweets.init('#tweets');
});

}(window.jQuery || window.Zepto));

