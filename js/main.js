/*jslint browser: true, vars: true, white: true, forin: true, nomen: true */
/*global define,require */
/**
* Main
* ====
* This is the main js initialiser for the page
* it is triggered by the data-main attribute on the
* require script tag.
* <script data-main="/js/main" src="/lib/require.js"></script>
* for more information see <http://requirejs.org>
*/
/*global define,require */
require(
{ 
    paths: { 
        jquery: '../lib/jquery.min',
        lib: '../lib', 
        'jquery-plugin': '../lib/jquery-plugins' 
    } 
}, 
[ 
    'jquery',
    'lib/jquery.tweet',
    'lib/jquery.pager'
], 
function ($) {
    'use strict';
    
    $('pre>code').parent().addClass('prettyprint');
    window.prettyPrint();

    $('#tweets').tweet({
        username: 'davetayls',
        avatar_size: 32
    });

    $('.list-blogs').pager({
        pageSize: 5,
        pagerLocation: "before"
    });

});

