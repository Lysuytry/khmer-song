'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Op = exports.sequelize = exports.Sequelize = undefined;

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { DBNAME, DBUSER, DBPASS, DBTYPE } = process.env;

const sequelize = new _sequelize2.default(DBNAME, DBUSER, DBPASS, {
  dialect: DBTYPE
});

//const transaction = sequelize.transaction();

const Op = _sequelize2.default.Op;

//sequelize.sync();

exports.Sequelize = _sequelize2.default;
exports.sequelize = sequelize;
exports.Op = Op;
//# sourceMappingURL=sequelize-connection.js.map