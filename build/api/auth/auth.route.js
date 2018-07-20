'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _auth = require('./auth.api');

var _auth2 = require('./auth.middleware');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _pushNotification = require('../../firebase/notification/push-notification');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routeAuth = (0, _express.Router)();

routeAuth.get('/login', async (req, res) => {
  try {
    const s = await (0, _pushNotification.sendNotificationLegacy)({
      title: `A New Message from `,
      body: 'messages',
      token: ['fBs7ZSVMtMI:APA91bGGQhMUW6g-o6Dy4NYslf3ijfVFVZGhxUwg63HMbPX2hhvcVVURwx1cJQGB8MOAWkAoxGnfIQrxlOZoCBr3CDJRsW3_83PhV7JaigL6JcMNyZvzciCKHmqrHfdxROrSVkKakHrkAtDoMeP9bTQ9YMkhrkIEMw'],
      data: { hello: 'hi' }
    }, {});
    console.log(s);
  } catch (error) {
    res.fail(error);
  }
  const file = _path2.default.join(__dirname + '../../../../html/login.html');
  res.sendFile(file);
});
routeAuth.post('/login', _auth2.validateAuthLogin, _auth.loginAuth);
routeAuth.post('/register', _auth2.validateAuthRegister, _auth.registerAuth);

exports.default = routeAuth;
//# sourceMappingURL=auth.route.js.map