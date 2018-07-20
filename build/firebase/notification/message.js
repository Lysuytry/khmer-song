'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMessageLegacy = exports.createMessage = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _ios = require('./options/ios');

var _web = require('./options/web');

var _android = require('./options/android');

const createMessage = exports.createMessage = (payload, options) => {
  const { title, body, topic, token, data } = payload;
  //const {priority, badge, expired, icon, color, sound, ttl, TTL} = options;
  const filterTopic = topic ? { topic } : { token };
  const filterData = data ? { data } : {};
  return {
    message: _extends({}, filterTopic, {
      notification: {
        title,
        body
      }
    }, filterData, (0, _ios.iosOptions)(options), (0, _android.androidOptions)(options), (0, _web.webOptions)(options))
  };
};

const createMessageLegacy = exports.createMessageLegacy = payloadP => {
  const { token, title, body, data } = payloadP;
  const filterData = data ? { data } : {};
  const payload = _extends({
    notification: {
      title,
      body
    }
  }, filterData);
  const options = {
    priority: 'high',
    timeToLive: 60 * 60 * 24
  };
  //const option = legacyOptions(options);
  return {
    registrationToken: token,
    payload,
    options
  };
};
//# sourceMappingURL=message.js.map