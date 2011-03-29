define(['jquery/jquery.tweet'], {

    init: function (selector) {
        $(selector).tweet({
            username: 'davetayls',
			avatar_size: 16
        });
    }

});