'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deletePlaylist = exports.createPlaylist = exports.getPlaylist = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _playlist = require('../../models/playlist');

var _playlist2 = _interopRequireDefault(_playlist);

var _user = require('../../models/user');

var _user2 = _interopRequireDefault(_user);

var _sequelizeConnection = require('../../common/sequelize-connection');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getPlaylist = exports.getPlaylist = async (req, res) => {
  try {
    const { id } = req.params;
    const { limit, offset, name } = req.query;
    const fliterName = name ? { name: { [_sequelizeConnection.Op.like]: `%${name}%` } } : {};
    const conditions = _extends({ userId: id }, fliterName);
    const { rows, count } = await _playlist2.default.findAndCountAll({ where: conditions, offset, limit });
    res.success(rows, { count, limit, offset });
  } catch (error) {
    res.fail(error);
  }
};

const createPlaylist = exports.createPlaylist = async (req, res) => {
  try {
    const { name, userId } = req.body;
    //we must know who created it
    const user = await _user2.default.findById(userId);
    const [playlist] = !user ? res.fail('User Id is not found.') : await _playlist2.default.findOrCreate({ where: { name }, defaults: req.body });
    res.success(playlist);
  } catch (error) {
    res.fail(error);
  }
};

const deletePlaylist = exports.deletePlaylist = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await _playlist2.default.destroy({ where: { id } });
    result ? res.success('Successfully deleted.') : res.fail('Id is not found.');
  } catch (error) {
    res.fail(error);
  }
};
//# sourceMappingURL=playlist.api.js.map