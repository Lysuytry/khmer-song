'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelizeConnection = require('../common/sequelize-connection');

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Playlist = _sequelizeConnection.sequelize.define('Playists', {
  id: { type: _sequelizeConnection.Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  name: { type: _sequelizeConnection.Sequelize.STRING(70), allowNull: false },
  userId: { type: _sequelizeConnection.Sequelize.INTEGER, references: {
      model: _user2.default,
      key: 'id'
    } },
  createdBy: { type: _sequelizeConnection.Sequelize.STRING(50), defaultValue: 'admin' },
  updatedBy: { type: _sequelizeConnection.Sequelize.STRING(50), defaultValue: 'admin' }
}, { timestamps: true });

exports.default = Playlist;
//# sourceMappingURL=playlist.js.map