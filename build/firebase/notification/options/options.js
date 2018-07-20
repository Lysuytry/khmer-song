'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.legacyOptions = exports.options = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _android = require('./android');

var _ios = require('./ios');

var _web = require('./web');

const options = exports.options = options => {
  console.log('after option');
  return _extends({}, (0, _android.androidOptions)(options), (0, _ios.iosOptions)(options), (0, _web.webOptions)(options));
};

const legacyOptions = exports.legacyOptions = options => {
  const { priority = 'high', timeToLive = 60 * 60 * 24 } = options;
  return {
    priority,
    timeToLive
  };
};
//# sourceMappingURL=options.js.map