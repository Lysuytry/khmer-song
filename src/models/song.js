import {sequelize, Sequelize} from '../common/sequelize-connection';

const Song = sequelize.define('songs', {
  id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true},
  name: {type: Sequelize.STRING, allowNull: false},
  duration: {type: Sequelize.STRING(10)},
  size: {type: Sequelize.INTEGER(11), defaultValue: 0},
  albumId: {type: Sequelize.INTEGER, references: {
    model: Album,
    key: 'id'
  }},
  categoryId: {type: Sequelize.INTEGER, references: {
    model: Category,
    key: 'id'
  }},
  status: {type: Sequelize.ENUM('active', 'inactive', 'deleted'), defaultValue: 'active'},
  createdBy: {type: Sequelize.STRING(50), defaultValue: 'admin'},
  updatedBy: {type: Sequelize.STRING(50), defaultValue: 'admin'}
}, {timestamps: true});

export default Song;
