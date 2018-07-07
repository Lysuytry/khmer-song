import {Sequelize, sequelize} from '../common/sequelize-connection';
//import User from './user';
//import Song from './song';

const Playlist = sequelize.define('playists', {
  id: {type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true},
  name: {type: Sequelize.STRING(70), allowNull: false},
  userId: {type: Sequelize.INTEGER.UNSIGNED, references: {
    model: 'users',
    key: 'id'
  }, onDelete: 'SET NULL', onUpdate: 'CASCADE'},
  createdBy: {type: Sequelize.STRING(50), defaultValue: 'admin'},
  updatedBy: {type: Sequelize.STRING(50), defaultValue: 'admin'}
}, {timestamps: true});

//Playlist.belongsToMany(User);
//Playlist.belongsToMany(Song);

export default Playlist;
