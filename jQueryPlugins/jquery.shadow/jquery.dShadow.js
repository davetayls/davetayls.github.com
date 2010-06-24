/*
addShadow
------------------------------------------------------------*/
(function($) {
    $.fn.addShadow = function() {
        this.each(function() {
            $(this)
                .wrapInner('<div class="shadow-content cc" />')
                .wrapInner('<div class="shadow-content-l" />')
                .wrapInner('<div class="shadow-content-b" />')
                .prepend('<div class="shadow-tl">')
                .prepend('<div class="shadow-tr">')
                .prepend('<div class="shadow-bl">')
                .prepend('<div class="shadow-br">');
        });
    };
})(jQuery);