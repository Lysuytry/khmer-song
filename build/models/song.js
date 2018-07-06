'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelizeConnection = require('../common/sequelize-connection');

var _album = require('./album');

var _album2 = _interopRequireDefault(_album);

var _category = require('./category');

var _category2 = _interopRequireDefault(_category);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Song = _sequelizeConnection.sequelize.define('songs', {
  id: { type: _sequelizeConnection.Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  name: { type: _sequelizeConnection.Sequelize.STRING, allowNull: false },
  duration: { type: _sequelizeConnection.Sequelize.STRING(10) },
  size: { type: _sequelizeConnection.Sequelize.INTEGER(11), defaultValue: 0 },
  albumId: { type: _sequelizeConnection.Sequelize.INTEGER, references: {
      model: _album2.default,
      key: 'id'
    } },
  categoryId: { type: _sequelizeConnection.Sequelize.INTEGER, references: {
      model: _category2.default,
      key: 'id'
    } },
  status: { type: _sequelizeConnection.Sequelize.ENUM('active', 'inactive', 'deleted'), defaultValue: 'active' },
  createdBy: { type: _sequelizeConnection.Sequelize.STRING(50), defaultValue: 'admin' },
  updatedBy: { type: _sequelizeConnection.Sequelize.STRING(50), defaultValue: 'admin' }
}, { timestamps: true });

exports.default = Song;
//# sourceMappingURL=song.js.map