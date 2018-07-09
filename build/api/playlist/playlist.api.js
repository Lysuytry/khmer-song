'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deletePlaylist = exports.createPlaylist = exports.getPlaylist = undefined;

var _playlist = require('../../models/playlist');

var _playlist2 = _interopRequireDefault(_playlist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getPlaylist = exports.getPlaylist = async (req, res) => {
  try {
    //const playlist
    res.success();
  } catch (error) {
    res.fail(error);
  }
};

const createPlaylist = exports.createPlaylist = async (req, res) => {
  try {
    const { name } = req.body;
    //we must know who created it
    const [playlist] = await _playlist2.default.findOrCreate({ where: { name }, defaults: req.body });
    res.success(playlist);
  } catch (error) {
    res.fail(error);
  }
};

const deletePlaylist = exports.deletePlaylist = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await _playlist2.default.destroy({ id });
    result ? res.success('Successfully deleted.') : res.fail('Id is not found.');
  } catch (error) {
    res.fail(error);
  }
};
//# sourceMappingURL=playlist.api.js.map