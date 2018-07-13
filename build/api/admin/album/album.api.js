'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deletedAlbumById = exports.updateAlbumById = exports.getAlbumById = exports.createAlbum = exports.getAlbumList = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _album = require('../../../models/album');

var _album2 = _interopRequireDefault(_album);

var _sequelizeConnection = require('../../../common/sequelize-connection');

var _production = require('../../../models/production');

var _production2 = _interopRequireDefault(_production);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getAlbumList = exports.getAlbumList = async (req, res) => {
  try {
    const { limit, offset, status, name, type } = req.query;
    const filterName = name ? { name: { [_sequelizeConnection.Op.like]: `%${name}%` } } : {};
    const filterType = type ? { type } : {};
    const conditions = _extends({}, filterName, { status }, filterType);
    const { rows, count } = await _album2.default.findAndCountAll({ where: conditions, offset, limit });
    res.success(rows, { limit, offset, count });
  } catch (error) {
    res.fail(error.message);
  }
};

const createAlbum = exports.createAlbum = async (req, res) => {
  try {
    const { name } = req.body;
    const { createdBy, updatedBy } = req.authUser;
    const [album] = await _album2.default.findOrCreate({ where: { name }, defaults: _extends({}, req.body, { createdBy, updatedBy }) });
    res.success(album);
  } catch (error) {
    res.fail(error.message);
  }
};

const getAlbumById = exports.getAlbumById = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.query;
    const album = await _album2.default.findOne({ where: { id, status } });
    res.success(album);
  } catch (error) {
    res.fail(error.message);
  }
};

const updateAlbumById = exports.updateAlbumById = async (req, res) => {
  try {
    const { id } = req.params;
    const statusQuery = req.query.status;
    const { updatedBy } = req.authUser;
    let { name, image, status, productionId, type } = req.body;
    name = name ? { name } : {};
    image = image ? { image } : {};
    status = status ? { status } : {};

    const result = productionId ? await _production2.default.findOne({ attributes: ['id'], where: { id: productionId } }) : true;
    if (!result) return res.fail('Production Id is invalid.');

    productionId = productionId ? { productionId } : {};
    type = type ? { type } : {};
    const data = _extends({}, name, image, status, productionId, { updatedBy }, type);
    await _album2.default.update(data, { where: { id, 'status': statusQuery } });
    res.success('Successfully updated.');
  } catch (error) {
    res.fail(error.message);
  }
};

const deletedAlbumById = exports.deletedAlbumById = async (req, res) => {
  try {
    const { id } = req.params;
    const { updatedBy } = req.authUser;
    const [result] = await _album2.default.update({ status: 'inactive', updatedBy }, { where: { id, status: 'active' } });
    result === 0 ? res.fail('If is not found') : res.success('Successfully deleted.');
  } catch (error) {
    res.fail(error.message);
  }
};
//# sourceMappingURL=album.api.js.map