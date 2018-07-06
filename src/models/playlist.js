import {Sequelize, sequelize} from '../common/sequelize-connection';
import User from './user';

const Playlist = sequelize.define('Playists', {
  id: {type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true},
  name: {type: Sequelize.STRING(70), allowNull: false},
  userId: {type: Sequelize.INTEGER, references: {
    model: User,
    key: 'id'
  }},
  createdBy: {type: Sequelize.STRING(50), defaultValue: 'admin'},
  updatedBy: {type: Sequelize.STRING(50), defaultValue: 'admin'}
}, {timestamps: true});

export default Playlist;
