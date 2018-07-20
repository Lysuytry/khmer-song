import { Sequelize, sequelize } from '../common/sequelize-connection';

const Category = sequelize.define(
  'categories',
  {
    id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: Sequelize.STRING(80), allowNull: false },
    status: { type: Sequelize.ENUM('active', 'inactive', 'deleted'), defaultValue: 'active' },
    createdBy: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false },
    updatedBy: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false }
  },
  { timestamps: true }
);

export default Category;
