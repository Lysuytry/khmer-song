import { Sequelize, sequelize} from '../common/sequelize-connection';
//import Playlist from './playlist';

const User = sequelize.define('users', {
  id: {type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true},
  username: {type: Sequelize.STRING(100), allowNull: false, validate: {isAlpha: true}},
  password: {type: Sequelize.STRING(30), allowNull: false, validate: {isAlphanumeric: true} },
  role: {type: Sequelize.STRING(20), defaultValue: 'guest'},
  status: {type: Sequelize.ENUM('active', 'inactive', 'deleted'), defaultValue: 'active'}
}, {timestamps: true});

//User.hasMany(Playlist);

export default User;
