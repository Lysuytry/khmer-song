import Song, { getSongArtistCategory } from '../../models/song';
import ArtistSong from '../../models/artist-song';
import Artist from '../../models/artist';
import { Op } from '../../common/sequelize-connection';
import Category from '../../models/category';
import Album from '../../models/album';
import Production from '../../models/production';

export const getSongList = async (req, res) => {
  try {
    const { limit, offset } = req.query;
    const { songs, count } = await getSongArtistCategory(req.query);
    res.success(songs, { count, limit, offset });
  } catch (error) {
    res.fail(error.message);
  }
};

export const getSongById = async (req, res) => {
  try {
    const { id } = req.params;
    //check song in songs & artist-song
    const [song, artistIds] = await Promise.all([
      Song.findOne({ raw: true, where: { id, status: 'active' } }),
      ArtistSong.findAll({ raw: true, attributes: ['artistId'], where: { songId: id } })
    ]);
    if (!song) res.fail('Song Id is invalid.');
    const { albumId, categoryId } = song;
    const ids = artistIds.map(artist => {
      return artist.artistId;
    });
    const albumAttribute = [['name', 'albumName'], ['id', 'albumId'], ['image', 'albumImage'], 'productionId'];
    const artistAttribute = [
      ['name', 'artistName'],
      ['image', 'artistImage'],
      ['type', 'artistType'],
      ['id', 'artistId']
    ];
    const categoryAttribute = [['name', 'category'], ['id', 'categoryId']];
    const productionAttribute = [['name', 'productionName'], ['logo', 'productionLogo'], ['id', 'productionId']];
    //if have => categoryId, album..Id, artist in [artistIds]
    const [album, category, artists] = await Promise.all([
      Album.findOne({ raw: true, attributes: albumAttribute, where: { id: albumId } }),
      Category.findOne({ raw: true, attributes: categoryAttribute, where: { id: categoryId } }),
      Artist.findAll({ raw: true, attributes: artistAttribute, where: { id: { [Op.in]: ids } } })
    ]);
    //get productionId from album => productions
    const production = await Production.findOne({
      raw: true,
      attributes: productionAttribute,
      where: { id: album.productionId }
    });
    res.success({ ...song, ...category, ...album, ...production, artists });
  } catch (error) {
    res.fail(error.message);
  }
};
