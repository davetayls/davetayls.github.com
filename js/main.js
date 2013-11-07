require(
{
    paths: {
        jquery: '../lib/jquery.min',
        lib: '../lib'
    }
},
[
    'jquery',
    'lib/jquery.pager'
],
function ($) {
    'use strict';

    // allow active state in ios
    document.addEventListener("touchstart", function(){}, true);

    $('pre>code').parent().addClass('prettyprint');
    window.prettyPrint();

    $('.list-blogs').pager({
        pageSize: 5,
        maxPageNavItems: 6,
        pagerLocation: "before"
    });

    $(document).on('click', '.show-related', function(e){
        $('body').toggleClass('js-nav');
        e.preventDefault();
    });

});

