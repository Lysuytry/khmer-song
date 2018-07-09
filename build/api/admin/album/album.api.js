'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAlbumList = undefined;

var _album = require('../../../models/album');

var _album2 = _interopRequireDefault(_album);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getAlbumList = exports.getAlbumList = async (req, res) => {
  try {
    const { limit, offset, status } = req.query;
    const { rows, count } = await _album2.default.findAndCountAll();
    res.success(rows, { limit, offset, count });
  } catch (error) {
    res.fail(error);
  }
};
//# sourceMappingURL=album.api.js.map