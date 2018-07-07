'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getArtistList = undefined;

var _artist = require('../../../models/artist');

var _artist2 = _interopRequireDefault(_artist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getArtistList = exports.getArtistList = async (req, res) => {
  try {
    const { limit, skip, status } = req.query;
    const { rows, count } = await _artist2.default.findAndCountAll();
    res.success(rows, { limit, skip, count });
  } catch (error) {
    res.fail(error);
  }
};
//# sourceMappingURL=artist.api.js.map