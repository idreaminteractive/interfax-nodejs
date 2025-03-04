'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Image = function () {
  function Image(data, contentType) {
    _classCallCheck(this, Image);

    /** @deprecated use `dataBuffer` instead of `data` */
    this.data = data.toString();

    this.dataBuffer = Buffer.from(data);
    this.contentType = contentType;

    if (this.contentType == 'application/pdf') {
      this.extension = 'pdf';
    } else {
      this.extension = 'tiff';
    }
  }

  _createClass(Image, [{
    key: 'save',
    value: function save(filename) {
      _fs2.default.writeFileSync(filename, this.dataBuffer);
    }
  }]);

  return Image;
}();

exports.default = Image;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbWFnZS5qcyJdLCJuYW1lcyI6WyJJbWFnZSIsImRhdGEiLCJjb250ZW50VHlwZSIsInRvU3RyaW5nIiwiZGF0YUJ1ZmZlciIsIkJ1ZmZlciIsImZyb20iLCJleHRlbnNpb24iLCJmaWxlbmFtZSIsImZzIiwid3JpdGVGaWxlU3luYyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7SUFFTUEsSztBQUNKLGlCQUFZQyxJQUFaLEVBQWtCQyxXQUFsQixFQUErQjtBQUFBOztBQUM3QjtBQUNBLFNBQUtELElBQUwsR0FBWUEsS0FBS0UsUUFBTCxFQUFaOztBQUVBLFNBQUtDLFVBQUwsR0FBa0JDLE9BQU9DLElBQVAsQ0FBWUwsSUFBWixDQUFsQjtBQUNBLFNBQUtDLFdBQUwsR0FBbUJBLFdBQW5COztBQUVBLFFBQUksS0FBS0EsV0FBTCxJQUFvQixpQkFBeEIsRUFBMkM7QUFDekMsV0FBS0ssU0FBTCxHQUFpQixLQUFqQjtBQUNELEtBRkQsTUFFTztBQUNMLFdBQUtBLFNBQUwsR0FBaUIsTUFBakI7QUFDRDtBQUNGOzs7O3lCQUVJQyxRLEVBQVU7QUFDYkMsbUJBQUdDLGFBQUgsQ0FDRUYsUUFERixFQUVFLEtBQUtKLFVBRlA7QUFJRDs7Ozs7O2tCQUdZSixLIiwiZmlsZSI6ImltYWdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZzIGZyb20gJ2ZzJztcblxuY2xhc3MgSW1hZ2Uge1xuICBjb25zdHJ1Y3RvcihkYXRhLCBjb250ZW50VHlwZSkge1xuICAgIC8qKiBAZGVwcmVjYXRlZCB1c2UgYGRhdGFCdWZmZXJgIGluc3RlYWQgb2YgYGRhdGFgICovXG4gICAgdGhpcy5kYXRhID0gZGF0YS50b1N0cmluZygpO1xuXG4gICAgdGhpcy5kYXRhQnVmZmVyID0gQnVmZmVyLmZyb20oZGF0YSk7XG4gICAgdGhpcy5jb250ZW50VHlwZSA9IGNvbnRlbnRUeXBlO1xuXG4gICAgaWYgKHRoaXMuY29udGVudFR5cGUgPT0gJ2FwcGxpY2F0aW9uL3BkZicpIHtcbiAgICAgIHRoaXMuZXh0ZW5zaW9uID0gJ3BkZic7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZXh0ZW5zaW9uID0gJ3RpZmYnO1xuICAgIH1cbiAgfVxuXG4gIHNhdmUoZmlsZW5hbWUpIHtcbiAgICBmcy53cml0ZUZpbGVTeW5jKFxuICAgICAgZmlsZW5hbWUsXG4gICAgICB0aGlzLmRhdGFCdWZmZXJcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEltYWdlO1xuIl19