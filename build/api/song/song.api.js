'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSongById = exports.getSongList = undefined;

var _song = require('../../models/song');

var _song2 = _interopRequireDefault(_song);

var _artistSong = require('../../models/artist-song');

var _artistSong2 = _interopRequireDefault(_artistSong);

var _artist = require('../../models/artist');

var _artist2 = _interopRequireDefault(_artist);

var _sequelizeConnection = require('../../common/sequelize-connection');

var _category = require('../../models/category');

var _category2 = _interopRequireDefault(_category);

var _album = require('../../models/album');

var _album2 = _interopRequireDefault(_album);

var _production = require('../../models/production');

var _production2 = _interopRequireDefault(_production);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getSongList = exports.getSongList = async (req, res) => {
  try {
    res.success();
  } catch (error) {
    res.fail(error.message);
  }
};

const getSongById = exports.getSongById = async (req, res) => {
  try {
    const { id } = req.params;
    //check song in songs & artist-song
    const [song, artistIds] = await Promise.all([_song2.default.findOne({ where: { id, status: 'active' } }), _artistSong2.default.findAll({ raw: true, attributes: ['artistId'], where: { songId: id } })]);
    if (!song) res.fail('Song Id is invalid.');
    const { albumId, categoryId } = song;
    const ids = artistIds.map(artist => {
      return artist.artistId;
    });
    //if have => cate..Id, album..Id, artist in [artistIds]
    const [album, category, artists] = await Promise.all([_album2.default.findOne({ where: { id: albumId } }), _category2.default.findOne({ where: { id: categoryId } }), _artist2.default.findAll({ where: { id: { [_sequelizeConnection.Op.in]: ids } } })]);
    //get productionId from album => productions
    const production = await _production2.default.findOne({ where: { id: album.productionId } });
    res.success({ song, category, album, production, artists });
  } catch (error) {
    res.fail(error.message);
  }
};
//# sourceMappingURL=song.api.js.map