'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _responseHandler = require('./response-handler');

var _responseHandler2 = _interopRequireDefault(_responseHandler);

var _errorHandler = require('./error-handler');

var _errorHandler2 = _interopRequireDefault(_errorHandler);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Client = function () {
  function Client(https, credentials, version, debug) {
    _classCallCheck(this, Client);

    this._https = https;
    this._credentials = credentials || {};
    this._version = version;
    this._debug = debug || false;
    this._validateCredentials();
  }

  _createClass(Client, [{
    key: 'get',
    value: function get(path, params, callback) {
      return this.request('GET', path, {}, null, params, callback);
    }
  }, {
    key: 'post',
    value: function post(path, params, callback) {
      return this.request('POST', path, {}, null, params, callback);
    }
  }, {
    key: 'delete',
    value: function _delete(path, params, callback) {
      return this.request('DELETE', path, {}, null, params, callback);
    }
  }, {
    key: 'request',
    value: function request(method, path, headers, body, params, callback) {
      var emitter = new _events2.default();
      var __callback = this._callback(params, callback);
      var promise = this._promise(emitter, __callback);
      var options = this._options(method, path, headers, params);
      var request = this._https.request(options);

      if (this._debug) {
        console.log(headers); // eslint-disable-line no-console
        console.log(options); // eslint-disable-line no-console
      }

      request.on('response', new _responseHandler2.default(emitter, this._debug));
      request.on('error', new _errorHandler2.default(emitter, this._debug));

      this._writeBody(request, body);

      request.end();

      return promise;
    }

    // private methods

  }, {
    key: '_validateCredentials',
    value: function _validateCredentials() {
      this._credentials.username = this._credentials.username || process.env.INTERFAX_USERNAME;
      if (!this._credentials.username) throw new Error('Missing argument: username');

      this._credentials.password = this._credentials.password || process.env.INTERFAX_PASSWORD;
      if (!this._credentials.password) throw new Error('Missing argument: password');
    }
  }, {
    key: '_callback',
    value: function _callback() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      for (var i = args.length - 1; i >= 0; i--) {
        var argument = args[i];
        if (typeof argument === 'function') return argument;
      }
      return null;
    }
  }, {
    key: '_options',
    value: function _options(method, path, headers, params) {
      headers['User-Agent'] = 'InterFAX Node ' + this._version;

      return {
        'host': 'restca-sl.interfax.net',
        'path': this._path(path, params),
        'port': 443,
        'auth': this._credentials.username + ':' + this._credentials.password,
        'method': method,
        'headers': headers
      };
    }
  }, {
    key: '_path',
    value: function _path(path, params) {
      var query = this._query(params);
      return path + '?' + query;
    }
  }, {
    key: '_query',
    value: function _query(params) {
      if ((typeof params === 'undefined' ? 'undefined' : _typeof(params)) !== 'object') params = {};
      return Object.keys(params).map(function (k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(params[k]);
      }).join('&');
    }
  }, {
    key: '_writeBody',
    value: function _writeBody(request, body) {
      if (!body) {
        return;
      }

      if (typeof body === 'string' || body instanceof Buffer) {
        request.write(body);
      } else {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = body[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var part = _step.value;

            request.write(part);
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
      }
    }
  }, {
    key: '_promise',
    value: function _promise(emitter, callback) {
      return new _bluebird2.default(function (resolve, reject) {
        emitter.on('resolve', function (response) {
          if (callback) {
            callback(null, response);
          }
          resolve(response);
        });
        emitter.on('reject', function (error) {
          if (callback) {
            callback(error, null);
          }
          reject(error);
        });
      });
    }
  }]);

  return Client;
}();

exports.default = Client;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jbGllbnQuanMiXSwibmFtZXMiOlsiQ2xpZW50IiwiaHR0cHMiLCJjcmVkZW50aWFscyIsInZlcnNpb24iLCJkZWJ1ZyIsIl9odHRwcyIsIl9jcmVkZW50aWFscyIsIl92ZXJzaW9uIiwiX2RlYnVnIiwiX3ZhbGlkYXRlQ3JlZGVudGlhbHMiLCJwYXRoIiwicGFyYW1zIiwiY2FsbGJhY2siLCJyZXF1ZXN0IiwibWV0aG9kIiwiaGVhZGVycyIsImJvZHkiLCJlbWl0dGVyIiwiRXZlbnRFbWl0dGVyIiwiX19jYWxsYmFjayIsIl9jYWxsYmFjayIsInByb21pc2UiLCJfcHJvbWlzZSIsIm9wdGlvbnMiLCJfb3B0aW9ucyIsImNvbnNvbGUiLCJsb2ciLCJvbiIsIlJlc3BvbnNlSGFuZGxlciIsIkVycm9ySGFuZGxlciIsIl93cml0ZUJvZHkiLCJlbmQiLCJ1c2VybmFtZSIsInByb2Nlc3MiLCJlbnYiLCJJTlRFUkZBWF9VU0VSTkFNRSIsIkVycm9yIiwicGFzc3dvcmQiLCJJTlRFUkZBWF9QQVNTV09SRCIsImFyZ3MiLCJpIiwibGVuZ3RoIiwiYXJndW1lbnQiLCJfcGF0aCIsInF1ZXJ5IiwiX3F1ZXJ5IiwiT2JqZWN0Iiwia2V5cyIsIm1hcCIsImVuY29kZVVSSUNvbXBvbmVudCIsImsiLCJqb2luIiwiQnVmZmVyIiwid3JpdGUiLCJwYXJ0IiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJyZXNwb25zZSIsImVycm9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0lBRU1BLE07QUFDSixrQkFBWUMsS0FBWixFQUFtQkMsV0FBbkIsRUFBZ0NDLE9BQWhDLEVBQXlDQyxLQUF6QyxFQUFnRDtBQUFBOztBQUM5QyxTQUFLQyxNQUFMLEdBQWNKLEtBQWQ7QUFDQSxTQUFLSyxZQUFMLEdBQW9CSixlQUFlLEVBQW5DO0FBQ0EsU0FBS0ssUUFBTCxHQUFnQkosT0FBaEI7QUFDQSxTQUFL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QUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSU47QUFDRjs7OzZCQUVRckMsTyxFQUFTTCxRLEVBQVU7QUFDMUIsYUFBTyxJQUFJMkMsa0JBQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdEN4QyxnQkFBUVUsRUFBUixDQUFXLFNBQVgsRUFBc0IsVUFBQytCLFFBQUQsRUFBYztBQUNsQyxjQUFJOUMsUUFBSixFQUFjO0FBQUVBLHFCQUFTLElBQVQsRUFBZThDLFFBQWY7QUFBMkI7QUFDM0NGLGtCQUFRRSxRQUFSO0FBQ0QsU0FIRDtBQUlBekMsZ0JBQVFVLEVBQVIsQ0FBVyxRQUFYLEVBQXFCLFVBQUNnQyxLQUFELEVBQVc7QUFDOUIsY0FBSS9DLFFBQUosRUFBYztBQUFFQSxxQkFBUytDLEtBQVQsRUFBZ0IsSUFBaEI7QUFBd0I7QUFDeENGLGlCQUFPRSxLQUFQO0FBQ0QsU0FIRDtBQUlELE9BVE0sQ0FBUDtBQVVEOzs7Ozs7a0JBR1kzRCxNIiwiZmlsZSI6ImNsaWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZXNwb25zZUhhbmRsZXIgIGZyb20gJy4vcmVzcG9uc2UtaGFuZGxlcic7XG5pbXBvcnQgRXJyb3JIYW5kbGVyICAgICBmcm9tICcuL2Vycm9yLWhhbmRsZXInO1xuaW1wb3J0IFByb21pc2UgICAgICAgICAgZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0IEV2ZW50RW1pdHRlciAgICAgZnJvbSAnZXZlbnRzJztcblxuY2xhc3MgQ2xpZW50IHtcbiAgY29uc3RydWN0b3IoaHR0cHMsIGNyZWRlbnRpYWxzLCB2ZXJzaW9uLCBkZWJ1Zykge1xuICAgIHRoaXMuX2h0dHBzID0gaHR0cHM7XG4gICAgdGhpcy5fY3JlZGVudGlhbHMgPSBjcmVkZW50aWFscyB8fCB7fTtcbiAgICB0aGlzLl92ZXJzaW9uID0gdmVyc2lvbjtcbiAgICB0aGlzLl9kZWJ1ZyA9IGRlYnVnIHx8IGZhbHNlO1xuICAgIHRoaXMuX3ZhbGlkYXRlQ3JlZGVudGlhbHMoKTtcbiAgfVxuXG4gIGdldChwYXRoLCBwYXJhbXMsIGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnR0VUJywgcGF0aCwge30sIG51bGwsIHBhcmFtcywgY2FsbGJhY2spO1xuICB9XG5cbiAgcG9zdChwYXRoLCBwYXJhbXMsIGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnUE9TVCcsIHBhdGgsIHt9LCBudWxsLCBwYXJhbXMsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIGRlbGV0ZShwYXRoLCBwYXJhbXMsIGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnREVMRVRFJywgcGF0aCwge30sIG51bGwsIHBhcmFtcywgY2FsbGJhY2spO1xuICB9XG5cbiAgcmVxdWVzdChtZXRob2QsIHBhdGgsIGhlYWRlcnMsIGJvZHksIHBhcmFtcywgY2FsbGJhY2spIHtcbiAgICBsZXQgZW1pdHRlciAgICAgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgbGV0IF9fY2FsbGJhY2sgID0gdGhpcy5fY2FsbGJhY2socGFyYW1zLCBjYWxsYmFjayk7XG4gICAgbGV0IHByb21pc2UgICAgID0gdGhpcy5fcHJvbWlzZShlbWl0dGVyLCBfX2NhbGxiYWNrKTtcbiAgICBsZXQgb3B0aW9ucyAgICAgPSB0aGlzLl9vcHRpb25zKG1ldGhvZCwgcGF0aCwgaGVhZGVycywgcGFyYW1zKTtcbiAgICB2YXIgcmVxdWVzdCAgICAgPSB0aGlzLl9odHRwcy5yZXF1ZXN0KG9wdGlvbnMpO1xuXG4gICAgaWYgKHRoaXMuX2RlYnVnKSB7XG4gICAgICBjb25zb2xlLmxvZyhoZWFkZXJzKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG4gICAgICBjb25zb2xlLmxvZyhvcHRpb25zKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG4gICAgfVxuXG4gICAgcmVxdWVzdC5vbigncmVzcG9uc2UnLCBuZXcgUmVzcG9uc2VIYW5kbGVyKGVtaXR0ZXIsIHRoaXMuX2RlYnVnKSk7XG4gICAgcmVxdWVzdC5vbignZXJyb3InLCBuZXcgRXJyb3JIYW5kbGVyKGVtaXR0ZXIsIHRoaXMuX2RlYnVnKSk7XG5cbiAgICB0aGlzLl93cml0ZUJvZHkocmVxdWVzdCwgYm9keSk7XG5cbiAgICByZXF1ZXN0LmVuZCgpO1xuXG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cblxuICAvLyBwcml2YXRlIG1ldGhvZHNcblxuICBfdmFsaWRhdGVDcmVkZW50aWFscygpIHtcbiAgICB0aGlzLl9jcmVkZW50aWFscy51c2VybmFtZSA9IHRoaXMuX2NyZWRlbnRpYWxzLnVzZXJuYW1lIHx8IHByb2Nlc3MuZW52LklOVEVSRkFYX1VTRVJOQU1FO1xuICAgIGlmICghdGhpcy5fY3JlZGVudGlhbHMudXNlcm5hbWUpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgYXJndW1lbnQ6IHVzZXJuYW1lJyk7XG5cbiAgICB0aGlzLl9jcmVkZW50aWFscy5wYXNzd29yZCA9IHRoaXMuX2NyZWRlbnRpYWxzLnBhc3N3b3JkIHx8IHByb2Nlc3MuZW52LklOVEVSRkFYX1BBU1NXT1JEO1xuICAgIGlmICghdGhpcy5fY3JlZGVudGlhbHMucGFzc3dvcmQpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgYXJndW1lbnQ6IHBhc3N3b3JkJyk7XG4gIH1cblxuICBfY2FsbGJhY2soLi4uYXJncykge1xuICAgIGZvciAobGV0IGkgPSBhcmdzLmxlbmd0aC0xOyBpID49IDA7IGktLSkge1xuICAgICAgbGV0IGFyZ3VtZW50ID0gYXJnc1tpXTtcbiAgICAgIGlmICh0eXBlb2YoYXJndW1lbnQpID09PSAgJ2Z1bmN0aW9uJykgcmV0dXJuIGFyZ3VtZW50O1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIF9vcHRpb25zKG1ldGhvZCwgcGF0aCwgaGVhZGVycywgcGFyYW1zKSB7XG4gICAgaGVhZGVyc1snVXNlci1BZ2VudCddID0gYEludGVyRkFYIE5vZGUgJHt0aGlzLl92ZXJzaW9ufWA7XG5cbiAgICByZXR1cm4ge1xuICAgICAgJ2hvc3QnOiAncmVzdGNhLXNsLmludGVyZmF4Lm5ldCcsXG4gICAgICAncGF0aCc6IHRoaXMuX3BhdGgocGF0aCwgcGFyYW1zKSxcbiAgICAgICdwb3J0JzogNDQzLFxuICAgICAgJ2F1dGgnOiBgJHt0aGlzLl9jcmVkZW50aWFscy51c2VybmFtZX06JHt0aGlzLl9jcmVkZW50aWFscy5wYXNzd29yZH1gLFxuICAgICAgJ21ldGhvZCc6IG1ldGhvZCxcbiAgICAgICdoZWFkZXJzJzogaGVhZGVyc1xuICAgIH07XG4gIH1cblxuICBfcGF0aChwYXRoLCBwYXJhbXMpIHtcbiAgICBsZXQgcXVlcnkgPSB0aGlzLl9xdWVyeShwYXJhbXMpO1xuICAgIHJldHVybiBgJHtwYXRofT8ke3F1ZXJ5fWA7XG4gIH1cblxuICBfcXVlcnkocGFyYW1zKSB7XG4gICAgaWYgKHR5cGVvZihwYXJhbXMpICE9PSAnb2JqZWN0JykgcGFyYW1zID0ge307XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHBhcmFtcykubWFwKGsgPT4gYCR7ZW5jb2RlVVJJQ29tcG9uZW50KGspfT0ke2VuY29kZVVSSUNvbXBvbmVudChwYXJhbXNba10pfWApLmpvaW4oJyYnKTtcbiAgfVxuXG4gIF93cml0ZUJvZHkocmVxdWVzdCwgYm9keSkge1xuICAgIGlmICghYm9keSkgeyByZXR1cm47IH1cblxuICAgIGlmICh0eXBlb2YoYm9keSkgPT09ICdzdHJpbmcnIHx8IGJvZHkgaW5zdGFuY2VvZiBCdWZmZXIpIHtcbiAgICAgIHJlcXVlc3Qud3JpdGUoYm9keSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAobGV0IHBhcnQgb2YgYm9keSkge1xuICAgICAgICByZXF1ZXN0LndyaXRlKHBhcnQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIF9wcm9taXNlKGVtaXR0ZXIsIGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGVtaXR0ZXIub24oJ3Jlc29sdmUnLCAocmVzcG9uc2UpID0+IHtcbiAgICAgICAgaWYgKGNhbGxiYWNrKSB7IGNhbGxiYWNrKG51bGwsIHJlc3BvbnNlKTsgfVxuICAgICAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgIH0pO1xuICAgICAgZW1pdHRlci5vbigncmVqZWN0JywgKGVycm9yKSA9PiB7XG4gICAgICAgIGlmIChjYWxsYmFjaykgeyBjYWxsYmFjayhlcnJvciwgbnVsbCk7IH1cbiAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENsaWVudDtcbiJdfQ==