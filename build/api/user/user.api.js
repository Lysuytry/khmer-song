'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMySelf = exports.getListUserId = exports.getListUser = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _user = require('../../models/user');

var _user2 = _interopRequireDefault(_user);

var _sequelizeConnection = require('../../common/sequelize-connection');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getListUser = exports.getListUser = async (req, res) => {
  try {
    //const {id} = req.authUser;
    const { limit, offset, status, name, type, att } = req.query;
    const filterName = name ? { name: { [_sequelizeConnection.Op.like]: `%${name}%` } } : {};
    const filterType = type ? { type } : {};
    const filterAtt = att ? { attributes: [att] } : {};
    const role = 'guest';
    const conditions = _extends({}, filterName, { role, status }, filterType);
    const { rows, count } = await _user2.default.findAndCountAll(_extends({ raw: true }, filterAtt, { where: conditions, limit, offset }));
    res.success(rows, { total: count, limit, offset });
  } catch (error) {
    res.fail(error);
  }
};

const getListUserId = exports.getListUserId = async (req, res) => {
  try {
    //const {id} = req.authUser;
    const { limit, offset, status, name, type } = req.query;
    const filterName = name ? { name: { [_sequelizeConnection.Op.like]: `%${name}%` } } : {};
    const filterType = type ? { type } : {};
    const role = 'guest';
    const conditions = _extends({}, filterName, { role, status }, filterType);
    const { rows, count } = await _user2.default.findAndCountAll({
      raw: true,
      attributes: ['id'],
      where: conditions,
      limit,
      offset
    });
    res.success(rows, { total: count, limit, offset });
  } catch (error) {
    res.fail(error);
  }
};

const getMySelf = exports.getMySelf = async (req, res) => {
  try {
    //const {id} = req.authUser;
    res.success(req.authUser);
  } catch (error) {
    res.fail(error);
  }
};
//# sourceMappingURL=user.api.js.map