'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllDevices = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _sequelizeConnection = require('../common/sequelize-connection');

const Device = _sequelizeConnection.sequelize.define('devices', {
  id: { type: _sequelizeConnection.Sequelize.INTEGER.UNSIGNED, primaryKey: true },
  userId: { type: _sequelizeConnection.Sequelize.INTEGER.UNSIGNED, allowNull: false },
  name: { type: _sequelizeConnection.Sequelize.STRING(100), allowNull: false },
  registrationToken: { type: _sequelizeConnection.Sequelize.CHAR(36), allowNull: false },
  type: { type: _sequelizeConnection.Sequelize.ENUM('android', 'ios', 'web', 'admin', 'window'), allowNull: false },
  subscribed: { type: _sequelizeConnection.Sequelize.ENUM('subscribed', 'unsubscribed'), defaultValue: 'unsubscribed' },
  tags: { type: _sequelizeConnection.Sequelize.TEXT, allowNull: true }
}, { timestamps: true });

const getAllDevices = exports.getAllDevices = async data => {
  try {
    const { userId, type, tags, subscribed, attribute, limit, offset } = data;

    const filterUserId = userId ? { userId } : {};
    const filterType = type ? { type } : {};
    const filterSubscribe = subscribed ? { subscribed } : {};
    const filterTags = tags ? { tags: { [_sequelizeConnection.Op.in]: tags } } : {};
    const filterAttributes = attribute ? { attributes: attribute } : {};
    const filterWhere = _extends({}, filterUserId, filterSubscribe, filterTags, filterType);

    const devices = await Device.findAll(_extends({ raw: true }, filterAttributes, { where: filterWhere, limit, offset }));

    return devices;
  } catch (error) {
    return error;
  }
};

exports.default = Device;
//# sourceMappingURL=device.js.map