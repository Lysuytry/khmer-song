import { Sequelize, sequelize} from '../common/sequelize-connection';
import { isString } from 'util';

const User = sequelize.define('users', {
  id: {type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true},
  username: {type: Sequelize.STRING(100), allowNull: false, validate: {isString: true} },
  password: {type: Sequelize.STRING(30), allowNull: false, validate: {isAlphanumeric: true} },
  role: {type: Sequelize.STRING(20), validate: {isString: true}, defaultValue: 'guest'},
  status: {type: Sequelize.ENUM('active', 'inactive', 'deleted'), defaultValue: 'active'}
}, {timestamps: true});

export default User;
