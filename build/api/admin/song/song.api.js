'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSongList = undefined;

var _song = require('../../../models/song');

var _song2 = _interopRequireDefault(_song);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getSongList = exports.getSongList = async (req, res) => {
  try {
    const { limit, offset, status } = req.query;
    const { rows, count } = await _song2.default.findAndCount();
    res.success(rows, { limit, offset, count });
  } catch (error) {
    res.fail(error);
  }
};
//# sourceMappingURL=song.api.js.map