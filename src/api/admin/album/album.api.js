import Album from '../../../models/album';
import {Op} from '../../../common/sequelize-connection';

export const getAlbumList = async (req, res) => {
  try{
    const {limit, offset, status, name, type} = req.query;
    const fliterName = name ? {name: { [Op.like]: `%${name}%` }} : {};
    const fliterType = type ? {type} : {};
    const conditions = {...fliterName, status, ...fliterType};
    const {rows, count} = await Album.findAndCountAll({where: conditions, offset, limit});
    res.success(rows, {limit, offset, count});
  } catch(error){
    res.fail(error);
  }
};

export const createAlbum = async (req, res) => {
  try{
    const {name} = req.body;
    const [album] = await Album.findOrCreate({where: {name}, defaults: req.body});
    res.success(album);
  } catch(error){
    res.fail(error);
  }
};

export const getAlbumById = async (req, res) => {
  try{
    const {id} = req.params;
    const {status} = req.query;
    const album = await Album.findOne({where: {id, status} });
    res.success(album);
  } catch(error){
    res.fail(error);
  }
};

export const updateAlbumById = async (req, res) => {
  try{
    const {id} = req.params;
    const statusQuery = req.query.status;
    let {name, image, status, productionId, createdBy, updatedBy, type} = req.body;
    name = name ? {name} : {};
    image = image ? {image} : {};
    status = status ? {status} : {};
    productionId = productionId ? {productionId} : {};
    createdBy = createdBy ? {createdBy} : {};
    updatedBy = updatedBy ? {updatedBy} : {};
    type = type ? {type} : {};
    const data = {...name, ...image, ...status, ...productionId, ...createdBy, ...updatedBy, ...type};
    await Album.update(data, {where: {id, 'status': statusQuery}});
    res.success('Successfully updated.');
  } catch(error){
    res.fail(error);
  }
};

export const deletedAlbumById = async (req, res) => {
  try{
    const {id} = req.params;
    const [result] =  await Album.update({status: 'inactive'}, {where: {id, status: 'active'}});
    result === 0 ? res.fail('If is not found') : res.success('Successfully deleted.');
  } catch(error){
    res.fail(error);
  }
};
