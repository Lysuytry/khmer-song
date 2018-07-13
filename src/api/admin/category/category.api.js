import Category from '../../../models/category';
import { Op } from '../../../common/sequelize-connection';

export const getCategoryList = async (req, res) => {
  try {
    const { limit, offset, status, name } = req.query;
    const filterName = name ? { name: { [Op.like]: `%${name}%` } } : {};
    const conditions = { ...filterName, status };
    const { rows, count } = await Category.findAndCountAll({ where: conditions, limit, offset });
    res.success(rows, { limit, offset, count });
  } catch (error) {
    res.fail(error.message);
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const { updatedBy, createdBy } = req.authUser;
    const [category] = await Category.findOrCreate({
      where: { name },
      defaults: { ...req.body, createdBy, updatedBy }
    });
    res.success(category);
  } catch (error) {
    res.fail(error.message);
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.query;
    const category = await Category.findOne({ where: { id, status } });
    res.success(category);
  } catch (error) {
    res.fail(error.message);
  }
};

export const updateCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const statusQuery = req.query.status;
    const { updatedBy } = req.authUser;
    let { name, status } = req.body;
    name ? { name } : {};
    updatedBy ? { updatedBy } : {};
    status ? { status } : {};
    const data = { ...name, ...status, updatedBy };
    await Category.update(data, { where: { id, status: statusQuery } });
    res.success('Successfully updated.');
  } catch (error) {
    res.fail(error.message);
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { updatedBy } = req.authUser;
    const [result] = await Category.update({ status: 'inactive', updatedBy }, { where: { id, status: 'active' } });
    result === 0 ? res.success('Id is not found.') : res.success('Successfully deleted');
  } catch (error) {
    res.fail(error.message);
  }
};
