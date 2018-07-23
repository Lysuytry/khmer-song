'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pushMessage = undefined;

var _device = require('../models/device');

var _pushNotification = require('../firebase/notification/push-notification');

const pushMessage = exports.pushMessage = async data => {
  try {
    const { id, from, to, messages } = data;
    const token = await (0, _device.getRegistrationTokenByUserId)([id], 'subscribed');
    const registerToken = token.map(item => item.registrationToken);
    console.log(registerToken);
    const s = await (0, _pushNotification.sendNotificationLegacy)({
      title: `A New Message from ${from}`,
      body: `messages to ${to}`,
      token: registerToken,
      data: { messages }
    }, {});
    console.log(s);
  } catch (error) {
    return error;
  }
};
//# sourceMappingURL=push-message.js.map