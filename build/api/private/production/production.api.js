'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getProductionList = undefined;

var _production = require('../../../models/production');

var _production2 = _interopRequireDefault(_production);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getProductionList = exports.getProductionList = async (req, res) => {
  try {
    const { rows, count } = await _production2.default.findAndCountAll();
    res.success({ productions: rows, count });
  } catch (error) {
    res.fail(error.message);
  }
};
//# sourceMappingURL=production.api.js.map