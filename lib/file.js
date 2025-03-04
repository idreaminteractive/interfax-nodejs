'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _mime = require('mime');

var _mime2 = _interopRequireDefault(_mime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var File = function () {
  function File(documents, location, options) {
    _classCallCheck(this, File);

    this._documents = documents;
    this.ready = false;
    this._callbacks = [];

    options = options || {};
    this._chunkSize = options.chunkSize || 1024 * 1024;

    if (options.mimeType) {
      this.initializeBinary(location, options.mimeType);
    } else if (location.startsWith('http://') || location.startsWith('https://')) {
      this.initializeUrl(location);
    } else {
      this.initializePath(location);
    }
  }

  _createClass(File, [{
    key: 'onReady',
    value: function onReady(callback) {
      if (this.ready) return callback(this.ready);
      this._callbacks.push(callback);
    }
  }, {
    key: 'initializeBinary',
    value: function initializeBinary(data, mimeType) {
      if (data.length > this._chunkSize) {
        return this.initializeDocument(data, mimeType);
      }

      this.header = 'Content-Type: ' + mimeType;
      this.body = data;
      this._triggerReady(true);
    }
  }, {
    key: 'initializeUrl',
    value: function initializeUrl(url) {
      this.header = 'Content-Location: ' + url;
      this.body = null;
      this._triggerReady(true);
    }
  }, {
    key: 'initializePath',
    value: function initializePath(path) {
      var data = _fs2.default.readFileSync(path);
      var mimeType = _mime2.default.lookup(path);

      this.initializeBinary(data, mimeType);
    }
  }, {
    key: 'initializeDocument',
    value: function initializeDocument(data, mimeType) {
      var extension = _mime2.default.extension(mimeType);
      var filename = 'upload-' + Date.now() + '.' + extension;

      this._documents.create(filename, data.length).then(this._startUpload(data).bind(this)).catch(this._triggerReady.bind(this));
    }
  }, {
    key: '_startUpload',
    value: function _startUpload(data) {
      var _this = this;

      return function (document) {
        _this.header = 'Content-Location: ' + document.url;
        _this.body = null;

        _this._upload(0, document, data)();
      };
    }
  }, {
    key: '_upload',
    value: function _upload(cursor, document, data) {
      var _this2 = this;

      var finished = cursor >= data.length;

      return function () {
        if (finished) {
          return _this2._triggerReady(true);
        }

        var chunk = data.slice(cursor, cursor + _this2._chunkSize);
        var nextCursor = cursor + Buffer.byteLength(chunk);

        return _this2._documents.upload(document.id, cursor, nextCursor - 1, chunk).then(_this2._upload(nextCursor, document, data).bind(_this2)).catch(_this2._triggerReady.bind(_this2));
      };
    }
  }, {
    key: '_triggerReady',
    value: function _triggerReady(response) {
      this.ready = response === true;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this._callbacks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var callback = _step.value;

          callback(response);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return this.ready;
    }
  }]);

  return File;
}();

exports.default = File;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9maWxlLmpzIl0sIm5hbWVzIjpbIkZpbGUiLCJkb2N1bWVudHMiLCJsb2NhdGlvbiIsIm9wdGlvbnMiLCJfZG9jdW1lbnRzIiwicmVhZHkiLCJfY2FsbGJhY2tzIiwiX2NodW5rU2l6ZSIsImNodW5rU2l6ZSIsIm1pbWVUeXBlIiwiaW5pdGlhbGl6ZUJpbmFyeSIsInN0YXJ0c1dpdGgiLCJpbml0aWFsaXplVXJsIiwiaW5pdGlhbGl6ZVBhdGgiLCJjYWxsYmFjayIsInB1c2giLCJkYXRhIiwibGVuZ3RoIiwiaW5pdGlhbGl6ZURvY3VtZW50IiwiaGVhZGVyIiwiYm9keSIsIl90cmlnZ2VyUmVhZHkiLCJ1cmwiLCJwYXRoIiwiZnMiLCJyZWFkRmlsZVN5bmMiLCJtaW1lIiwibG9va3VwIiwiZXh0ZW5zaW9uIiwiZmlsZW5hbWUiLCJEYXRlIiwibm93IiwiY3JlYXRlIiwidGhlbiIsIl9zdGFydFVwbG9hZCIsImJpbmQiLCJjYXRjaCIsImRvY3VtZW50IiwiX3VwbG9hZCIsImN1cnNvciIsImZpbmlzaGVkIiwiY2h1bmsiLCJzbGljZSIsIm5leHRDdXJzb3IiLCJCdWZmZXIiLCJieXRlTGVuZ3RoIiwidXBsb2FkIiwiaWQiLCJyZXNwb25zZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7OztJQUVNQSxJO0FBQ0osZ0JBQVlDLFNBQVosRUFBdUJDLFFBQXZCLEVBQWlDQyxPQUFqQyxFQUEwQztBQUFBOztBQUN4QyxTQUFLQyxVQUFMLEdBQWtCSCxTQUFsQjtBQUNBLFNBQUtJLEtBQUwsR0FBYSxLQUFiO0FBQ0EsU0FBS0MsVUFBTCxHQUFrQixFQUFsQjs7QUFFQUgsY0FBVUEsV0FBVyxFQUFyQjtBQUNBLFNBQUtJLFVBQUwsR0FBa0JKLFFBQVFLLFNBQVIsSUFBcUIsT0FBSyxJQUE1Qzs7QUFFQSxRQUFJTCxRQUFRTSxRQUFaLEVBQXNCO0FBQ3BCLFdBQUtDLGdCQUFMLENBQXNCUixRQUF0QixFQUFnQ0MsUUFBUU0sUUFB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QW1CYyxJQUFuQixDQUF3QixNQUF4QixDQUZGLENBQVA7QUFHRCxPQVREO0FBVUQ7OztrQ0FFYWEsUSxFQUFVO0FBQ3RCLFdBQUszQyxLQUFMLEdBQWMyQyxhQUFhLElBQTNCO0FBRHNCO0FBQUE7QUFBQTs7QUFBQTtBQUV0Qiw2QkFBcUIsS0FBSzFDLFVBQTFCLDhIQUFzQztBQUFBLGNBQTdCUSxRQUE2Qjs7QUFDcENBLG1CQUFTa0MsUUFBVDtBQUNEO0FBSnFCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBS3RCLGFBQU8sS0FBSzNDLEtBQVo7QUFDRDs7Ozs7O2tCQUdZTCxJIiwiZmlsZSI6ImZpbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZnMgICBmcm9tICdmcyc7XG5pbXBvcnQgbWltZSBmcm9tICdtaW1lJztcblxuY2xhc3MgRmlsZSB7XG4gIGNvbnN0cnVjdG9yKGRvY3VtZW50cywgbG9jYXRpb24sIG9wdGlvbnMpIHtcbiAgICB0aGlzLl9kb2N1bWVudHMgPSBkb2N1bWVudHM7XG4gICAgdGhpcy5yZWFkeSA9IGZhbHNlO1xuICAgIHRoaXMuX2NhbGxiYWNrcyA9IFtdO1xuXG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgdGhpcy5fY2h1bmtTaXplID0gb3B0aW9ucy5jaHVua1NpemUgfHwgMTAyNCoxMDI0O1xuXG4gICAgaWYgKG9wdGlvbnMubWltZVR5cGUpIHtcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZUJpbmFyeShsb2NhdGlvbiwgb3B0aW9ucy5taW1lVHlwZSk7XG4gICAgfSBlbHNlIGlmIChsb2NhdGlvbi5zdGFydHNXaXRoKCdodHRwOi8vJykgfHwgbG9jYXRpb24uc3RhcnRzV2l0aCgnaHR0cHM6Ly8nKSkge1xuICAgICAgdGhpcy5pbml0aWFsaXplVXJsKGxvY2F0aW9uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pbml0aWFsaXplUGF0aChsb2NhdGlvbik7XG4gICAgfVxuICB9XG5cbiAgb25SZWFkeShjYWxsYmFjaykge1xuICAgIGlmICh0aGlzLnJlYWR5KSByZXR1cm4gY2FsbGJhY2sodGhpcy5yZWFkeSk7XG4gICAgdGhpcy5fY2FsbGJhY2tzLnB1c2goY2FsbGJhY2spO1xuICB9XG5cbiAgaW5pdGlhbGl6ZUJpbmFyeShkYXRhLCBtaW1lVHlwZSkge1xuICAgIGlmIChkYXRhLmxlbmd0aCA+IHRoaXMuX2NodW5rU2l6ZSkge1xuICAgICAgcmV0dXJuIHRoaXMuaW5pdGlhbGl6ZURvY3VtZW50KGRhdGEsIG1pbWVUeXBlKTtcbiAgICB9XG5cbiAgICB0aGlzLmhlYWRlciA9IGBDb250ZW50LVR5cGU6ICR7bWltZVR5cGV9YDtcbiAgICB0aGlzLmJvZHkgICA9IGRhdGE7XG4gICAgdGhpcy5fdHJpZ2dlclJlYWR5KHRydWUpO1xuICB9XG5cbiAgaW5pdGlhbGl6ZVVybCh1cmwpIHtcbiAgICB0aGlzLmhlYWRlciA9IGBDb250ZW50LUxvY2F0aW9uOiAke3VybH1gO1xuICAgIHRoaXMuYm9keSAgID0gbnVsbDtcbiAgICB0aGlzLl90cmlnZ2VyUmVhZHkodHJ1ZSk7XG4gIH1cblxuICBpbml0aWFsaXplUGF0aChwYXRoKSB7XG4gICAgbGV0IGRhdGEgPSBmcy5yZWFkRmlsZVN5bmMocGF0aCk7XG4gICAgbGV0IG1pbWVUeXBlID0gbWltZS5sb29rdXAocGF0aCk7XG5cbiAgICB0aGlzLmluaXRpYWxpemVCaW5hcnkoZGF0YSwgbWltZVR5cGUpO1xuICB9XG5cbiAgaW5pdGlhbGl6ZURvY3VtZW50KGRhdGEsIG1pbWVUeXBlKSB7XG4gICAgbGV0IGV4dGVuc2lvbiA9IG1pbWUuZXh0ZW5zaW9uKG1pbWVUeXBlKTtcbiAgICBsZXQgZmlsZW5hbWUgPSBgdXBsb2FkLSR7RGF0ZS5ub3coKX0uJHtleHRlbnNpb259YDtcblxuICAgIHRoaXMuX2RvY3VtZW50cy5jcmVhdGUoZmlsZW5hbWUsIGRhdGEubGVuZ3RoKVxuICAgICAgLnRoZW4odGhpcy5fc3RhcnRVcGxvYWQoZGF0YSkuYmluZCh0aGlzKSlcbiAgICAgIC5jYXRjaCh0aGlzLl90cmlnZ2VyUmVhZHkuYmluZCh0aGlzKSk7XG4gIH1cblxuICBfc3RhcnRVcGxvYWQoZGF0YSkge1xuICAgIHJldHVybiAoZG9jdW1lbnQpID0+IHtcbiAgICAgIHRoaXMuaGVhZGVyID0gYENvbnRlbnQtTG9jYXRpb246ICR7ZG9jdW1lbnQudXJsfWA7XG4gICAgICB0aGlzLmJvZHkgPSBudWxsO1xuXG4gICAgICB0aGlzLl91cGxvYWQoMCwgZG9jdW1lbnQsIGRhdGEpKCk7XG4gICAgfTtcbiAgfVxuXG4gIF91cGxvYWQoY3Vyc29yLCBkb2N1bWVudCwgZGF0YSkge1xuICAgIGxldCBmaW5pc2hlZCA9IChjdXJzb3IgPj0gZGF0YS5sZW5ndGgpO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGlmIChmaW5pc2hlZCkgeyByZXR1cm4gdGhpcy5fdHJpZ2dlclJlYWR5KHRydWUpOyB9XG5cbiAgICAgIGxldCBjaHVuayA9IGRhdGEuc2xpY2UoY3Vyc29yLCBjdXJzb3IrdGhpcy5fY2h1bmtTaXplKTtcbiAgICAgIGxldCBuZXh0Q3Vyc29yID0gY3Vyc29yK0J1ZmZlci5ieXRlTGVuZ3RoKGNodW5rKTtcblxuICAgICAgcmV0dXJuIHRoaXMuX2RvY3VtZW50cy51cGxvYWQoZG9jdW1lbnQuaWQsIGN1cnNvciwgbmV4dEN1cnNvci0xLCBjaHVuaylcbiAgICAgICAgLnRoZW4odGhpcy5fdXBsb2FkKG5leHRDdXJzb3IsIGRvY3VtZW50LCBkYXRhKS5iaW5kKHRoaXMpKVxuICAgICAgICAuY2F0Y2godGhpcy5fdHJpZ2dlclJlYWR5LmJpbmQodGhpcykpO1xuICAgIH07XG4gIH1cbiAgXG4gIF90cmlnZ2VyUmVhZHkocmVzcG9uc2UpIHtcbiAgICB0aGlzLnJlYWR5ID0gKHJlc3BvbnNlID09PSB0cnVlKTtcbiAgICBmb3IgKGxldCBjYWxsYmFjayBvZiB0aGlzLl9jYWxsYmFja3MpIHtcbiAgICAgIGNhbGxiYWNrKHJlc3BvbnNlKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucmVhZHk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRmlsZTtcbiJdfQ==