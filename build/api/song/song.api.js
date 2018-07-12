'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSongById = exports.getSongList = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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
    const { limit, offset } = req.query;
    const { songs, count } = await (0, _song.getSongArtistCategory)(req.query);
    res.success(songs, { count, limit, offset });
  } catch (error) {
    res.fail(error.message);
  }
};

const getSongById = exports.getSongById = async (req, res) => {
  try {
    const { id } = req.params;
    //check song in songs & artist-song
    const [song, artistIds] = await Promise.all([_song2.default.findOne({ raw: true, where: { id, status: 'active' } }), _artistSong2.default.findAll({ raw: true, attributes: ['artistId'], where: { songId: id } })]);
    if (!song) res.fail('Song Id is invalid.');
    const { albumId, categoryId } = song;
    const ids = artistIds.map(artist => {
      return artist.artistId;
    });
    const albumAttribute = [['name', 'albumName'], ['id', 'albumId'], ['image', 'albumImage'], 'productionId'];
    const artistAttribute = [['name', 'artistName'], ['image', 'artistImage'], ['type', 'artistType'], ['id', 'artistId']];
    const categoryAttribute = [['name', 'category'], ['id', 'categoryId']];
    const productionAttribute = [['name', 'productionName'], ['logo', 'productionLogo'], ['id', 'productionId']];
    //if have => cate..Id, album..Id, artist in [artistIds]
    const [album, category, artists] = await Promise.all([_album2.default.findOne({ raw: true, attributes: albumAttribute, where: { id: albumId } }), _category2.default.findOne({ raw: true, attributes: categoryAttribute, where: { id: categoryId } }), _artist2.default.findAll({ raw: true, attributes: artistAttribute, where: { id: { [_sequelizeConnection.Op.in]: ids } } })]);
    //get productionId from album => productions
    const production = await _production2.default.findOne({
      raw: true,
      attributes: productionAttribute,
      where: { id: album.productionId }
    });
    res.success(_extends({}, song, category, album, production, { artists }));
  } catch (error) {
    res.fail(error.message);
  }
};
//# sourceMappingURL=song.api.js.map