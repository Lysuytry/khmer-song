import {Sequelize, sequelize} from '../common/sequelize-connection';
import Production from './production'

const Album = sequelize.define('albums', {
  id: {type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey},
  name: {type: Sequelize.STRING, allowNull: false},
  image: {type: Sequelize.TEXT, allowNull: true, validate: {isAlphanumeric}},
  status: {type: Sequelize.ENUM('active', 'inactive', 'deleted'), defaultValue: 'active'},
  productId: {type: Sequelize.INTEGER, references: {
    model: Production,
    key: 'id'
  }},
  createdBy: {type: Sequelize.STRING(50), defaultValue: 'admin'},
  updatedBy: {type: Sequelize.STRING(50), defaultValue: 'admin'}
}, {timestamps: true});

export default Album;
