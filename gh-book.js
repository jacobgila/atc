// Generated by CoffeeScript 1.3.3
(function() {

  define(['underscore', 'backbone', 'bookish/controller', 'bookish/models', 'epub/models', 'bookish/auth', 'gh-book/views', 'css!bookish'], function(_, Backbone, Controller, AtcModels, EpubModels, Auth, Views) {
    var $signin, DEBUG, STORED_KEYS, b, props, readDir, readFile, resetDesktop, uuid, writeFile,
      _this = this;
    DEBUG = true;
    uuid = b = function(a) {
      if (a) {
        return (a ^ Math.random() * 16 >> a / 4).toString(16);
      } else {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, b);
      }
    };
    writeFile = function(path, text, commitText) {
      return Auth.getRepo().write(Auth.get('branch'), "" + (Auth.get('rootPath')) + path, text, commitText);
    };
    readFile = function(path) {
      return Auth.getRepo().read(Auth.get('branch'), "" + (Auth.get('rootPath')) + path);
    };
    readDir = function(path) {
      return Auth.getRepo().contents(Auth.get('branch'), path);
    };
    Backbone.sync = function(method, model, options) {
      var callback, id, path, ret,
        _this = this;
      callback = function(err, value) {
        if (err) {
          return typeof error === "function" ? error(model, err, options) : void 0;
        }
        return typeof success === "function" ? success(model, value, options) : void 0;
      };
      path = model.id || (typeof model.url === "function" ? model.url() : void 0) || model.url;
      if (DEBUG) {
        console.log(method, path);
      }
      ret = null;
      switch (method) {
        case 'read':
          ret = readFile(path, callback);
          break;
        case 'update':
          ret = writeFile(path, model.serialize(), 'Editor Save', callback);
          break;
        case 'create':
          id = _uuid();
          model.set('id', id);
          ret = writeFile(path, model.serialize(), callback);
          break;
        default:
          throw "Model sync method not supported: " + method;
      }
      ret.done(function(value) {
        return options != null ? typeof options.success === "function" ? options.success(value) : void 0 : void 0;
      });
      ret.fail(function(error) {
        return options != null ? typeof options.error === "function" ? options.error(ret, error) : void 0 : void 0;
      });
      return ret;
    };
    EpubModels.EPUB_CONTAINER.on('error', function(model) {
      var url;
      url = "https://github.com/" + (Auth.get('repoUser')) + "/" + (Auth.get('repoName')) + "/tree/" + (Auth.get('branch')) + "/" + (Auth.get('rootPath')) + (model.url());
      return alert("There was a problem getting " + url + "\nPlease check your settings and try again.");
    });
    resetDesktop = function() {
      AtcModels.ALL_CONTENT.reset();
      EpubModels.EPUB_CONTAINER.reset();
      EpubModels.EPUB_CONTAINER._promise = null;
      if (!Backbone.History.started) {
        Controller.start();
      }
      Backbone.history.navigate('workspace');
      return EpubModels.EPUB_CONTAINER.loaded().then(function() {
        return EpubModels.EPUB_CONTAINER.each(function(book) {
          return book.loaded();
        });
      });
    };
    STORED_KEYS = ['repoUser', 'repoName', 'branch', 'rootPath', 'username', 'password'];
    Auth.on('change', function() {
      var key, value, _ref, _ref1, _results;
      if (!_.isEmpty(_.pick(Auth.changed, STORED_KEYS))) {
        if (Auth.get('rateRemaining') && Auth.get('password') && !Auth.previousAttributes()['password']) {
          return;
        }
        resetDesktop();
        _ref = Auth.toJSON();
        _results = [];
        for (key in _ref) {
          value = _ref[key];
          _results.push((_ref1 = _this.sessionStorage) != null ? _ref1.setItem(key, value) : void 0);
        }
        return _results;
      }
    });
    if (!Backbone.History.started) {
      Controller.start();
    }
    Backbone.history.navigate('workspace');
    props = {};
    _.each(STORED_KEYS, function(key) {
      var value, _ref;
      value = (_ref = this.sessionStorage) != null ? _ref.getItem(key) : void 0;
      if (value) {
        return props[key] = value;
      }
    });
    Auth.set(props);
    $signin = jQuery('#sign-in-modal');
    $signin.modal('show');
    return $signin.on('hide', function() {
      return setTimeout(resetDesktop, 100);
    });
  });

}).call(this);