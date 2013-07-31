(function () {
    'use strict';

    require.config({
        // # Paths
        paths: {
            // ## Template and Style paths
            templates: '../templates',
            styles: '../styles',

            // ## Requirejs plugins
            text: 'libs/requirejs-text/text',
            json: 'libs/requirejs-plugins/src/json',
            i18n: 'helpers/i18n-custom',
            hbs: 'libs/require-handlebars-plugin/hbs',
            cs: 'libs/require-cs/cs',

            // ## Core Libraries
            jquery: 'libs/jquery/jquery',
            underscore: 'libs/lodash/lodash',
            backbone: 'libs/backbone/backbone',
            // Layout manager for backbone
            marionette: 'libs/backbone.marionette/lib/backbone.marionette',

            // ## UI Libraries
            aloha: 'libs/aloha-editor/src/lib/aloha',
            select2: 'libs/select2/select2',
            moment: 'libs/moment/moment',
            // Boostrap Plugins
            bootstrapAffix: 'libs/bootstrap/js/bootstrap-affix',
            bootstrapAlert: 'libs/bootstrap/js/bootstrap-alert',
            bootstrapButton: 'libs/bootstrap/js/bootstrap-button',
            bootstrapCarousel: 'libs/bootstrap/js/bootstrap-carousel',
            bootstrapCollapse: 'libs/bootstrap/js/bootstrap-collapse',
            bootstrapDropdown: 'libs/bootstrap/js/bootstrap-dropdown',
            bootstrapModal: 'libs/bootstrap/js/bootstrap-modal',
            bootstrapPopover: 'libs/bootstrap/js/bootstrap-popover',
            bootstrapScrollspy: 'libs/bootstrap/js/bootstrap-scrollspy',
            bootstrapTab: 'libs/bootstrap/js/bootstrap-tab',
            bootstrapTooltip: 'libs/bootstrap/js/bootstrap-tooltip',
            bootstrapTransition: 'libs/bootstrap/js/bootstrap-transition',

            // ## Handlebars Dependencies
            Handlebars: 'libs/require-handlebars-plugin/Handlebars',
            i18nprecompile: 'libs/require-handlebars-plugin/hbs/i18nprecompile',
            json2: 'libs/require-handlebars-plugin/hbs/json2',

            // ## CoffeeScript Compiler
            'coffee-script': 'libs/coffee-script/index'
        },

        // # Packages
        packages: [{
            name: 'css',
            location: 'libs/require-css',
            main: 'css'
        }, {
            name: 'less',
            location: 'libs/require-less',
            main: 'less'
        }],

        // # Shims
        shim: {
            // ## Core Libraries
            underscore: {
                exports: '_'
            },

            backbone: {
                deps: ['underscore', 'jquery'],
                exports: 'Backbone'
            },

            marionette: {
                // Load the Backbone Logger before Marionette, since Marionette clones `Backbone.Events`.
                // Waiting until after Marionette loads requires modifying every single Marionette component,
                // or nearly all of them (as they nearly all individually clone `Backbone.Events`).
                deps: ['underscore', 'backbone', 'cs!helpers/logger'],
                exports: 'Marionette'
            },

            // ## UI Libraries
            // # Bootstrap Plugins
            bootstrapAffix: ['jquery'],
            bootstrapAlert: ['jquery'],
            bootstrapButton: ['jquery'],
            bootstrapCarousel: ['jquery'],
            bootstrapCollapse: ['jquery'],
            bootstrapDropdown: ['jquery'],
            bootstrapModal: ['jquery', 'bootstrapTransition'],
            bootstrapPopover: ['jquery', 'bootstrapTooltip'],
            bootstrapScrollspy: ['jquery'],
            bootstrapTab: ['jquery'],
            bootstrapTooltip: ['jquery'],
            bootstrapTransition: ['jquery'],
            bootstrapTypeahead: ['jquery'],

            // Select2
            select2: {
                deps: ['jquery', 'css!./select2'],
                exports: 'Select2'
            },

            aloha: {
                deps: ['jquery', 'bootstrapModal', 'bootstrapPopover', 'cs!configs/aloha', 'cs!configs/mathjax'],
                exports: 'Aloha',
                init: function ($, alohaConfig, mathjaxConfig) {
                    var script = document.createElement('script'),
                        url = 'http://cdn.mathjax.org/mathjax/2.0-latest/MathJax.js',
                        config = '?config=TeX-MML-AM_HTMLorMML-full&amp;delayStartupUntil=configured';

                    script.src = url + config;
                    script.text = 'MathJax.Hub.Config(' + JSON.stringify(mathjaxConfig) + ');' +
                        'MathJax.Hub.Startup.onload();';

                    document.getElementsByTagName('head')[0].appendChild(script);

                    $.browser.version = 10000; // Hack to fix aloha-editor's version checking

                    //return Aloha;
                }
            }
        },

        // Handlebars Requirejs Plugin Configuration
        // Used when loading templates `'hbs!...'`.
        hbs: {
            disableI18n: true,
            helperPathCallback: function (name) {
                return 'cs!templates/handlebars/' + name;
            },
            templateExtension: 'html'
        }
    });

})();
