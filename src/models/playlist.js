import {Sequelize, sequelize} from '../common/sequelize-connection';
//import User from './user';
//import Song from './song';

const Playlist = sequelize.define('playists', {
  id: {type: Sequelize.CHAR(36), defaultValue: Sequelize.UUIDV4, primaryKey: true},
  name: {type: Sequelize.STRING(70), allowNull: false},
  userId: {type: Sequelize.INTEGER.UNSIGNED, references: {
    model: 'users',
    key: 'id'
  }, onDelete: 'CASCADE', onUpdate: 'CASCADE'}
}, {timestamps: true});

//Playlist.belongsToMany(User);
//Playlist.belongsToMany(Song);

export default Playlist;
