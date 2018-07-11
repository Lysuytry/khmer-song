'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = exports.getToken = undefined;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { SECRET } = process.env;

const getToken = exports.getToken = payload => {
  return _jsonwebtoken2.default.sign(payload, SECRET);
};

const verifyToken = exports.verifyToken = token => {
  return _jsonwebtoken2.default.verify(token, SECRET);
};
//# sourceMappingURL=jwt.js.map