import Song from '../../models/song';
import ArtistSong from '../../models/artist-song';
import Artist from '../../models/artist';
import { Op } from '../../common/sequelize-connection';
import Category from '../../models/category';
import Album from '../../models/album';
import Production from '../../models/production';

export const getSongList = async (req, res) => {
  try {
    res.success();
  } catch (error) {
    res.fail(error.message);
  }
};

export const getSongById = async (req, res) => {
  try {
    const { id } = req.params;
    //check song in songs & artist-song
    const [song, artistIds] = await Promise.all([
      Song.findOne({ where: { id, status: 'active' } }),
      ArtistSong.findAll({ raw: true, attributes: ['artistId'], where: { songId: id } })
    ]);
    if (!song) res.fail('Song Id is invalid.');
    const { albumId, categoryId } = song;
    const ids = artistIds.map(artist => {
      return artist.artistId;
    });
    //if have => cate..Id, album..Id, artist in [artistIds]
    const [album, category, artists] = await Promise.all([
      Album.findOne({ where: { id: albumId } }),
      Category.findOne({ where: { id: categoryId } }),
      Artist.findAll({ where: { id: { [Op.in]: ids } } })
    ]);
    //get productionId from album => productions
    const production = await Production.findOne({ where: { id: album.productionId } });
    res.success({ song, category, album, production, artists });
  } catch (error) {
    res.fail(error.message);
  }
};
