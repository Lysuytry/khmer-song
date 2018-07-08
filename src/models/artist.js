import {Sequelize, sequelize} from '../common/sequelize-connection';
//import Song from './song';

const Artist = sequelize.define('artists', {
  id: {type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true},
  name: {type: Sequelize.STRING(100), allowNull: false},
  type: {type: Sequelize.ENUM('new','old'), defaultValue: 'new', validate: {isLowercase: true}},
  image: {type: Sequelize.TEXT, allowNull: true},
  status: {type: Sequelize.ENUM('active', 'inactive', 'deleted'), defaultValue: 'active'},
  createdBy: {type: Sequelize.STRING(50), defaultValue: 'admin'},
  updatedBy: {type: Sequelize.STRING(50), defaultValue: 'admin'}
}, {timestamps: true});

//Artist.belongsToMany(Song);

export default Artist;
