# Development and Building

Below are instructions for building the book editor yourself and a layout
of how the code is organized.

## Building Yourself

1. Download and extract (if necessary)
2. Run `npm install` or `bower install` in the directory to download and install dependencies
3. Configure your server to point /workspace, /login, and /logout at index.html
4. (optional) Build a minified Javascript file by running `r.js` (see https://github.com/jrburke/r.js)

## Building Documentation

Documentation is built using `docco`.

    find . -name "*.coffee" | grep -v './bower_components/' | grep -v './node_modules' | xargs ./node_modules/docco/bin/docco

Check the `./docs` directory to read through the different modules.

## Directory Layout

* `site/scripts/collections/`   Backbone Collections
* `site/scripts/configs/`       App and 3rd party configs
* `site/scripts/controllers/`   Marionette Controllers
* `site/scripts/helpers/`       Miscellaneous helper functions
* `site/scripts/models/`        Backbone Models and Marionette Modules
* `site/scripts/nls/`           Internationalized strings
* `site/scripts/routers/`       Marionette Routers
* `site/scripts/views/`         Backbone and Marionette Views
* `site/scripts/views/layouts/` Marionette Layouts
* `site/scripts/app.coffee`     Marionette Application
* `site/scripts/config.coffee`  Requirejs Config
* `site/scripts/main.js`        Initial Requirejs Loader
* `site/scripts/session.coffee` Model of Session
* `site/styles/`                LESS and CSS Styling
* `site/templates/`             Handlebars Templates
* `site/templates/helpers/`     Handlebars Helpers
* `site/index.html`             App's HTML Page
* `test/`                       Testable mock data and scripts

License
-------

This software is subject to the provisions of the GNU Affero General Public License Version 3.0 (AGPL). See license.txt for details. Copyright (c) 2013 Rice University
