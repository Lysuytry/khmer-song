'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _auth = require('./auth.api');

var _auth2 = require('./auth.middleware');

const routeAuth = (0, _express.Router)();

routeAuth.post('/login', _auth2.validateAuthLogin, _auth.loginAuth);
routeAuth.post('/register', _auth2.validateAuthRegister, _auth.registerAuth);

exports.default = routeAuth;
//# sourceMappingURL=auth.route.js.map