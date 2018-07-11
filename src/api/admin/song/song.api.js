import Song, {insertSong} from '../../../models/song';
import Artist from '../../../models/artist';
//import ArtistSong from '../../../models/artist-song';
import Album from '../../../models/album';
import Category from '../../../models/category';
import {Op} from '../../../common/sequelize-connection';

export const getSongList = async (req, res) => {
  try{
    const {limit, offset, status, name} = req.query;
    const fliterName = name ? {name: {[Op.like]: `%${name}%`}} : {};
    const conditions = {...fliterName, status};
    const {rows, count} = await Song.findAndCount({where: conditions, offset, limit});
    res.success(rows, {limit, offset, count});
  } catch(error){
    res.fail(error);
  }
};

export const getSongById = async (req, res) => {
  try{
    const {id} = req.params;
    const {status} = req.query;
    const song = await Song.findOne({where: {id, status}});
    song ? res.success(song) : res.success({});
  } catch(error){
    res.fail(error);
  }
};

export const deleteSongById = async (req, res) => {
  try{
    const {id} = req.params;
    const [result] = await Song.update({status: 'inactive'}, {where: {id, status : 'active'}});
    result === 0 ? res.fail('Id is not found.') : res.success('Successfully deleted.');
  } catch(error){
    res.fail(error);
  }
};

//create with album , category and artist
export const createSong = async (req, res) => {
  try{
    const {albumId, categoryId, artistIds, name, duration, size, createdBy, updatedBy} = req.body;
    const {status} = req.query;
    const fliterArtist = {id: {[Op.in]: artistIds}, status};
    //check all these folks that are existing or not ...
    const [hasAlbum, hasCategory, hasArtist] = await Promise.all([ Album.count({where: {id: albumId, status}}),
      Category.count({where: {id: categoryId, status}}), Artist.findAll({where: fliterArtist}) ]);
    //response what wrong with these
    hasAlbum ? hasCategory ? hasArtist.length == artistIds.length ? {} : res.fail('Artist Id is not found.') : res.fail('Category Id is not found.') : res.fail('Album Id is not found.');
    //otherwise => insert part
    const song = await insertSong({albumId, categoryId, artistIds, name, duration, size, createdBy, updatedBy});
    res.success(song);
  } catch(error){
    res.fail(error.name);
  }
};

export const updateSongById = async (req, res) => {
  try{
    res.success('Successfully updated.');
  } catch(error){
    res.fail(error);
  }
};
