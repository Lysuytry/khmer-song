import {sequelize, Sequelize} from '../common/sequelize-connection';
// import Album from './album';
// import Category from './category';
//import Artist from './artist';
//import Playlist from './playlist';

const Song = sequelize.define('songs', {
  id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true},
  name: {type: Sequelize.STRING, allowNull: false},
  duration: {type: Sequelize.STRING(10)},
  size: {type: Sequelize.INTEGER(11), defaultValue: 0},
  albumId: {type: Sequelize.INTEGER.UNSIGNED, references: {
    model: 'albums',
    key: 'id'
  }, onDelete: 'SET NULL', onUpdate: 'CASCADE'},
  categoryId: {type: Sequelize.INTEGER.UNSIGNED, references: {
    model: 'categories',
    key: 'id'
  }, onDelete: 'SET NULL', onUpdate: 'CASCADE'},
  status: {type: Sequelize.ENUM('active', 'inactive', 'deleted'), defaultValue: 'active'},
  createdBy: {type: Sequelize.STRING(50), defaultValue: 'admin'},
  updatedBy: {type: Sequelize.STRING(50), defaultValue: 'admin'}
}, {timestamps: true});

//Song.belongsTo(Album);
//Song.belongsTo(Category);
//Song.belongsToMany(Artist);
//Song.belongsToMany(Playlist);

export default Song;
