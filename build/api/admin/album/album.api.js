'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deletedAlbumById = exports.updateAlbumById = exports.getAlbumById = exports.createAlbum = exports.getAlbumList = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _album = require('../../../models/album');

var _album2 = _interopRequireDefault(_album);

var _sequelizeConnection = require('../../../common/sequelize-connection');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getAlbumList = exports.getAlbumList = async (req, res) => {
  try {
    const { limit, offset, status, name, type } = req.query;
    const fliterName = name ? { name: { [_sequelizeConnection.Op.like]: `%${name}%` } } : {};
    const fliterType = type ? { type } : {};
    const conditions = _extends({}, fliterName, { status }, fliterType);
    const { rows, count } = await _album2.default.findAndCountAll({ where: conditions, offset, limit });
    res.success(rows, { limit, offset, count });
  } catch (error) {
    res.fail(error);
  }
};

const createAlbum = exports.createAlbum = async (req, res) => {
  try {
    const { name } = req.body;
    const [album] = await _album2.default.findOrCreate({ where: { name }, defaults: req.body });
    res.success(album);
  } catch (error) {
    res.fail(error);
  }
};

const getAlbumById = exports.getAlbumById = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.query;
    const album = await _album2.default.findOne({ where: { id, status } });
    res.success(album);
  } catch (error) {
    res.fail(error);
  }
};

const updateAlbumById = exports.updateAlbumById = async (req, res) => {
  try {
    const { id } = req.params;
    const statusQuery = req.query.status;
    let { name, image, status, productionId, createdBy, updatedBy, type } = req.body;
    name = name ? { name } : {};
    image = image ? { image } : {};
    status = status ? { status } : {};
    productionId = productionId ? { productionId } : {};
    createdBy = createdBy ? { createdBy } : {};
    updatedBy = updatedBy ? { updatedBy } : {};
    type = type ? { type } : {};
    const data = _extends({}, name, image, status, productionId, createdBy, updatedBy, type);
    await _album2.default.update(data, { where: { id, 'status': statusQuery } });
    res.success('Successfully updated.');
  } catch (error) {
    res.fail(error);
  }
};

const deletedAlbumById = exports.deletedAlbumById = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await _album2.default.update({ status: 'inactive' }, { where: { id, status: 'active' } });
    result === 0 ? res.fail('If is not found') : res.success('Successfully deleted.');
  } catch (error) {
    res.fail(error);
  }
};
//# sourceMappingURL=album.api.js.map