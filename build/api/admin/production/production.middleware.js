'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateProductionUpdating = exports.validateProductionCreating = undefined;

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _validator = require('../../../common/validator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const productionCreatingSchema = _joi2.default.object().keys({
  name: _joi2.default.string().required(),
  logo: _joi2.default.string(),
  updatedBy: _joi2.default.string(),
  createdBy: _joi2.default.string()
});

const productionUpdatingSchema = _joi2.default.object().keys({
  name: _joi2.default.string(),
  logo: _joi2.default.string(),
  updatedBy: _joi2.default.string(),
  createdBy: _joi2.default.string(),
  status: _joi2.default.string()
});

const validateProductionCreating = exports.validateProductionCreating = (req, res, next) => {
  const { name, logo, createdBy, updatedBy } = req.body;
  (0, _validator.validator)({ name, logo, createdBy, updatedBy }, productionCreatingSchema, req, res, next);
};

const validateProductionUpdating = exports.validateProductionUpdating = (req, res, next) => {
  const { name, logo, status, createdBy, updatedBy } = req.body;
  (0, _validator.validator)({ name, logo, status, createdBy, updatedBy }, productionUpdatingSchema, req, res, next);
};
//# sourceMappingURL=production.middleware.js.map