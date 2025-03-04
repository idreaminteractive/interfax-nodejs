'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var _file = require('./file');

var _file2 = _interopRequireDefault(_file);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Files = function () {
  function Files(documents) {
    _classCallCheck(this, Files);

    this._documents = documents;
  }

  _createClass(Files, [{
    key: 'create',
    value: function create(data, options, callback) {
      var emitter = new _events2.default();
      var promise = this._promise(emitter, callback);

      var file = new _file2.default(this._documents, data, options);
      file.onReady(function (response) {
        if (response === true) {
          emitter.emit('resolve', file);
        } else {
          emitter.emit('reject', response);
        }
      });

      return promise;
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

  return Files;
}();

exports.default = Files;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9maWxlcy5qcyJdLCJuYW1lcyI6WyJGaWxlcyIsImRvY3VtZW50cyIsIl9kb2N1bWVudHMiLCJkYXRhIiwib3B0aW9ucyIsImNhbGxiYWNrIiwiZW1pdHRlciIsIkV2ZW50RW1pdHRlciIsInByb21pc2UiLCJfcHJvbWlzZSIsImZpbGUiLCJGaWxlIiwib25SZWFkeSIsInJlc3BvbnNlIiwiZW1pdCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwib24iLCJlcnJvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7O0lBRU1BLEs7QUFDSixpQkFBWUMsU0FBWixFQUF1QjtBQUFBOztBQUNyQixTQUFLQyxVQUFMLEdBQWtCRCxTQUFsQjtBQUNEOzs7OzJCQUVNRSxJLEVBQU1DLE8sRUFBU0MsUSxFQUFVO0FBQzlCLFVBQUlDLFVBQVUsSUFBSUMsZ0JBQUosRUFBZDtBQUNBLFVBQUlDLFVBQVUsS0FBS0MsUUFBTCxDQUFjSCxPQUFkLEVBQXVCRCxRQUF2QixDQUFkOztBQUVBLFVBQUlLLE9BQVUsSUFBSUMsY0FBSixDQUFTLEtBQUtULFVBQWQsRUFBMEJDLElBQTFCLEVBQWdDQyxPQUFoQyxDQUFkO0FBQ0FNLFdBQUtFLE9BQUwsQ0FBYSxVQUFDQyxRQUFELEVBQWM7QUFDekIsWUFBSUEsYUFBYSxJQUFqQixFQUF1QjtBQUNyQlAsa0JBQVFRLElBQVIsQ0FBYSxTQUFiLEVBQXdCSixJQUF4QjtBQUNELFNBRkQsTUFFTztBQUNMSixrQkFBUVEsSUFBUixDQUFhLFFBQWIsRUFBdUJELFFBQXZCO0FBQ0Q7QUFDRixPQU5EOztBQVFBLGFBQU9MLE9BQVA7QUFDRDs7OzZCQUVRRixPLEVBQVNELFEsRUFBVTtBQUMxQixhQUFPLElBQUlVLGtCQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDWCxnQkFBUVksRUFBUixDQUFXLFNBQVgsRUFBc0IsVUFBQ0wsUUFBRCxFQUFjO0FBQ2xDLGNBQUlSLFFBQUosRUFBYztBQUFFQSxxQkFBUyxJQUFULEVBQWVRLFFBQWY7QUFBMkI7QUFDM0NHLGtCQUFRSCxRQUFSO0FBQ0QsU0FIRDtBQUlBUCxnQkFBUVksRUFBUixDQUFXLFFBQVgsRUFBcUIsVUFBQ0MsS0FBRCxFQUFXO0FBQzlCLGNBQUlkLFFBQUosRUFBYztBQUFFQSxxQkFBU2MsS0FBVCxFQUFnQixJQUFoQjtBQUF3QjtBQUN4Q0YsaUJBQU9FLEtBQVA7QUFDRCxTQUhEO0FBSUQsT0FUTSxDQUFQO0FBVUQ7Ozs7OztrQkFHWW5CLEsiLCJmaWxlIjoiZmlsZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUHJvbWlzZSAgICAgICAgICBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQgRXZlbnRFbWl0dGVyICAgICBmcm9tICdldmVudHMnO1xuXG5pbXBvcnQgRmlsZSBmcm9tICcuL2ZpbGUnO1xuXG5jbGFzcyBGaWxlcyB7XG4gIGNvbnN0cnVjdG9yKGRvY3VtZW50cykge1xuICAgIHRoaXMuX2RvY3VtZW50cyA9IGRvY3VtZW50cztcbiAgfVxuXG4gIGNyZWF0ZShkYXRhLCBvcHRpb25zLCBjYWxsYmFjaykge1xuICAgIGxldCBlbWl0dGVyID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIGxldCBwcm9taXNlID0gdGhpcy5fcHJvbWlzZShlbWl0dGVyLCBjYWxsYmFjayk7XG5cbiAgICBsZXQgZmlsZSAgICA9IG5ldyBGaWxlKHRoaXMuX2RvY3VtZW50cywgZGF0YSwgb3B0aW9ucyk7XG4gICAgZmlsZS5vblJlYWR5KChyZXNwb25zZSkgPT4ge1xuICAgICAgaWYgKHJlc3BvbnNlID09PSB0cnVlKSB7XG4gICAgICAgIGVtaXR0ZXIuZW1pdCgncmVzb2x2ZScsIGZpbGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZW1pdHRlci5lbWl0KCdyZWplY3QnLCByZXNwb25zZSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG4gIF9wcm9taXNlKGVtaXR0ZXIsIGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGVtaXR0ZXIub24oJ3Jlc29sdmUnLCAocmVzcG9uc2UpID0+IHtcbiAgICAgICAgaWYgKGNhbGxiYWNrKSB7IGNhbGxiYWNrKG51bGwsIHJlc3BvbnNlKTsgfVxuICAgICAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgIH0pO1xuICAgICAgZW1pdHRlci5vbigncmVqZWN0JywgKGVycm9yKSA9PiB7XG4gICAgICAgIGlmIChjYWxsYmFjaykgeyBjYWxsYmFjayhlcnJvciwgbnVsbCk7IH1cbiAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEZpbGVzO1xuIl19