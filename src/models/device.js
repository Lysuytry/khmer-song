import { Sequelize, sequelize, Op } from '../common/sequelize-connection';

const Device = sequelize.define(
  'devices',
  {
    id: { type: Sequelize.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
    userId: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false },
    name: { type: Sequelize.STRING(100), allowNull: false },
    registrationToken: { type: Sequelize.STRING(250), allowNull: false },
    type: { type: Sequelize.ENUM('android', 'ios', 'web', 'admin', 'window'), allowNull: false },
    subscribed: { type: Sequelize.ENUM('subscribed', 'unsubscribed'), defaultValue: 'unsubscribed' },
    tags: { type: Sequelize.TEXT, allowNull: true }
  },
  { timestamps: true }
);

export const getAllDevices = async data => {
  try {
    const { userId, type, tags, subscribed, attribute, limit, offset } = data;

    const filterUserId = userId ? { userId } : {};
    const filterType = type ? { type } : {};
    const filterSubscribe = subscribed ? { subscribed } : {};
    const filterTags = tags ? { tags: { [Op.in]: tags } } : {};
    const filterAttributes = attribute ? { attributes: attribute } : {};
    const filterWhere = { ...filterUserId, ...filterSubscribe, ...filterTags, ...filterType };

    const devices = await Device.findAll({ raw: true, ...filterAttributes, where: filterWhere, limit, offset });

    return devices;
  } catch (error) {
    return error;
  }
};

export const getRegistrationTokenByUserId = async (userIds, subscribed) => {
  try {
    const devices = await Device.findAll({
      raw: true,
      attributes: ['registrationToken'],
      where: { userId: { [Op.in]: userIds }, subscribed }
    });
    return devices;
  } catch (error) {
    return error;
  }
};

export default Device;
