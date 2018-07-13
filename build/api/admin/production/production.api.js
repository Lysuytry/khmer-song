'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getProductionById = exports.deleteProductionById = exports.updateProductionById = exports.createProduction = exports.getProductionList = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _production = require('../../../models/production');

var _production2 = _interopRequireDefault(_production);

var _sequelizeConnection = require('../../../common/sequelize-connection');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getProductionList = exports.getProductionList = async (req, res) => {
  try {
    const { limit, offset, status, name } = req.query;
    const filterName = name ? { name: { [_sequelizeConnection.Op.like]: `%${name}%` } } : {};
    const conditions = _extends({}, filterName, { status });
    const { rows, count } = await _production2.default.findAndCountAll({ where: conditions, limit, offset });
    res.success(rows, { limit, offset, count });
  } catch (error) {
    res.fail(error.message);
  }
};

const createProduction = exports.createProduction = async (req, res) => {
  try {
    const { name } = req.body;
    const { createdBy, updatedBy } = req.authUser;
    const [production] = await _production2.default.findOrCreate({ where: { name }, defaults: _extends({}, req.body, { createdBy, updatedBy }) });
    res.success(production);
  } catch (error) {
    res.fail(error.message);
  }
};

const updateProductionById = exports.updateProductionById = async (req, res) => {
  try {
    const { id } = req.params;
    const statusQuery = req.query.status;
    let { name, logo, status } = req.body;
    const { updatedBy } = req.authUser;
    name = name ? { name } : {};
    logo = logo ? { logo } : {};
    //createdBy = createdBy ? {createdBy} : {};
    status = status ? { status } : {};
    const data = _extends({}, name, logo, status, { updatedBy });
    await _production2.default.update(data, { where: { id, 'status': statusQuery } });
    res.success('Successfully updated.');
  } catch (error) {
    res.fail(error.message);
  }
};

const deleteProductionById = exports.deleteProductionById = async (req, res) => {
  try {
    const { id } = req.params;
    const { updatedBy } = req.authUser;
    const [result] = await _production2.default.update({ status: 'inactive', updatedBy }, { where: { id, status: 'active' } });
    result === 0 ? res.success('Id is not found.') : res.success('Successfully deleted.');
  } catch (error) {
    res.fail(error.message);
  }
};

const getProductionById = exports.getProductionById = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.query;
    const production = await _production2.default.findOne({ where: { id, status } });
    res.success(production);
  } catch (error) {
    res.fail(error.message);
  }
};
//# sourceMappingURL=production.api.js.map