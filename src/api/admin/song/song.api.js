import Song, { insertSong, updateSong } from '../../../models/song';
import Artist from '../../../models/artist';
//import ArtistSong from '../../../models/artist-song';
import Album from '../../../models/album';
import Category from '../../../models/category';
import { Op } from '../../../common/sequelize-connection';

export const getSongList = async (req, res) => {
  try {
    const { limit, offset, status, name } = req.query;
    const fliterName = name ? { name: { [Op.like]: `%${name}%` } } : {};
    const conditions = { ...fliterName, status };
    const { rows, count } = await Song.findAndCount({ where: conditions, offset, limit });
    res.success(rows, { limit, offset, count });
  } catch (error) {
    res.fail(error);
  }
};

export const getSongById = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.query;
    const song = await Song.findOne({ where: { id, status } });
    song ? res.success(song) : res.success({});
  } catch (error) {
    res.fail(error);
  }
};

export const deleteSongById = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await Song.update({ status: 'inactive' }, { where: { id, status: 'active' } });
    result === 0 ? res.fail('Id is not found.') : res.success('Successfully deleted.');
  } catch (error) {
    res.fail(error);
  }
};

//create with album , category and artist
export const createSong = async (req, res) => {
  try {
    const { albumId, categoryId, artistIds, name, duration, size, createdBy, updatedBy } = req.body;
    const { status } = req.query;
    const fliterArtist = { id: { [Op.in]: artistIds }, status };
    //check all these folks that are existing or not ...
    const [hasAlbum, hasCategory, hasArtist] = await Promise.all([
      Album.findOne({ attributes: ['id'], where: { id: albumId, status } }),
      Category.findOne({ attributes: ['id'], where: { id: categoryId, status } }),
      Artist.findAll({ attributes: ['id'], where: fliterArtist })
    ]);
    //response what wrong with these
    hasAlbum
      ? hasCategory
        ? hasArtist.length == artistIds.length
          ? {}
          : res.fail('Artist Id is not found.')
        : res.fail('Category Id is not found.')
      : res.fail('Album Id is not found.');
    //otherwise => insert part
    const song = await insertSong({ albumId, categoryId, artistIds, name, duration, size, createdBy, updatedBy });
    res.success(song);
  } catch (error) {
    res.fail(error.name);
  }
};

export const updateSongById = async (req, res) => {
  try {
    const { id } = req.params;
    const { albumId, categoryId, artistIds, name, duration, size, updatedBy } = req.body;
    //const { status } = req.query;
    //check if song Id is exist or not because I dont want to query sth before check it
    const result = await Song.findOne({ where: { id, status: 'active' } });
    if (!result) res.fail('Song Id is invalid.');
    //if exist => query for update
    const fliterAlbum = albumId ? Album.findOne({ where: { id: albumId, status: 'active' } }) : {};
    const fliterCategory = categoryId ? Category.findOne({ where: { id: categoryId, status: 'active' } }) : {};
    const fliterArtist = artistIds ? Artist.findAll({ where: { id: { [Op.in]: artistIds }, status: 'active' } }) : {};
    //if include album , ... => process to check
    const [hasAlbum = 0, hasCategory = 0, hasArtist = 0] = await Promise.all([
      fliterAlbum,
      fliterCategory,
      fliterArtist
    ]);
    //response what wrong with these
    hasAlbum
      ? hasCategory
        ? Array.isArray(hasArtist)
          ? hasArtist.length === artistIds.length
            ? {} //isArray but donot found some artist id
            : res.fail('Some artist Id is invalid.')
          : {} // if no process of that query
        : res.fail('Category Id is not found.')
      : res.fail('Album Id is not found.');

    const fliterName = name ? { name: name } : {};
    const fliterDuration = duration ? { duration: duration } : {};
    const fliterSize = size ? { size: size } : {};
    //for table song need to update
    const data = { ...fliterName, ...fliterSize, ...fliterDuration, ...fliterAlbum, ...fliterCategory, updatedBy };
    await updateSong({ data, id, artistIds });
    res.success('Successfully updated.');
  } catch (error) {
    res.fail(error.message);
  }
};
