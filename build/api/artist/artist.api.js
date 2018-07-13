'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getArtistList = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _artist = require('../../models/artist');

var _artist2 = _interopRequireDefault(_artist);

var _sequelizeConnection = require('../../common/sequelize-connection');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getArtistList = exports.getArtistList = async (req, res) => {
  try {
    const { limit, offset, status, name } = req.query;
    const filterName = name ? { name: { [_sequelizeConnection.Op.like]: `%${name}%` } } : {};
    const conditions = _extends({}, filterName, { status });
    const { rows, count } = await _artist2.default.findAndCountAll({ where: conditions, limit, offset });
    res.success(rows, { limit, offset, count });
  } catch (error) {
    res.fail(error.message);
  }
};
//# sourceMappingURL=artist.api.js.map