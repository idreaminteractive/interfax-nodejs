'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _image = require('./image');

var _image2 = _interopRequireDefault(_image);

var _location = require('./location');

var _location2 = _interopRequireDefault(_location);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ResponseHandler = function ResponseHandler(emitter, debug) {
  _classCallCheck(this, ResponseHandler);

  return function (response) {
    if (debug) {
      console.log(response);
    } // eslint-disable-line no-console

    var result = Buffer.from('');
    var isJson = response.headers['content-type'] == 'text/json';
    var isTiff = response.headers['content-type'] == 'image/tiff';
    var isPdf = response.headers['content-type'] == 'application/pdf';
    var isImage = isTiff || isPdf;

    var isLocation = response.headers['location'] !== undefined;

    response.on('data', function (chunk) {
      result = Buffer.concat([result, chunk]);
    });

    response.on('end', function () {
      if (debug) {
        console.log(result);
      } // eslint-disable-line no-console

      if (isLocation) {
        result = new _location2.default(response.headers['location']);
      } else if (isImage) {
        result = new _image2.default(result, response.headers['content-type']);
      } else if (isJson && result.length > 0) {
        result = JSON.parse(result.toString());
      } else if (isJson && result.length == 0) {
        result = null;
      }

      if (response.statusCode >= 300) {
        emitter.emit('reject', result);
      } else {
        emitter.emit('resolve', result);
      }
    });

    response.on('close', function (error) {
      emitter.emit('reject', error);
    });
  };
};

exports.default = ResponseHandler;

module.exports = exports['default'];
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yZXNwb25zZS1oYW5kbGVyLmpzIl0sIm5hbWVzIjpbIlJlc3BvbnNlSGFuZGxlciIsImVtaXR0ZXIiLCJkZWJ1ZyIsInJlc3BvbnNlIiwiY29uc29sZSIsImxvZyIsInJlc3VsdCIsIkJ1ZmZlciIsImZyb20iLCJpc0pzb24iLCJoZWFkZXJzIiwiaXNUaWZmIiwiaXNQZGYiLCJpc0ltYWdlIiwiaXNMb2NhdGlvbiIsInVuZGVmaW5lZCIsIm9uIiwiY2h1bmsiLCJjb25jYXQiLCJMb2NhdGlvbiIsIkltYWdlIiwibGVuZ3RoIiwiSlNPTiIsInBhcnNlIiwidG9TdHJpbmciLCJzdGF0dXNDb2RlIiwiZW1pdCIsImVycm9yIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7SUFFTUEsZSxHQUNKLHlCQUFZQyxPQUFaLEVBQXFCQyxLQUFyQixFQUE0QjtBQUFBOztBQUMxQixTQUFPLFVBQUNDLFFBQUQsRUFBYztBQUNuQixRQUFJRCxLQUFKLEVBQVc7QUFBRUUsY0FBUUMsR0FBUixDQUFZRixRQUFaO0FBQXdCLEtBRGxCLENBQ21COztBQUV0QyxRQUFJRyxTQUFTQyxPQUFPQyxJQUFQLENBQVksRUFBWixDQUFiO0FBQ0EsUUFBSUMsU0FBY04sU0FBU08sT0FBVCxDQUFpQixjQUFqQixLQUFvQyxXQUF0RDtBQUNBLFFBQUlDLFNBQWNSLFNBQVNPLE9BQVQsQ0FBaUIsY0FBakIsS0FBb0MsWUFBdEQ7QUFDQSxRQUFJRSxRQUFjVCxTQUFTTyxPQUFULENBQWlCLGNBQWpCLEtBQW9DLGlCQUF0RDtBQUNBLFFBQUlHLFVBQWNGLFVBQVVDLEtBQTVCOztBQUVBLFFBQUlFLGFBQWNYLFNBQVNPLE9BQVQsQ0FBaUIsVUFBakIsTUFBaUNLLFNBQW5EOztBQUVBWixhQUFTYSxFQUFULENBQVksTUFBWixFQUFvQixVQUFTQyxLQUFULEVBQWdCO0FBQ2xDWCxlQUFTQyxPQUFPVyxNQUFQLENBQWMsQ0FBQ1osTUFBRCxFQUFTVyxLQUFULENBQWQsQ0FBVDtBQUNELEtBRkQ7O0FBSUFkLGFBQVNhLEVBQVQsQ0FBWSxLQUFaLEVBQW1CLFlBQVc7QUFDNUIsVUFBSWQsS0FBSixFQUFXO0FBQUVFLGdCQUFRQyxHQUFSLENBQVlDLE1BQVo7QUFBc0IsT0FEUCxDQUNROztBQUVwQyxVQUFJUSxVQUFKLEVBQWdCO0FBQUVSLGlCQUFTLElBQUlhLGtCQUFKLENBQWFoQixTQUFTTyxPQUFULENBQWlCLFVBQWpCLENBQWIsQ0FBVDtBQUFzRCxPQUF4RSxNQUNLLElBQUlHLE9BQUosRUFBYTtBQUFFUCxpQkFBUyxJQUFJYyxlQUFKLENBQVVkLE1BQVYsRUFBa0JILFNBQVNPLE9BQVQsQ0FBaUIsY0FBakIsQ0FBbEIsQ0FBVDtBQUErRCxPQUE5RSxNQUNBLElBQUlELFVBQVVILE9BQU9lLE1BQVAsR0FBZ0IsQ0FBOUIsRUFBaUM7QUFBRWYsaUJBQVNnQixLQUFLQyxLQUFMLENBQVdqQixPQUFPa0IsUUFBUCxFQUFYLENBQVQ7QUFBeUMsT0FBNUUsTUFDQSxJQUFJZixVQUFVSCxPQUFPZSxNQUFQLElBQWlCLENBQS9CLEVBQWtDO0FBQUVmLGlCQUFTLElBQVQ7QUFBZ0I7O0FBRXpELFVBQUlILFNBQVNzQixVQUFULElBQXVCLEdBQTNCLEVBQWdDO0FBQzlCeEIsZ0JBQVF5QixJQUFSLENBQWEsUUFBYixFQUF1QnBCLE1BQXZCO0FBQ0QsT0FGRCxNQUVPO0FBQ0xMLGdCQUFReUIsSUFBUixDQUFhLFNBQWIsRUFBd0JwQixNQUF4QjtBQUNEO0FBQ0YsS0FiRDs7QUFlQUgsYUFBU2EsRUFBVCxDQUFZLE9BQVosRUFBcUIsVUFBU1csS0FBVCxFQUFnQjtBQUNuQzFCLGNBQVF5QixJQUFSLENBQWEsUUFBYixFQUF1QkMsS0FBdkI7QUFDRCxLQUZEO0FBR0QsR0FqQ0Q7QUFrQ0QsQzs7a0JBR1kzQixlOztBQUNmNEIsT0FBT0MsT0FBUCxHQUFpQkEsUUFBUSxTQUFSLENBQWpCIiwiZmlsZSI6InJlc3BvbnNlLWhhbmRsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSW1hZ2UgICAgZnJvbSAnLi9pbWFnZSc7XG5pbXBvcnQgTG9jYXRpb24gZnJvbSAnLi9sb2NhdGlvbic7XG5cbmNsYXNzIFJlc3BvbnNlSGFuZGxlciB7XG4gIGNvbnN0cnVjdG9yKGVtaXR0ZXIsIGRlYnVnKSB7XG4gICAgcmV0dXJuIChyZXNwb25zZSkgPT4ge1xuICAgICAgaWYgKGRlYnVnKSB7IGNvbnNvbGUubG9nKHJlc3BvbnNlKTsgfSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcblxuICAgICAgbGV0IHJlc3VsdCA9IEJ1ZmZlci5mcm9tKCcnKTtcbiAgICAgIGxldCBpc0pzb24gICAgICA9IHJlc3BvbnNlLmhlYWRlcnNbJ2NvbnRlbnQtdHlwZSddID09ICd0ZXh0L2pzb24nO1xuICAgICAgbGV0IGlzVGlmZiAgICAgID0gcmVzcG9uc2UuaGVhZGVyc1snY29udGVudC10eXBlJ10gPT0gJ2ltYWdlL3RpZmYnO1xuICAgICAgbGV0IGlzUGRmICAgICAgID0gcmVzcG9uc2UuaGVhZGVyc1snY29udGVudC10eXBlJ10gPT0gJ2FwcGxpY2F0aW9uL3BkZic7XG4gICAgICBsZXQgaXNJbWFnZSAgICAgPSBpc1RpZmYgfHwgaXNQZGY7XG5cbiAgICAgIGxldCBpc0xvY2F0aW9uICA9IHJlc3BvbnNlLmhlYWRlcnNbJ2xvY2F0aW9uJ10gIT09IHVuZGVmaW5lZDtcblxuICAgICAgcmVzcG9uc2Uub24oJ2RhdGEnLCBmdW5jdGlvbihjaHVuaykge1xuICAgICAgICByZXN1bHQgPSBCdWZmZXIuY29uY2F0KFtyZXN1bHQsIGNodW5rXSk7XG4gICAgICB9KTtcblxuICAgICAgcmVzcG9uc2Uub24oJ2VuZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoZGVidWcpIHsgY29uc29sZS5sb2cocmVzdWx0KTsgfSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcblxuICAgICAgICBpZiAoaXNMb2NhdGlvbikgeyByZXN1bHQgPSBuZXcgTG9jYXRpb24ocmVzcG9uc2UuaGVhZGVyc1snbG9jYXRpb24nXSk7IH1cbiAgICAgICAgZWxzZSBpZiAoaXNJbWFnZSkgeyByZXN1bHQgPSBuZXcgSW1hZ2UocmVzdWx0LCByZXNwb25zZS5oZWFkZXJzWydjb250ZW50LXR5cGUnXSk7IH1cbiAgICAgICAgZWxzZSBpZiAoaXNKc29uICYmIHJlc3VsdC5sZW5ndGggPiAwKSB7IHJlc3VsdCA9IEpTT04ucGFyc2UocmVzdWx0LnRvU3RyaW5nKCkpOyB9XG4gICAgICAgIGVsc2UgaWYgKGlzSnNvbiAmJiByZXN1bHQubGVuZ3RoID09IDApIHsgcmVzdWx0ID0gbnVsbDsgfVxuXG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXNDb2RlID49IDMwMCkge1xuICAgICAgICAgIGVtaXR0ZXIuZW1pdCgncmVqZWN0JywgcmVzdWx0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlbWl0dGVyLmVtaXQoJ3Jlc29sdmUnLCByZXN1bHQpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgcmVzcG9uc2Uub24oJ2Nsb3NlJywgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgZW1pdHRlci5lbWl0KCdyZWplY3QnLCBlcnJvcik7XG4gICAgICB9KTtcbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFJlc3BvbnNlSGFuZGxlcjtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xuIl19