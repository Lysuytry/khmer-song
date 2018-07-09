import { Sequelize, sequelize} from '../common/sequelize-connection';
//import Playlist from './playlist';

const User = sequelize.define('users', {
  id: {type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true},
  username: {type: Sequelize.STRING(100), allowNull: false, validate: {isAlphanumeric: true}},
  password: {type: Sequelize.STRING(100), allowNull: false},
  role: {type: Sequelize.ENUM('guest', 'admin'), defaultValue: 'guest'},
  status: {type: Sequelize.ENUM('active', 'inactive', 'deleted'), defaultValue: 'active'}
}, {timestamps: true});

//User.hasMany(Playlist);

export default User;
