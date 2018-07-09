'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteCategory = exports.updateCategoryById = exports.getCategoryById = exports.createCategory = exports.getCategoryList = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _category = require('../../../models/category');

var _category2 = _interopRequireDefault(_category);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getCategoryList = exports.getCategoryList = async (req, res) => {
  try {
    const { limit, offset, status } = req.query;
    const { rows, count } = await _category2.default.findAndCountAll({ where: { status }, limit, offset });
    res.success(rows, { limit, offset, count });
  } catch (error) {
    res.fail(error);
  }
};

const createCategory = exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const [category] = await _category2.default.findOrCreate({ where: { name }, defaults: req.body });
    res.success(category);
  } catch (error) {
    res.fail(error);
  }
};

const getCategoryById = exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.query;
    const category = await _category2.default.findOne({ where: { id, status } });
    res.success(category);
  } catch (error) {
    res.fail(error);
  }
};

const updateCategoryById = exports.updateCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const statusQuery = req.query.status;
    let { name, status, createdBy, updatedBy } = req.body;
    name ? { name } : {};
    createdBy ? { createdBy } : {};
    updatedBy ? { updatedBy } : {};
    status ? { status } : {};
    const data = _extends({}, name, status, createdBy, updatedBy);
    await _category2.default.update(data, { where: { id, status: statusQuery } });
    res.success('Successfully updated.');
  } catch (error) {
    res.fail(error);
  }
};

const deleteCategory = exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await _category2.default.update({ status: 'inactive' }, { where: { id, status: 'active' } });
    result === 0 ? res.success('Id is not found.') : res.success('Successfully deleted');
  } catch (error) {
    res.fail(error);
  }
};
//# sourceMappingURL=category.api.js.map