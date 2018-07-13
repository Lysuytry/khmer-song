import Playlist, {getSongByPlaylistId} from '../../models/playlist';
import User from '../../models/user';
import Song from '../../models/song';
import PlaylistSong from '../../models/playlist-song';
import { Op, sequelize } from '../../common/sequelize-connection';

export const getPlaylist = async (req, res) => {
  try {
    const { userId } = req.body;
    const { limit, offset, name } = req.query;
    const fliterName = name ? { name: { [Op.like]: `%${name}%` } } : {};
    const conditions = { userId, ...fliterName };
    const { rows, count } = await Playlist.findAndCountAll({ where: conditions, offset, limit });
    res.success(rows, { count, limit, offset });
  } catch (error) {
    res.fail(error);
  }
};

export const createPlaylist = async (req, res) => {
  try {
    const { name, userId } = req.body;
    //we must know who created it
    const user = await User.findById(userId);
    const [playlist] = !user
      ? res.fail('User Id is not found.')
      : await Playlist.findOrCreate({ where: { name, userId }, defaults: req.body });
    res.success(playlist);
  } catch (error) {
    res.fail(error);
  }
};

export const deletePlaylist = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { id } = req.params;
    const { userId } = req.body;
    await Promise.all([
      Playlist.destroy({ where: { id, userId }, transaction }),
      PlaylistSong.destroy({ where: { playlistId: id }, transaction })
    ]);
    transaction.commit();
    res.success('Successfully deleted.');
  } catch (error) {
    transaction.rollback();
    res.fail(error.message);
  }
};

export const getSongFromPlaylist = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const { limit, offset } = req.query;
    const {songs,count} = await getSongByPlaylistId({id, userId, limit, offset});
    res.success(songs, {count, limit, offset});
  } catch (error) {
    res.fail(error.message);
  }
};

export const removeSongFromPlaylist = async (req, res) => {
  try {
    const { id, songId } = req.params;
    const { userId } = req.body;
    //check playlist Id is existing
    //count >findOne
    const playlist = await Playlist.findOne({ attributes: ['id'], where: { userId, id } });
    //not => invalid playlist
    if (!playlist) res.fail('Playlist Id is not valid.');
    //success => check song id in playlistsong
    const row = await PlaylistSong.destroy({ where: { playlistId: id, songId: songId } });
    //if no check songId again
    if (!row) return res.fail('Song Id is invalid.');
    res.success('Successfully deletd.');
  } catch (error) {
    res.fail(error.message);
  }
};

export const addSongToPlaylist = async (req, res) => {
  try {
    const { status } = req.query;
    const { id, songId } = req.params;
    const { userId } = req.body;
    //check if song if existing
    const [song, playlist] = await Promise.all([
      Song.findOne({ attributes: ['id'], where: { id: songId, status } }),
      Playlist.findOne({ attributes: ['id'], where: { userId, id } })
    ]);
    //if not => return songId is not found
    if (!song) return res.fail('Song is invalid.');
    if (!playlist) return res.fail('Playlist is invalid.');
    //existing => add to table playlistsong
    const [{ isNewRecord }] = await PlaylistSong.findOrCreate({
      raw: true,
      where: { playlistId: id, songId },
      defaults: { playlistId: id, songId }
    });
    //result._options.isNewRecord =
    !isNewRecord
      ? res.success('Song has already added to playlist.')
      : res.success('Successfully added song to playlist.');
  } catch (error) {
    res.fail(error.name);
  }
};
