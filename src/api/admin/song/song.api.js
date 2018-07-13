import Song, { insertSong, updateSong } from '../../../models/song';
import Artist from '../../../models/artist';
//import ArtistSong from '../../../models/artist-song';
import Album from '../../../models/album';
import Category from '../../../models/category';
import { Op } from '../../../common/sequelize-connection';

export const getSongList = async (req, res) => {
  try {
    const { limit, offset, status, name } = req.query;
    const filterName = name ? { name: { [Op.like]: `%${name}%` } } : {};
    const conditions = { ...filterName, status };
    const { rows, count } = await Song.findAndCount({ where: conditions, offset, limit });
    res.success(rows, { limit, offset, count });
  } catch (error) {
    res.fail(error.message);
  }
};

export const getSongById = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.query;
    const song = await Song.findOne({ where: { id, status } });
    song ? res.success(song) : res.success({});
  } catch (error) {
    res.fail(error.message);
  }
};

export const deleteSongById = async (req, res) => {
  try {
    const { id } = req.params;
    const { updatedBy } = req.authUser;
    const [result] = await Song.update({ status: 'inactive', updatedBy }, { where: { id, status: 'active' } });
    result === 0 ? res.fail('Id is not found.') : res.success('Successfully deleted.');
  } catch (error) {
    res.fail(error.message);
  }
};

//create with album , category and artist
export const createSong = async (req, res) => {
  try {
    const { albumId, categoryId, artistIds, name, duration, size } = req.body;
    const { updatedBy, createdBy } = req.authUser;
    const { status } = req.query;
    const filterArtist = { id: { [Op.in]: artistIds }, status };
    //check all these folks that are existing or not ...
    const [album, category, artist] = await Promise.all([
      Album.findOne({ attributes: ['id'], where: { id: albumId, status } }),
      Category.findOne({ attributes: ['id'], where: { id: categoryId, status } }),
      Artist.count({ where: filterArtist })
    ]);

    //response what wrong with these
    if (!album) return res.fail('Album Id is not found.');
    if (!category) return res.fail('Category Id is not found.');
    if (artist != artistIds.length) return res.fail('Artist Id is not found.');

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
    const { updatedBy } = req.authUser;
    const { albumId, categoryId, artistIds, name, duration, size } = req.body;
    //const { status } = req.query;
    //check if song Id is exist or not because I dont want to query sth before check it
    const result = await Song.findOne({ where: { id, status: 'active' } });
    if (!result) res.fail('Song Id is invalid.');
    //if exist => query for update
    const filterAlbum = albumId ? Album.findOne({ where: { id: albumId, status: 'active' } }) : {};
    const filterCategory = categoryId ? Category.findOne({ where: { id: categoryId, status: 'active' } }) : {};
    const filterArtist = artistIds ? Artist.findAll({ where: { id: { [Op.in]: artistIds }, status: 'active' } }) : {};
    //if include album , ... => process to check
    const [album = 0, category = 0, artist = 0] = await Promise.all([filterAlbum, filterCategory, filterArtist]);

    //response what wrong with these
    if (!album) return res.fail('Album Id is not found.');
    if (!category) return res.fail('Category Id is not found.');
    if (Array.isArray(artist)) {
      if (artist.length === artistIds.length) return res.fail('Some artist Id is invalid.');
    }

    const filterName = name ? { name: name } : {};
    const filterDuration = duration ? { duration: duration } : {};
    const filterSize = size ? { size: size } : {};
    //for table song need to update
    const data = { ...filterName, ...filterSize, ...filterDuration, ...filterAlbum, ...filterCategory, updatedBy };
    await updateSong({ data, id, artistIds });
    res.success('Successfully updated.');
  } catch (error) {
    res.fail(error.message);
  }
};
