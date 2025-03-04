'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _file = require('./file');

var _file2 = _interopRequireDefault(_file);

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Delivery = function () {
  function Delivery(client, documents) {
    _classCallCheck(this, Delivery);

    this._client = client;
    this._documents = documents;
    this._boundary = '43e578690a6d14bf1d776cd55e7d7e29';
    this._emitter = new _events2.default();
  }

  _createClass(Delivery, [{
    key: 'deliver',
    value: function deliver(params, callback) {
      var _validateParams2 = this._validateParams(params),
          _validateParams3 = _slicedToArray(_validateParams2, 2),
          validatedParams = _validateParams3[0],
          files = _validateParams3[1];

      var promise = this._promise(callback);

      this._generateFileObjects(files, this._deliverFiles(validatedParams).bind(this));

      return promise;
    }
  }, {
    key: '_deliverFiles',
    value: function _deliverFiles(validatedParams) {
      var _this = this;

      return function (error, fileObjects) {
        if (error) {
          return _this._emitDeliveryFailure(error);
        }

        var body = _this._bodyFor(fileObjects);
        var length = _this._lengthFor(body);
        var headers = {
          'Content-Type': 'multipart/mixed; boundary=' + _this._boundary,
          'Content-Length': length
        };

        return _this._client.request('POST', '/outbound/faxes', headers, body, validatedParams).then(_this._emitDeliverySuccess.bind(_this)).catch(_this._emitDeliveryFailure.bind(_this));
      };
    }
  }, {
    key: '_emitDeliverySuccess',
    value: function _emitDeliverySuccess(result) {
      this._emitter.emit('resolve', result);
    }
  }, {
    key: '_emitDeliveryFailure',
    value: function _emitDeliveryFailure(error) {
      this._emitter.emit('reject', error);
    }
  }, {
    key: '_validateParams',
    value: function _validateParams(params) {
      if (!params.faxNumber) throw new Error('Missing argument: faxNumber');

      if (!params.file && !params.files) throw new Error('Missing argument: file or files');

      var files = [params.file || params.files];
      files = this._flatten(files);

      delete params['file'];
      delete params['files'];

      return [params, files];
    }
  }, {
    key: '_generateFileObjects',
    value: function _generateFileObjects(files, callback) {
      var _this2 = this;

      var objects = [];

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        var _loop = function _loop() {
          var file = _step.value;

          var object = file;
          if (typeof file === 'string') {
            object = new _file2.default(_this2._documents, file);
          }
          object.onReady(function (response) {
            if (!object.ready) {
              callback(response, null);
            }
            objects.push(object);
            if (objects.length == files.length) {
              callback(null, objects);
            }
          });
        };

        for (var _iterator = files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          _loop();
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

      return null;
    }
  }, {
    key: '_bodyFor',
    value: function _bodyFor(files) {
      var _this3 = this;

      var parts = files.map(function (file) {
        var elements = ['--' + _this3._boundary, '\r\n', file.header, '\r\n\r\n'];
        if (file.body) {
          elements.push(file.body);
          elements.push('\r\n\r\n');
        }
        return elements;
      });
      parts.push('--' + this._boundary + '--');
      return this._flatten(parts);
    }
  }, {
    key: '_lengthFor',
    value: function _lengthFor(parts) {
      return parts.reduce(function (prev, cur) {
        return prev + Buffer.byteLength(cur);
      }, 0);
    }
  }, {
    key: '_flatten',
    value: function _flatten(list) {
      return [].concat.apply([], list);
    }
  }, {
    key: '_promise',
    value: function _promise(callback) {
      var _this4 = this;

      return new Promise(function (resolve, reject) {
        _this4._emitter.on('resolve', function (response) {
          if (callback) {
            callback(null, response);
          }
          resolve(response);
        });
        _this4._emitter.on('reject', function (error) {
          if (callback) {
            callback(error, null);
          }
          reject(error);
        });
      });
    }
  }]);

  return Delivery;
}();

exports.default = Delivery;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kZWxpdmVyeS5qcyJdLCJuYW1lcyI6WyJEZWxpdmVyeSIsImNsaWVudCIsImRvY3VtZW50cyIsIl9jbGllbnQiLCJfZG9jdW1lbnRzIiwiX2JvdW5kYXJ5IiwiX2VtaXR0ZXIiLCJFdmVudEVtaXR0ZXIiLCJwYXJhbXMiLCJjYWxsYmFjayIsIl92YWxpZGF0ZVBhcmFtcyIsInZhbGlkYXRlZFBhcmFtcyIsImZpbGVzIiwicHJvbWlzZSIsIl9wcm9taXNlIiwiX2dlbmVyYXRlRmlsZU9iamVjdHMiLCJfZGVsaXZlckZpbGVzIiwiYmluZCIsImVycm9yIiwiZmlsZU9iamVjdHMiLCJfZW1pdERlbGl2ZXJ5RmFpbHVyZSIsImJvZHkiLCJfYm9keUZvciIsImxlbmd0aCIsIl9sZW5ndGhGb3IiLCJoZWFkZXJzIiwicmVxdWVzdCIsInRoZW4iLCJfZW1pdERlbGl2ZXJ5U3VjY2VzcyIsImNhdGNoIiwicmVzdWx0IiwiZW1pdCIsImZheE51bWJlciIsIkVycm9yIiwiZmlsZSIsIl9mbGF0dGVuIiwib2JqZWN0cyIsIm9iamVjdCIsIkZpbGUiLCJvblJlYWR5IiwicmVzcG9uc2UiLCJyZWFkeSIsInB1c2giLCJwYXJ0cyIsIm1hcCIsImVsZW1lbnRzIiwiaGVhZGVyIiwicmVkdWNlIiwicHJldiIsImN1ciIsIkJ1ZmZlciIsImJ5dGVMZW5ndGgiLCJsaXN0IiwiY29uY2F0IiwiYXBwbHkiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIm9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7SUFFTUEsUTtBQUVKLG9CQUFZQyxNQUFaLEVBQW9CQyxTQUFwQixFQUErQjtBQUFBOztBQUM3QixTQUFLQyxPQUFMLEdBQWtCRixNQUFsQjtBQUNBLFNBQUtHLFVBQUwsR0FBa0JGLFNBQWxCO0FBQ0EsU0FBS0csU0FBTCxHQUFrQixrQ0FBbEI7QUFDQSxTQUFLQyxRQUFMLEdBQW1CLElBQUlDLGdCQUFKLEVBQW5CO0FBQ0Q7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QUFDM0NnQixrQkFBUWhCLFFBQVI7QUFDRCxTQUhEO0FBSUEsZUFBS2xDLFFBQUwsQ0FBY29ELEVBQWQsQ0FBaUIsUUFBakIsRUFBMkIsVUFBQ3hDLEtBQUQsRUFBVztBQUNwQyxjQUFJVCxRQUFKLEVBQWM7QUFBRUEscUJBQVNTLEtBQVQsRUFBZ0IsSUFBaEI7QUFBd0I7QUFDeEN1QyxpQkFBT3ZDLEtBQVA7QUFDRCxTQUhEO0FBSUQsT0FUTSxDQUFQO0FBVUQ7Ozs7OztrQkFHWWxCLFEiLCJmaWxlIjoiZGVsaXZlcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRmlsZSBmcm9tICcuL2ZpbGUnO1xuaW1wb3J0IEV2ZW50RW1pdHRlciAgICAgZnJvbSAnZXZlbnRzJztcblxuY2xhc3MgRGVsaXZlcnkge1xuXG4gIGNvbnN0cnVjdG9yKGNsaWVudCwgZG9jdW1lbnRzKSB7XG4gICAgdGhpcy5fY2xpZW50ICAgID0gY2xpZW50O1xuICAgIHRoaXMuX2RvY3VtZW50cyA9IGRvY3VtZW50cztcbiAgICB0aGlzLl9ib3VuZGFyeSAgPSAnNDNlNTc4NjkwYTZkMTRiZjFkNzc2Y2Q1NWU3ZDdlMjknO1xuICAgIHRoaXMuX2VtaXR0ZXIgICAgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIH1cblxuICBkZWxpdmVyKHBhcmFtcywgY2FsbGJhY2spIHtcbiAgICBsZXQgW3ZhbGlkYXRlZFBhcmFtcywgZmlsZXNdID0gdGhpcy5fdmFsaWRhdGVQYXJhbXMocGFyYW1zKTtcbiAgICBsZXQgcHJvbWlzZSA9IHRoaXMuX3Byb21pc2UoY2FsbGJhY2spO1xuXG4gICAgdGhpcy5fZ2VuZXJhdGVGaWxlT2JqZWN0cyhmaWxlcywgdGhpcy5fZGVsaXZlckZpbGVzKHZhbGlkYXRlZFBhcmFtcykuYmluZCh0aGlzKSk7XG5cbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG4gIF9kZWxpdmVyRmlsZXModmFsaWRhdGVkUGFyYW1zKSB7XG4gICAgcmV0dXJuIChlcnJvciwgZmlsZU9iamVjdHMpID0+IHtcbiAgICAgIGlmIChlcnJvcikgeyByZXR1cm4gdGhpcy5fZW1pdERlbGl2ZXJ5RmFpbHVyZShlcnJvcik7IH1cblxuICAgICAgbGV0IGJvZHkgICAgPSB0aGlzLl9ib2R5Rm9yKGZpbGVPYmplY3RzKTtcbiAgICAgIGxldCBsZW5ndGggID0gdGhpcy5fbGVuZ3RoRm9yKGJvZHkpO1xuICAgICAgbGV0IGhlYWRlcnMgPSB7XG4gICAgICAgICdDb250ZW50LVR5cGUnIDogYG11bHRpcGFydC9taXhlZDsgYm91bmRhcnk9JHt0aGlzLl9ib3VuZGFyeX1gLFxuICAgICAgICAnQ29udGVudC1MZW5ndGgnIDogbGVuZ3RoXG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gdGhpcy5fY2xpZW50LnJlcXVlc3QoJ1BPU1QnLCAnL291dGJvdW5kL2ZheGVzJywgaGVhZGVycywgYm9keSwgdmFsaWRhdGVkUGFyYW1zKVxuICAgICAgICAudGhlbih0aGlzLl9lbWl0RGVsaXZlcnlTdWNjZXNzLmJpbmQodGhpcykpXG4gICAgICAgIC5jYXRjaCh0aGlzLl9lbWl0RGVsaXZlcnlGYWlsdXJlLmJpbmQodGhpcykpO1xuICAgIH07XG4gIH1cblxuICBfZW1pdERlbGl2ZXJ5U3VjY2VzcyhyZXN1bHQpIHtcbiAgICB0aGlzLl9lbWl0dGVyLmVtaXQoJ3Jlc29sdmUnLCByZXN1bHQpO1xuICB9XG5cbiAgX2VtaXREZWxpdmVyeUZhaWx1cmUoZXJyb3IpIHtcbiAgICB0aGlzLl9lbWl0dGVyLmVtaXQoJ3JlamVjdCcsIGVycm9yKTtcbiAgfVxuXG4gIF92YWxpZGF0ZVBhcmFtcyhwYXJhbXMpIHtcbiAgICBpZiAoIXBhcmFtcy5mYXhOdW1iZXIpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgYXJndW1lbnQ6IGZheE51bWJlcicpO1xuXG4gICAgaWYgKCFwYXJhbXMuZmlsZSAmJiAhcGFyYW1zLmZpbGVzKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGFyZ3VtZW50OiBmaWxlIG9yIGZpbGVzJyk7XG5cbiAgICBsZXQgZmlsZXMgPSBbcGFyYW1zLmZpbGUgfHwgcGFyYW1zLmZpbGVzXTtcbiAgICBmaWxlcyA9IHRoaXMuX2ZsYXR0ZW4oZmlsZXMpO1xuXG4gICAgZGVsZXRlIHBhcmFtc1snZmlsZSddO1xuICAgIGRlbGV0ZSBwYXJhbXNbJ2ZpbGVzJ107XG5cbiAgICByZXR1cm4gW3BhcmFtcywgZmlsZXNdO1xuICB9XG5cbiAgX2dlbmVyYXRlRmlsZU9iamVjdHMoZmlsZXMsIGNhbGxiYWNrKSB7XG4gICAgbGV0IG9iamVjdHMgPSBbXTtcblxuICAgIGZvciAobGV0IGZpbGUgb2YgZmlsZXMpIHtcbiAgICAgIGxldCBvYmplY3QgPSBmaWxlO1xuICAgICAgaWYgKHR5cGVvZihmaWxlKSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgb2JqZWN0ID0gbmV3IEZpbGUodGhpcy5fZG9jdW1lbnRzLCBmaWxlKTtcbiAgICAgIH1cbiAgICAgIG9iamVjdC5vblJlYWR5KChyZXNwb25zZSkgPT4ge1xuICAgICAgICBpZiAoIW9iamVjdC5yZWFkeSkgeyBjYWxsYmFjayhyZXNwb25zZSwgbnVsbCk7IH1cbiAgICAgICAgb2JqZWN0cy5wdXNoKG9iamVjdCk7XG4gICAgICAgIGlmIChvYmplY3RzLmxlbmd0aCA9PSBmaWxlcy5sZW5ndGgpIHsgY2FsbGJhY2sobnVsbCwgb2JqZWN0cyk7IH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIF9ib2R5Rm9yKGZpbGVzKSB7XG4gICAgbGV0IHBhcnRzID0gZmlsZXMubWFwKGZpbGUgPT4ge1xuICAgICAgbGV0IGVsZW1lbnRzID0gW2AtLSR7dGhpcy5fYm91bmRhcnl9YCwgJ1xcclxcbicsIGZpbGUuaGVhZGVyLCAnXFxyXFxuXFxyXFxuJ107XG4gICAgICBpZiAoZmlsZS5ib2R5KSB7XG4gICAgICAgIGVsZW1lbnRzLnB1c2goZmlsZS5ib2R5KTtcbiAgICAgICAgZWxlbWVudHMucHVzaCgnXFxyXFxuXFxyXFxuJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZWxlbWVudHM7XG4gICAgfSk7XG4gICAgcGFydHMucHVzaChgLS0ke3RoaXMuX2JvdW5kYXJ5fS0tYCk7XG4gICAgcmV0dXJuIHRoaXMuX2ZsYXR0ZW4ocGFydHMpO1xuICB9XG5cbiAgX2xlbmd0aEZvcihwYXJ0cykge1xuICAgIHJldHVybiBwYXJ0cy5yZWR1Y2UoKHByZXYsIGN1cikgPT4ge1xuICAgICAgcmV0dXJuIHByZXYgKyBCdWZmZXIuYnl0ZUxlbmd0aChjdXIpO1xuICAgIH0sIDApO1xuICB9XG5cbiAgX2ZsYXR0ZW4obGlzdCkge1xuICAgIHJldHVybiBbXS5jb25jYXQuYXBwbHkoW10sIGxpc3QpO1xuICB9XG5cbiAgX3Byb21pc2UoY2FsbGJhY2spIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5fZW1pdHRlci5vbigncmVzb2x2ZScsIChyZXNwb25zZSkgPT4ge1xuICAgICAgICBpZiAoY2FsbGJhY2spIHsgY2FsbGJhY2sobnVsbCwgcmVzcG9uc2UpOyB9XG4gICAgICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLl9lbWl0dGVyLm9uKCdyZWplY3QnLCAoZXJyb3IpID0+IHtcbiAgICAgICAgaWYgKGNhbGxiYWNrKSB7IGNhbGxiYWNrKGVycm9yLCBudWxsKTsgfVxuICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRGVsaXZlcnk7XG4iXX0=