(function () {
    'use strict';

    // Load the config
    require({
        baseUrl: '../src/scripts/',

        paths: {
            test: '../../test',
            mock: '../../test/data',
            jquery: 'libs/jquery/jquery',
            mockjax: 'libs/jquery-mockjax/jquery.mockjax'
        },

        shim: {
            mockjax: ['jquery']
        }
    }, ['config'], function () {
        // Load the mock data
        require(['cs!test/demo-mock'], function () {
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
            title.innerHTML = 'Loading failed.';
        }

        if (bar) {
            bar.className = 'bar bar-danger';
        }

        throw err;
    };

})();
