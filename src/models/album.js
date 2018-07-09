import {Sequelize, sequelize} from '../common/sequelize-connection';
//import Production from './production'

const Album = sequelize.define('albums', {
  id: {type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true},
  name: {type: Sequelize.STRING, allowNull: false},
  image: {type: Sequelize.TEXT, allowNull: true},
  status: {type: Sequelize.ENUM('active', 'inactive', 'deleted'), defaultValue: 'active'},
  productionId: {type: Sequelize.INTEGER.UNSIGNED, references: {
    model: 'productions',
    key: 'id',
  }, onDelete: 'SET NULL', onUpdate: 'CASCADE'},
  createdBy: {type: Sequelize.STRING(50), defaultValue: 'admin'},
  updatedBy: {type: Sequelize.STRING(50), defaultValue: 'admin'}
}, {timestamps: true});

export default Album;
