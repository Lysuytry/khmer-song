import {Sequelize, sequelize} from '../common/sequelize-connection';
//import Album from './album';

const Production = sequelize.define('productions', {
  id: {type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true},
  name: {type: Sequelize.STRING, allowNull: false},
  logo: {type: Sequelize.TEXT, allowNull: true},
  status: {type: Sequelize.ENUM('active', 'inactive', 'deleted'), defaultValue: 'active'},
  createdBy: {type: Sequelize.INTEGER.UNSIGNED, allowNull: false},
  updatedBy: {type: Sequelize.INTEGER.UNSIGNED, allowNull: false}
}, {timestamps: true});

//Production.hasMany(Album);

export default Production;
