'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _production = require('./production/production.route');

var _production2 = _interopRequireDefault(_production);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const admin = (0, _express2.default)();

admin.use('/productions', _production2.default);

exports.default = admin;
//# sourceMappingURL=admin.js.map