'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyUser = exports.loginAuth = exports.registerAuth = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _user = require('../../models/user');

var _user2 = _interopRequireDefault(_user);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jwt = require('../../common/jwt');

var _jsonStringifySafe = require('json-stringify-safe');

var _jsonStringifySafe2 = _interopRequireDefault(_jsonStringifySafe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import randomstring from 'randomstring';
//import { sendEMail } from '../../common/send-mail';

const { SALT } = process.env;

const registerAuth = exports.registerAuth = async (req, res) => {
  try {
    const { username, password } = req.body;
    //encrypt and save
    const hash = _bcrypt2.default.hashSync(password, +SALT);
    req.body.password = hash;
    //
    const [user1] = await _user2.default.findOrCreate({ where: { username }, defaults: req.body });
    const payload = { id: user1.id, role: user1.role, username };
    const user = JSON.parse((0, _jsonStringifySafe2.default)(user1));
    const data = _extends({}, user, { password: undefined, token: (0, _jwt.getToken)(payload) });
    res.success(data);
  } catch (error) {
    res.fail(error.message);
  }
};

const loginAuth = exports.loginAuth = async (req, res) => {
  try {
    const { username, password } = req.body;
    //find by name
    const user = await _user2.default.findOne({ raw: true, where: { username } });
    //if have => check password
    user ? !_bcrypt2.default.compareSync(password, user.password) ? res.fail('Wrong Password', 400) : {} : res.fail('Username is not found.', 400);
    //if authenticate true
    const payload = { id: user.id, role: user.role, username };
    res.success(_extends({}, user, { password: undefined, token: (0, _jwt.getToken)(payload) }));
  } catch (error) {
    res.fail(error.message);
  }
};

//external function used for verify if user passed the jwt first step before push to access token
const verifyUser = exports.verifyUser = async (data, res) => {
  try {
    const user = await _user2.default.findOne({ where: _extends({}, data) });
    return user ? user : res.fail('Not user');
  } catch (error) {
    res.fail(error.message);
  }
};
//# sourceMappingURL=auth.api.js.map