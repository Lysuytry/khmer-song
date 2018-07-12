'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deletedArtistById = exports.updateArtistById = exports.getArtistById = exports.createArtist = exports.getArtistList = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _artist = require('../../../models/artist');

var _artist2 = _interopRequireDefault(_artist);

var _sequelizeConnection = require('../../../common/sequelize-connection');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getArtistList = exports.getArtistList = async (req, res) => {
  try {
    const { limit, offset, status, name } = req.query;
    const fliterName = name ? { name: { [_sequelizeConnection.Op.like]: `%${name}%` } } : {};
    const conditions = _extends({}, fliterName, { status });
    const { rows, count } = await _artist2.default.findAndCountAll({ where: conditions, limit, offset });
    res.success(rows, { limit, offset, count });
  } catch (error) {
    res.fail(error.message);
  }
};

const createArtist = exports.createArtist = async (req, res) => {
  try {
    const { name } = req.body;
    const [artist] = await _artist2.default.findOrCreate({ where: { name }, defaults: req.body });
    res.success(artist);
  } catch (error) {
    res.fail(error.message);
  }
};

const getArtistById = exports.getArtistById = async (req, res) => {
  try {
    const { status } = req.query;
    const { id } = req.params;
    const artist = await _artist2.default.findOne({ where: { id, status } });
    res.success(artist);
  } catch (error) {
    res.fail(error.message);
  }
};

const updateArtistById = exports.updateArtistById = async (req, res) => {
  try {
    const { status } = req.query;
    const { id } = req.params;
    let { name, type, image, createdBy, updatedBy } = req.body;
    name = name ? { name } : {};
    type = type ? { type } : {};
    image = image ? { image } : {};
    createdBy = createdBy ? { createdBy } : {};
    updatedBy = updatedBy ? { updatedBy } : {};
    const data = _extends({}, name, type, image, createdBy, updatedBy);
    await _artist2.default.update(data, { where: { id, status } });
    res.success('Succesfully updated');
  } catch (error) {
    res.fail(error.message);
  }
};

const deletedArtistById = exports.deletedArtistById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await _artist2.default.update({ status: 'inactive' }, { where: { id, status: 'active' } });
    result === 1 ? res.success('Successfully deleted.') : res.success('Id not found');
  } catch (error) {
    res.fail(error.message);
  }
};
//# sourceMappingURL=artist.api.js.map