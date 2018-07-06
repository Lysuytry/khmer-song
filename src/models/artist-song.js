import {Sequelize, sequelize} from '../common/sequelize-connection';
import Artist from './artist';
import Song from './song';

const ArtistSong = sequelize.define('Artists-Songs', {
  id: {type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true},
  artistId: {type: Sequelize.INTEGER, references: {
    model: Artist,
    key: 'id'
  }},
  songId: {type: Sequelize.INTEGER, references: {
    model: Song,
    key: 'id'
  }}
}, {timestamps: false});

export default ArtistSong;
