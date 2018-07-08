'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getProductionById = exports.deleteProductionById = exports.updateProductionById = exports.createProduction = exports.getProductionList = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _production = require('../../../models/production');

var _production2 = _interopRequireDefault(_production);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getProductionList = exports.getProductionList = async (req, res) => {
  try {
    const { limit, offset, status } = req.query;
    const { rows, count } = await _production2.default.findAndCountAll({ where: { status }, limit, offset });
    res.success(rows, { limit, offset, count });
  } catch (error) {
    res.fail(error.message);
  }
};

const createProduction = exports.createProduction = async (req, res) => {
  try {
    const production = await _production2.default.findOrCreate({ where: { name }, defaults: req.body });
    res.success(production);
  } catch (error) {
    res.fail(error);
  }
};

const updateProductionById = exports.updateProductionById = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.query;
    let { name, logo, createdBy, updatedBy } = req.body;
    name ? { name } : {};
    logo ? { logo } : {};
    createdBy ? { createdBy } : {};
    updatedBy ? { updatedBy } : {};
    const data = _extends({}, name, log, createdBy, updatedBy);
    await _production2.default.update(data, { where: { id, status } });
    res.success('Successfully updated.');
  } catch (error) {
    res.fail(error);
  }
};

const deleteProductionById = exports.deleteProductionById = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.query;
    const result = await _production2.default.update({ status: 'inactive' }, { where: { id, status: 'active' } });
    result === 1 ? res.success('Successfully deleted.') : res.success('Id is not found.');
  } catch (error) {
    res.fail(error);
  }
};

const getProductionById = exports.getProductionById = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.query;
    const production = await _production2.default.findOne({ where: { id, status } });
    res.success(production);
  } catch (error) {
    res.fail(error);
  }
};
//# sourceMappingURL=production.api.js.map