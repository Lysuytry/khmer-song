'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _user = require('./user.api');

const routeUser = (0, _express.Router)();

routeUser.get('/', _user.getUserList);

exports.default = routeUser;
//# sourceMappingURL=user.route.js.map