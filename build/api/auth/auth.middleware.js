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
  role: _joi2.default.string(),
  createdBy: _joi2.default.number().required(),
  updatedBy: _joi2.default.number().required()
});

const authLoginSchema = _joi2.default.object().keys({
  username: _joi2.default.string().alphanum().required(),
  password: _joi2.default.string().alphanum().required(),
  role: _joi2.default.string(),
  createdBy: _joi2.default.number(),
  updatedBy: _joi2.default.number()
});

const validateAuthRegister = exports.validateAuthRegister = (req, res, next) => {
  const { username, password, role, createdBy, updatedBy } = req.body;
  (0, _validator.validator)({ username, password, role, createdBy, updatedBy }, authRegisterSchema, req, res, next);
};

const validateAuthLogin = exports.validateAuthLogin = (req, res, next) => {
  const { username, password, role, createdBy, updatedBy } = req.body;
  (0, _validator.validator)({ username, password, role, createdBy, updatedBy }, authLoginSchema, req, res, next);
};
//# sourceMappingURL=auth.middleware.js.map