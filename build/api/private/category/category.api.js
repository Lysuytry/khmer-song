'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCategoryList = undefined;

var _category = require('../../../models/category');

var _category2 = _interopRequireDefault(_category);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getCategoryList = exports.getCategoryList = async (req, res) => {
  try {
    const { limit, offset, status } = req.query;
    const { rows, count } = await _category2.default.findAndCountAll();
    res.success(rows, { limit, offset, count });
  } catch (error) {
    res.fail(error);
  }
};
//# sourceMappingURL=category.api.js.map