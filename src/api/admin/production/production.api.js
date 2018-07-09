import Production from '../../../models/production';
import {Op} from '../../../common/sequelize-connection';

export const getProductionList = async (req, res) => {
  try{
    const {limit, offset, status, name} = req.query;
    const fliterName = name ? {name: { [Op.like]: `%${name}%`}} : {};
    const conditions = {...fliterName, status};
    const {rows, count} = await Production.findAndCountAll({where: conditions, limit, offset});
    res.success(rows, {limit, offset, count});
  } catch(error){
    res.fail(error.message);
  }
};

export const createProduction = async (req, res) => {
  try{
    const {name} = req.body;
    const [production] = await Production.findOrCreate({where: {name}, defaults: req.body});
    res.success(production);
  } catch(error){
    res.fail(error);
  }
};

export const updateProductionById = async (req, res) => {
  try{
    const {id} = req.params;
    const statusQuery = req.query.status;
    let {name, logo, status, createdBy, updatedBy} = req.body;
    name = name ? {name} : {};
    logo = logo ? {logo} : {};
    createdBy = createdBy ? {createdBy} : {};
    updatedBy = updatedBy ? {updatedBy} : {};
    status = status ? {status} : {};
    const data = {...name, ...logo, ...status, ...createdBy, ...updatedBy};
    await Production.update(data, {where: {id, 'status': statusQuery}});
    res.success('Successfully updated.');
  } catch(error){
    res.fail(error);
  }
};

export const deleteProductionById = async (req, res) => {
  try{
    const {id} = req.params;
    const [result] = await Production.update({status: 'inactive'}, {where: {id, status: 'active'}});
    result === 0 ? res.success('Id is not found.') : res.success('Successfully deleted.');
  } catch(error){
    res.fail(error);
  }
};

export const getProductionById = async (req, res) => {
  try{
    const {id} = req.params;
    const {status} = req.query;
    const production = await Production.findOne({where: {id, status}});
    res.success(production);
  } catch(error){
    res.fail(error);
  }
};
