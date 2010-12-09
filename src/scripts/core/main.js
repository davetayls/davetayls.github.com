require([
    'core/promos/portfolio-window'
    ],
    function (promoWindow) {
        $(function () {
            $('pre code').addClass('brush: js');
            SyntaxHighlighter.config.tagName = 'code';
            SyntaxHighlighter.all();
            promoWindow.init();
        });
    }
);
