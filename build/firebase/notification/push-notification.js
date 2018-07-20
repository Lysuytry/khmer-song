'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendNotification = exports.sendNotificationLegacy = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _fcm = require('./fcm');

var _fcm2 = _interopRequireDefault(_fcm);

var _message = require('./message');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const sendNotificationLegacy = exports.sendNotificationLegacy = async data => {
  try {
    const message = (0, _message.createMessageLegacy)(data);
    const { registrationToken, payload, options } = message;
    const result = await _fcm2.default.messaging().sendToDevice(registrationToken, payload, options);
    console.log(result);
    return result;
  } catch (error) {
    return error;
  }
};

const sendNotification = exports.sendNotification = async (payload, options) => {
  try {
    //message.js
    //const { title, body, topic, token, data } = payload;
    //const {priority, badge, expired, icon, color, sound, ttl, TTL} = options;
    const message = (0, _message.createMessage)(payload, options);
    //console.log(message);
    // Send a message to the device corresponding to the provided
    // registration token.
    const result = await _fcm2.default.messaging().send(_extends({}, message));
    return result;
  } catch (error) {
    return error;
  }
};
//# sourceMappingURL=push-notification.js.map