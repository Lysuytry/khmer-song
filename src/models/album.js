import {Sequelize, sequelize} from '../common/sequelize-connection';
//import Production from './production'

const Album = sequelize.define('albums', {
  id: {type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true},
  name: {type: Sequelize.STRING, allowNull: false},
  image: {type: Sequelize.TEXT, allowNull: true},
  type: {type: Sequelize.ENUM('new', 'old'), defaultValue: 'new'},
  status: {type: Sequelize.ENUM('active', 'inactive', 'deleted'), defaultValue: 'active'},
  productionId: {type: Sequelize.INTEGER.UNSIGNED, references: {
    model: 'productions',
    key: 'id',
  }, onDelete: 'SET NULL', onUpdate: 'SET NULL'},
  createdBy: {type: Sequelize.INTEGER.UNSIGNED, allowNull: false},
  updatedBy: {type: Sequelize.INTEGER.UNSIGNED, allowNull: false}
}, {timestamps: true});

export default Album;
