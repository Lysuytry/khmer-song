import { Sequelize, sequelize } from '../common/sequelize-connection';
import Path from 'path';
import { readFile } from '../common/syncFile';
//import User from './user';
//import Song from './song';

const Playlist = sequelize.define(
  'playists',
  {
    id: { type: Sequelize.CHAR(36), defaultValue: Sequelize.UUIDV4, primaryKey: true },
    name: { type: Sequelize.STRING(70), allowNull: false },
    userId: {
      type: Sequelize.INTEGER.UNSIGNED,
      references: {
        model: 'users',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  },
  { timestamps: true }
);

export const getSongByPlaylistId = async data => {
  try {
    const { id, limit, offset } = data;
    const pathQuery = Path.join(__dirname, '../../src/query/playlist/getAllSongInPlaylist.sql');
    const pathCount = Path.join(__dirname, '../../src/query/playlist/countAllSongInPlaylist.sql');
    const querySong = readFile(pathQuery);
    const countSong = readFile(pathCount);
    const replacementsQuery = {
      replacements: { id: id, limitValue: limit, offsetValue: offset },
      type: sequelize.QueryTypes.SELECT
    };
    const replacementsCount = {replacements: {id: id}, type: sequelize.QueryTypes.SELECT};
    const [songs, [count] ] = await Promise.all([sequelize.query(querySong, replacementsQuery), sequelize.query(countSong, replacementsCount)]);
    return {songs, ...count};
  } catch (error) {
    throw new Error(error.message);
  }
};

export default Playlist;
