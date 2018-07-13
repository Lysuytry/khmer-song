'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteCategory = exports.updateCategoryById = exports.getCategoryById = exports.createCategory = exports.getCategoryList = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _category = require('../../../models/category');

var _category2 = _interopRequireDefault(_category);

var _sequelizeConnection = require('../../../common/sequelize-connection');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getCategoryList = exports.getCategoryList = async (req, res) => {
  try {
    const { limit, offset, status, name } = req.query;
    const filterName = name ? { name: { [_sequelizeConnection.Op.like]: `%${name}%` } } : {};
    const conditions = _extends({}, filterName, { status });
    const { rows, count } = await _category2.default.findAndCountAll({ where: conditions, limit, offset });
    res.success(rows, { limit, offset, count });
  } catch (error) {
    res.fail(error.message);
  }
};

const createCategory = exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const { updatedBy, createdBy } = req.authUser;
    const [category] = await _category2.default.findOrCreate({
      where: { name },
      defaults: _extends({}, req.body, { createdBy, updatedBy })
    });
    res.success(category);
  } catch (error) {
    res.fail(error.message);
  }
};

const getCategoryById = exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.query;
    const category = await _category2.default.findOne({ where: { id, status } });
    res.success(category);
  } catch (error) {
    res.fail(error.message);
  }
};

const updateCategoryById = exports.updateCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const statusQuery = req.query.status;
    const { updatedBy } = req.authUser;
    let { name, status } = req.body;
    name ? { name } : {};
    updatedBy ? { updatedBy } : {};
    status ? { status } : {};
    const data = _extends({}, name, status, { updatedBy });
    await _category2.default.update(data, { where: { id, status: statusQuery } });
    res.success('Successfully updated.');
  } catch (error) {
    res.fail(error.message);
  }
};

const deleteCategory = exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { updatedBy } = req.authUser;
    const [result] = await _category2.default.update({ status: 'inactive', updatedBy }, { where: { id, status: 'active' } });
    result === 0 ? res.success('Id is not found.') : res.success('Successfully deleted');
  } catch (error) {
    res.fail(error.message);
  }
};
//# sourceMappingURL=category.api.js.map