'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserList = undefined;

var _user = require('../../../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getUserList = exports.getUserList = async (req, res) => {
  try {
    const { limit, offset, status, role = 'guest' } = req.query;
    const conditions = { role, status };
    const { rows, count } = await _user2.default.findAndCountAll({ where: conditions, offset, limit });
    res.success(rows, { limit, offset, count });
  } catch (error) {
    res.fail(error.message);
  }
};
//# sourceMappingURL=user.api.js.map