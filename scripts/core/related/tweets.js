/*jslint browser: true, vars: true, white: true, forin: true, plusplus: true, indent: 4 */
/*global define,require */
define(['../../jquery/jquery.tweet'], {

    init: function (selector) {
        $(selector).tweet({
            username: 'davetayls',
			avatar_size: 32
        });
    }

});
