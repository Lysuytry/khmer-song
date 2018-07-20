'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

const androidOptions = exports.androidOptions = options => {
  const { ttl = 3600 * 1000, priority, icon, color = '#f45342', sound } = options;
  const filterSound = sound ? { sound } : {};
  const filterIcon = icon ? { icon } : {};
  const filterPriority = priority ? { priority } : {};
  return {
    android: _extends({
      ttl }, filterPriority, {
      notification: _extends({}, filterIcon, {
        color
      }, filterSound)
    })
  };
};
//# sourceMappingURL=android.js.map