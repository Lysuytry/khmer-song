import Album from '../../../models/album';
import {Op} from '../../../common/sequelize-connection';
import Production from '../../../models/production';

export const getAlbumList = async (req, res) => {
  try{
    const {limit, offset, status, name, type} = req.query;
    const filterName = name ? {name: { [Op.like]: `%${name}%` }} : {};
    const filterType = type ? {type} : {};
    const conditions = {...filterName, status, ...filterType};
    const {rows, count} = await Album.findAndCountAll({where: conditions, offset, limit});
    res.success(rows, {limit, offset, count});
  } catch(error){
    res.fail(error.message);
  }
};

export const createAlbum = async (req, res) => {
  try{
    const {name} = req.body;
    const {createdBy, updatedBy} = req.authUser;
    const [album] = await Album.findOrCreate({where: {name}, defaults: {...req.body, createdBy, updatedBy}});
    res.success(album);
  } catch(error){
    res.fail(error.message);
  }
};

export const getAlbumById = async (req, res) => {
  try{
    const {id} = req.params;
    const {status} = req.query;
    const album = await Album.findOne({where: {id, status} });
    res.success(album);
  } catch(error){
    res.fail(error.message);
  }
};

export const updateAlbumById = async (req, res) => {
  try{
    const {id} = req.params;
    const statusQuery = req.query.status;
    const { updatedBy } = req.authUser;
    let {name, image, status, productionId, type} = req.body;
    name = name ? {name} : {};
    image = image ? {image} : {};
    status = status ? {status} : {};

    const result = productionId ? await Production.findOne({attributes: ['id'], where: {id: productionId}}) : true;
    if(!result) return res.fail('Production Id is invalid.');

    productionId = productionId ? {productionId} : {};
    type = type ? {type} : {};
    const data = {...name, ...image, ...status, ...productionId, updatedBy, ...type};
    await Album.update(data, {where: {id, 'status': statusQuery}});
    res.success('Successfully updated.');
  } catch(error){
    res.fail(error.message);
  }
};

export const deletedAlbumById = async (req, res) => {
  try{
    const {id} = req.params;
    const { updatedBy } = req.authUser;
    const [result] =  await Album.update({status: 'inactive', updatedBy}, {where: {id, status: 'active'}});
    result === 0 ? res.fail('If is not found') : res.success('Successfully deleted.');
  } catch(error){
    res.fail(error.message);
  }
};
