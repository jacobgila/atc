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

* `src/scripts/collections/`   Backbone Collections
* `src/scripts/configs/`       App and 3rd party configs
* `src/scripts/controllers/`   Marionette Controllers
* `src/scripts/helpers/`       Miscellaneous helper functions
* `src/scripts/models/`        Backbone Models and Marionette Modules
* `src/scripts/nls/`           Internationalized strings
* `src/scripts/routers/`       Marionette Routers
* `src/scripts/views/`         Backbone and Marionette Views
* `src/scripts/views/layouts/` Marionette Layouts
* `src/scripts/app.coffee`     Marionette Application
* `src/scripts/config.coffee`  Requirejs Config
* `src/scripts/main.js`        Initial Requirejs Loader
* `src/scripts/session.coffee` Model of Session
* `src/styles/`                LESS and CSS Styling
* `src/templates/`             Handlebars Templates
* `src/templates/helpers/`     Handlebars Helpers
* `src/index.html`             App's HTML Page
* `test/`                       Testable mock data and scripts

License
-------

This software is subject to the provisions of the GNU Affero General Public License Version 3.0 (AGPL). See license.txt for details. Copyright (c) 2013 Rice University
