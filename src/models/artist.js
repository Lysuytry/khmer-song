import {Sequelize, sequelize} from '../common/sequelize-connection';

const Artist = sequelize.define('artists', {
  id: {type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true},
  name: {type: Sequelize.STRING(100), allowNull: false},
  type: {type: Sequelize.ENUM('new','old'), allowNull: false, defaultValue: 'new', validate: {isLowercase: true}},
  image: {type: Sequelize.TEXT, allowNull: true, validate: {isAlphanumeric: true}},
  status: {type: Sequelize.ENUM('active', 'inactive', 'deleted'), defaultValue: 'active'},
  createdBy: {type: Sequelize.STRING(50), defaultValue: 'admin'},
  updatedBy: {type: Sequelize.STRING(50), defaultValue: 'admin'}
}, {timestamps: true});

export default Artist;
