(function () {
    'use strict';

    // Load the config
    require(['config'], function () {

        // Configure Aloha and then make sure 'aloha' is defined
        // (by calling `Aloha.deferInit()`)
        // **before** we start the app.
        //
        // Otherwise the app will try to dynamically load Aloha
        require(['cs!configs/aloha'], function(Aloha) {
            // If this next line fails then it means aloha.js did not have a chance to load yet.
            // See the top of aloha.coffee for the need for `deferInit`
            Aloha.deferInit();

            // Load the application after the config
            require(['cs!app'], function (app) {
                app.start();
            });

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
