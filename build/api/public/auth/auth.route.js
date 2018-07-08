'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

const routeAuth = (0, _express.Router)();

routeAuth.get('/');
routeAuth.post('/login');
routeAuth.post('/register');

exports.default = routeAuth;
//# sourceMappingURL=auth.route.js.map