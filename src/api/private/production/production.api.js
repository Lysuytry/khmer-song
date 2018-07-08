import Production from '../../../models/production';

export const getProductionList = async (req, res) => {
  try{
    const {limit, offset, status} = req.query;
    const {rows, count} = await Production.findAndCountAll({where: {status}, limit, offset});
    res.success(rows, {limit, offset, count});
  } catch(error){
    res.fail(error.message);
  }
};

export const createProduction = async (req, res) => {
  try{
    const production = await Production.findOrCreate({where: {name}, defaults: req.body});
    res.success(production);
  } catch(error){
    res.fail(error);
  }
}

export const updateProductionById = async (req, res) => {
  try{
    const {id} = req.params;
    const {status} = req.query;
    let {name, logo, createdBy, updatedBy} = req.body;
    name ? {name} : {};
    logo ? {logo} : {};
    createdBy ? {createdBy} : {};
    updatedBy ? {updatedBy} : {};
    const data = {...name, ...log, ...createdBy, ...updatedBy};
    await Production.update(data, {where: {id, status}});
    res.success('Successfully updated.');
  } catch(error){
    res.fail(error);
  }
};

export const deleteProductionById = async (req, res) => {
  try{
    const {id} = req.params;
    const {status} = req.query;
    const result = await Production.update({status: 'inactive'}, {where: {id, status: 'active'}});
    result === 1 ? res.success('Successfully deleted.') : res.success('Id is not found.');
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
