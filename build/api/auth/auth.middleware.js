'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateAuthLogin = exports.validateAuthRegister = undefined;

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _validator = require('../../common/validator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const authRegisterSchema = _joi2.default.object().keys({
  username: _joi2.default.string().alphanum().required(),
  password: _joi2.default.string().alphanum().required(),
  role: _joi2.default.string()
});

const authLoginSchema = _joi2.default.object().keys({
  username: _joi2.default.string().alphanum().required(),
  password: _joi2.default.string().alphanum().required(),
  role: _joi2.default.string()
});

const validateAuthRegister = exports.validateAuthRegister = (req, res, next) => {
  const { username, password, role } = req.body;
  (0, _validator.validator)({ username, password, role }, authRegisterSchema, req, res, next);
};

const validateAuthLogin = exports.validateAuthLogin = (req, res, next) => {
  const { username, password, role } = req.body;
  (0, _validator.validator)({ username, password, role }, authLoginSchema, req, res, next);
};
//# sourceMappingURL=auth.middleware.js.map