(function () {
    'use strict';

    // Load the config
    require(['config'], function () {
        // Load the application after the config
        require(['cs!app'], function (app) {
            app.start();
        });
    });

    /* If an error occurs in requirejs then change the loading HTML. */
    require.onError = function (err) {
        var title = document.getElementById('loading-text'),
            bar = document.getElementById('loading-bar');

        if (title) {
            title.innerHTML = 'Loading failed.<br />Please try again later.';
        }

        if (bar) {
            bar.className = 'bar bar-danger';
        }

        throw err;
    };

})();
