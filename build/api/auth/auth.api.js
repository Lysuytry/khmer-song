'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginAuth = exports.registerAuth = undefined;

var _user = require('../../models/user');

var _user2 = _interopRequireDefault(_user);

var _sequelizeConnection = require('../../common/sequelize-connection');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const registerAuth = exports.registerAuth = async (req, res) => {
  try {
    const { username } = req.body;
    const [user] = await _user2.default.findOrCreate({ where: { username }, defaults: req.body });
    res.success(user);
  } catch (error) {
    res.fail(error);
  }
};

const loginAuth = exports.loginAuth = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await _user2.default.findOne({ where: { username, password } });
    res.success(user);
  } catch (error) {
    res.fail(error);
  }
};
//# sourceMappingURL=auth.api.js.map