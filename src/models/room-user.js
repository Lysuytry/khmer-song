import { Sequelize, sequelize } from '../common/sequelize-connection';

const roomUser = sequelize.define(
  'roomUsers',
  {
    roomId: { type: Sequelize.CHAR(36), primaryKey: true },
    userId: { type: Sequelize.INTEGER.UNSIGNED, primaryKey: true }
  },
  { timestamps: true }
);

export default roomUser;
