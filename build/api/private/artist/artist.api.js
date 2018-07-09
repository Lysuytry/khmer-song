'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deletedArtistById = exports.updateArtistById = exports.getArtistById = exports.createArtist = exports.getArtistList = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _artist = require('../../../models/artist');

var _artist2 = _interopRequireDefault(_artist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getArtistList = exports.getArtistList = async (req, res) => {
  try {
    const { limit, offset, status } = req.query;
    const { rows, count } = await _artist2.default.findAndCountAll({ where: { status } }, { limit });
    res.success(rows, { limit, offset, count });
  } catch (error) {
    res.fail(error);
  }
};

const createArtist = exports.createArtist = async (req, res) => {
  try {
    const { name } = req.body;
    const [artist] = await _artist2.default.findOrCreate({ where: { name }, defaults: req.body });
    res.success(artist);
  } catch (error) {
    res.fail(error);
  }
};

const getArtistById = exports.getArtistById = async (req, res) => {
  try {
    const { status } = req.query;
    const { id } = req.params;
    const artist = await _artist2.default.find({ where: { id, status } });
    res.success(artist);
  } catch (error) {
    res.fail(error);
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
    res.fail(error);
  }
};

const deletedArtistById = exports.deletedArtistById = async (req, res) => {
  try {
    const { status } = req.query;
    const { id } = req.params;
    const result = await _artist2.default.update({ status: 'inactive' }, { where: { id, status } });
    result === 1 ? res.success('Successfully deleted.') : res.success('Id not found');
  } catch (error) {
    res.fail(error);
  }
};
//# sourceMappingURL=artist.api.js.map