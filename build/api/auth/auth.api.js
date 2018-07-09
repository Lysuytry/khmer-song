'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginAuth = exports.registerAuth = undefined;

var _user = require('../../models/user');

var _user2 = _interopRequireDefault(_user);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { SALT } = process.env;

const registerAuth = exports.registerAuth = async (req, res) => {
  try {
    const { username, password } = req.body;
    //encrypt and save
    const hash = _bcrypt2.default.hashSync(password, +SALT);
    req.body.password = hash;
    //
    const [user] = await _user2.default.findOrCreate({ where: { username }, defaults: req.body });
    //decrypt and return
    user.password = password;
    //will include token
    res.success(user);
  } catch (error) {
    res.fail(error);
  }
};

const loginAuth = exports.loginAuth = async (req, res) => {
  try {
    const { username, password } = req.body;
    //find by name
    const user = await _user2.default.findOne({ where: { username } });
    //if have => check password
    user ? !_bcrypt2.default.compareSync(password, user.password) ? res.fail('Wrong Password', 400) : {} : res.fail('Username is not found.', 400);
    user.password = password;
    res.success(user);
  } catch (error) {
    res.fail(error);
  }
};
//# sourceMappingURL=auth.api.js.map