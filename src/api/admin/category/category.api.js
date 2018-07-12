import Category from '../../../models/category';
import {Op} from '../../../common/sequelize-connection';

export const getCategoryList = async (req, res) => {
  try{
    const {limit, offset, status, name} = req.query;
    const fliterName = name ? {name: { [Op.like]: `%${name}%` } } : {};
    const conditions = {...fliterName, status};
    const {rows, count} = await Category.findAndCountAll({where: conditions, limit, offset});
    res.success(rows, {limit, offset, count});
  } catch(error){
    res.fail(error.message);
  }
};

export const createCategory = async (req, res) => {
  try{
    const {name} = req.body;
    const [category] = await Category.findOrCreate({where: {name}, defaults: req.body});
    res.success(category);
  } catch(error){
    res.fail(error.message);
  }
};

export const getCategoryById = async (req, res) => {
  try{
    const {id} = req.params;
    const {status} = req.query;
    const category = await Category.findOne({where: {id, status}});
    res.success(category);
  } catch(error){
    res.fail(error.message);
  }
};

export const updateCategoryById = async (req, res) => {
  try{
    const {id} = req.params;
    const statusQuery = req.query.status;
    let {name, status, createdBy, updatedBy} = req.body;
    name ? {name} : {};
    createdBy ? {createdBy} : {};
    updatedBy ? {updatedBy} : {};
    status ? {status} : {};
    const data = {...name, ...status, ...createdBy, ...updatedBy};
    await Category.update(data,{where: {id, status: statusQuery}});
    res.success('Successfully updated.');
  } catch(error){
    res.fail(error.message);
  }
};

export const deleteCategory = async (req, res) => {
  try{
    const {id} = req.params;
    const [result] = await Category.update({status: 'inactive'}, {where: {id, status: 'active'}});
    result === 0 ? res.success('Id is not found.') : res.success('Successfully deleted');
  } catch(error){
    res.fail(error.message);
  }
};
