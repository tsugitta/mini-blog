'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var TabBar = (function () {
  function TabBar($postTab, $qiitaTab, $postList, $qiitaList, $pagination) {
    _classCallCheck(this, TabBar);

    this.$postTab = $postTab;
    this.$qiitaTab = $qiitaTab;
    this.$postList = $postList;
    this.$qiitaList = $qiitaList;
    this.$pagination = $pagination;

    this.$postTab.on('click', this.onClickPostTab.bind(this));
    this.$qiitaTab.on('click', this.onClickQiitaTab.bind(this));
  }

  _createClass(TabBar, [{
    key: 'onClickPostTab',
    value: function onClickPostTab() {
      this.addSelectClassTo(this.$postTab);
      this.hideContents();
      this.$postList.show();
      this.$pagination.show();
    }
  }, {
    key: 'onClickQiitaTab',
    value: function onClickQiitaTab() {
      this.addSelectClassTo(this.$qiitaTab);
      this.hideContents();
      this.$qiitaList.show();
    }
  }, {
    key: 'addSelectClassTo',
    value: function addSelectClassTo($tab) {
      this.$postTab.removeClass('selected');
      this.$qiitaTab.removeClass('selected');
      $tab.addClass('selected');
    }
  }, {
    key: 'hideContents',
    value: function hideContents() {
      this.$postList.hide();
      this.$qiitaList.hide();
      this.$pagination.hide();
    }
  }]);

  return TabBar;
})();

var QiitaPostManager = (function () {
  _createClass(QiitaPostManager, null, [{
    key: 'qiitaUrl',
    get: function get() {
      return 'https://qiita.com/api/v1/users/tsugita/items';
    }
  }]);

  function QiitaPostManager($qiitaList) {
    var _this = this;

    _classCallCheck(this, QiitaPostManager);

    this.$qiitaList = $qiitaList;

    this.fetchPosts().done(function () {
      _this.render();
    });
  }

  _createClass(QiitaPostManager, [{
    key: 'render',
    value: function render() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.posts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var post = _step.value;

          this.$qiitaList.append(post.render());
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator['return']) {
            _iterator['return']();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: 'fetchPosts',
    value: function fetchPosts() {
      var _this2 = this;

      var posts = [];
      var deferred = $.Deferred();

      $.getJSON(QiitaPostManager.qiitaUrl).done(function (gotPosts) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = gotPosts[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var gotPost = _step2.value;

            var post = new QiitaPost(gotPost);
            posts.push(post);
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2['return']) {
              _iterator2['return']();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        deferred.resolve();
      }).fail(function (jqXHR) {
        console.log(jqXHR);
      });

      deferred.done(function () {
        _this2.posts = posts;
      });

      return deferred;
    }
  }]);

  return QiitaPostManager;
})();

var QiitaPost = (function () {
  function QiitaPost(post) {
    _classCallCheck(this, QiitaPost);

    this.title = post.title;
    this.url = post.url;
    this.created_at = this.onlyMonthAndDayFormattedString(post.created_at);
  }

  _createClass(QiitaPost, [{
    key: 'onlyMonthAndDayFormattedString',
    value: function onlyMonthAndDayFormattedString(dateString) {
      var date = new Date(dateString);
      var dateItems = date.toDateString().split(' ');
      var monthString = dateItems[1];
      var dayString = dateItems[2];
      return monthString + ' ' + dayString;
    }
  }, {
    key: 'render',
    value: function render() {
      return '\n      <li>\n          <a href="' + this.url + '"><aside class="dates">' + this.created_at + '</aside></a>\n          <a href="' + this.url + '">' + this.title + '</a>\n      </li>\n    ';
    }
  }]);

  return QiitaPost;
})();
