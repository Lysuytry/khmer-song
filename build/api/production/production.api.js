'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAlbumFromProductionById = exports.getProductionList = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _album = require('../../models/album');

var _album2 = _interopRequireDefault(_album);

var _sequelizeConnection = require('../../common/sequelize-connection');

var _production = require('../../models/production');

var _production2 = _interopRequireDefault(_production);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//from admin productions

const getProductionList = exports.getProductionList = async (req, res) => {
  try {
    const { limit, offset, status, name } = req.query;
    const fliterName = name ? { name: { [_sequelizeConnection.Op.like]: `%${name}%` } } : {};
    const conditions = _extends({}, fliterName, { status });
    const { rows, count } = await _production2.default.findAndCountAll({ where: conditions, offset, limit });
    res.success(rows, { limit, offset, count });
  } catch (error) {
    res.fail(error.message);
  }
};

const getAlbumFromProductionById = exports.getAlbumFromProductionById = async (req, res) => {
  try {
    const { id } = req.params;
    const { limit, offset, status, name } = req.query;
    const fliterName = name ? { name: { [_sequelizeConnection.Op.like]: `%${name}%` } } : {};
    const fliterProductionId = { productionId: id };
    const conditions = _extends({}, fliterProductionId, fliterName, { status });
    const { rows, count } = await _album2.default.findAndCountAll({ where: conditions, offset, limit });
    res.success(rows, { limit, offset, count });
  } catch (error) {
    res.fail(error);
  }
};
//# sourceMappingURL=production.api.js.map