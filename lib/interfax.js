'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _account = require('./account');

var _account2 = _interopRequireDefault(_account);

var _client = require('./client');

var _client2 = _interopRequireDefault(_client);

var _outbound = require('./outbound');

var _outbound2 = _interopRequireDefault(_outbound);

var _inbound = require('./inbound');

var _inbound2 = _interopRequireDefault(_inbound);

var _documents = require('./documents');

var _documents2 = _interopRequireDefault(_documents);

var _files = require('./files');

var _files2 = _interopRequireDefault(_files);

var _delivery = require('./delivery');

var _delivery2 = _interopRequireDefault(_delivery);

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InterFAX = function InterFAX(credentials, debug) {
  _classCallCheck(this, InterFAX);

  this._client = new _client2.default(_https2.default, credentials, _package2.default.version, debug);
  this.documents = new _documents2.default(this._client);
  this._delivery = new _delivery2.default(this._client, this.documents);

  this.outbound = new _outbound2.default(this._client, this._delivery);
  this.deliver = this._delivery.deliver.bind(this._delivery);

  this.account = new _account2.default(this._client);
  this.inbound = new _inbound2.default(this._client);
  this.files = new _files2.default(this.documents);
};

exports.default = InterFAX;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbnRlcmZheC5qcyJdLCJuYW1lcyI6WyJJbnRlckZBWCIsImNyZWRlbnRpYWxzIiwiZGVidWciLCJfY2xpZW50IiwiQ2xpZW50IiwiaHR0cHMiLCJsaWJyYXJ5IiwidmVyc2lvbiIsImRvY3VtZW50cyIsIkRvY3VtZW50cyIsIl9kZWxpdmVyeSIsIkRlbGl2ZXJ5Iiwib3V0Ym91bmQiLCJPdXRib3VuZCIsImRlbGl2ZXIiLCJiaW5kIiwiYWNjb3VudCIsIkFjY291bnQiLCJpbmJvdW5kIiwiSW5ib3VuZCIsImZpbGVzIiwiRmlsZXMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7Ozs7Ozs7SUFHTUEsUSxHQUVKLGtCQUFZQyxXQUFaLEVBQXlCQyxLQUF6QixFQUFnQztBQUFBOztBQUM5QixPQUFLQyxPQUFMLEdBQW1CLElBQUlDLGdCQUFKLENBQVdDLGVBQVgsRUFBa0JKLFdBQWxCLEVBQStCSyxrQkFBUUMsT0FBdkMsRUFBZ0RMLEtBQWhELENBQW5CO0FBQ0EsT0FBS00sU0FBTCxHQUFpQixJQUFJQyxtQkFBSixDQUFjLEtBQUtOLE9BQW5CLENBQWpCO0FBQ0EsT0FBS08sU0FBTCxHQUFtQixJQUFJQyxrQkFBSixDQUFhLEtBQUtSLE9BQWxCLEVBQTJCLEtBQUtLLFNBQWhDLENBQW5COztBQUVBLE9BQUtJLFFBQUwsR0FBaUIsSUFBSUMsa0JBQUosQ0FBYSxLQUFLVixPQUFsQixFQUEyQixLQUFLTyxTQUFoQyxDQUFqQjtBQUNBLE9BQUtJLE9BQUwsR0FBaUIsS0FBS0osU0FBTCxDQUFlSSxPQUFmLENBQXVCQyxJQUF2QixDQUE0QixLQUFLTCxTQUFqQyxDQUFqQjs7QUFFQSxPQUFLTSxPQUFMLEdBQWlCLElBQUlDLGlCQUFKLENBQVksS0FBS2QsT0FBakIsQ0FBakI7QUFDQSxPQUFLZSxPQUFMLEdBQWlCLElBQUlDLGlCQUFKLENBQVksS0FBS2hCLE9BQWpCLENBQWpCO0FBQ0EsT0FBS2lCLEtBQUwsR0FBaUIsSUFBSUMsZUFBSixDQUFVLEtBQUtiLFNBQWYsQ0FBakI7QUFDRCxDOztrQkFHWVIsUSIsImZpbGUiOiJpbnRlcmZheC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBY2NvdW50ICAgICBmcm9tICcuL2FjY291bnQnO1xuaW1wb3J0IENsaWVudCAgICAgIGZyb20gJy4vY2xpZW50JztcbmltcG9ydCBPdXRib3VuZCAgICBmcm9tICcuL291dGJvdW5kJztcbmltcG9ydCBJbmJvdW5kICAgICBmcm9tICcuL2luYm91bmQnO1xuaW1wb3J0IERvY3VtZW50cyAgIGZyb20gJy4vZG9jdW1lbnRzJztcbmltcG9ydCBGaWxlcyAgICAgICBmcm9tICcuL2ZpbGVzJztcbmltcG9ydCBEZWxpdmVyeSAgICBmcm9tICcuL2RlbGl2ZXJ5JztcblxuaW1wb3J0IGxpYnJhcnkgICAgIGZyb20gJy4uL3BhY2thZ2UuanNvbic7XG5pbXBvcnQgaHR0cHMgICAgICAgZnJvbSAnaHR0cHMnO1xuXG5cbmNsYXNzIEludGVyRkFYIHtcblxuICBjb25zdHJ1Y3RvcihjcmVkZW50aWFscywgZGVidWcpIHtcbiAgICB0aGlzLl9jbGllbnQgICAgID0gbmV3IENsaWVudChodHRwcywgY3JlZGVudGlhbHMsIGxpYnJhcnkudmVyc2lvbiwgZGVidWcpO1xuICAgIHRoaXMuZG9jdW1lbnRzID0gbmV3IERvY3VtZW50cyh0aGlzLl9jbGllbnQpO1xuICAgIHRoaXMuX2RlbGl2ZXJ5ICAgPSBuZXcgRGVsaXZlcnkodGhpcy5fY2xpZW50LCB0aGlzLmRvY3VtZW50cyk7XG5cbiAgICB0aGlzLm91dGJvdW5kICA9IG5ldyBPdXRib3VuZCh0aGlzLl9jbGllbnQsIHRoaXMuX2RlbGl2ZXJ5KTtcbiAgICB0aGlzLmRlbGl2ZXIgICA9IHRoaXMuX2RlbGl2ZXJ5LmRlbGl2ZXIuYmluZCh0aGlzLl9kZWxpdmVyeSk7XG5cbiAgICB0aGlzLmFjY291bnQgICA9IG5ldyBBY2NvdW50KHRoaXMuX2NsaWVudCk7XG4gICAgdGhpcy5pbmJvdW5kICAgPSBuZXcgSW5ib3VuZCh0aGlzLl9jbGllbnQpO1xuICAgIHRoaXMuZmlsZXMgICAgID0gbmV3IEZpbGVzKHRoaXMuZG9jdW1lbnRzKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBJbnRlckZBWDtcbiJdfQ==