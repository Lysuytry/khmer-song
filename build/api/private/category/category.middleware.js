'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validatCategoryUpdating = exports.validatCategoryCreating = undefined;

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _validator = require('../../../common/validator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const categoryCreatingSchema = _joi2.default.object().keys({
  name: _joi2.default.string().required(),
  status: _joi2.default.string(),
  createdBy: _joi2.default.string(),
  updatedBy: _joi2.default.string()
});

const categoryUpdatingSchema = _joi2.default.object().keys({
  name: _joi2.default.string(),
  status: _joi2.default.string(),
  createdBy: _joi2.default.string(),
  updatedBy: _joi2.default.string()
});

const validatCategoryCreating = exports.validatCategoryCreating = (req, res, next) => {
  const { name, status, createtBy, updatedBy } = req.body;
  (0, _validator.validator)({ name, status, createtBy, updatedBy }, categoryCreatingSchema, req, res, next);
};

const validatCategoryUpdating = exports.validatCategoryUpdating = (req, res, next) => {
  const { name, status, createtBy, updatedBy } = req.body;
  (0, _validator.validator)({ name, status, createtBy, updatedBy }, categoryUpdatingSchema, req, res, next);
};
//# sourceMappingURL=category.middleware.js.map