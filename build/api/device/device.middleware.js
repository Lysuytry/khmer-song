'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateDeviceCreating = undefined;

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _validator = require('../../common/validator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const deviceCreatingSchema = _joi2.default.object().keys({
  name: _joi2.default.string().required(),
  registrationToken: _joi2.default.string().required(),
  type: _joi2.default.string().required(),
  tags: _joi2.default.string()
});

const validateDeviceCreating = exports.validateDeviceCreating = (req, res, next) => {
  (0, _validator.validator)(req.body, deviceCreatingSchema, req, res, next);
};
//# sourceMappingURL=device.middleware.js.map