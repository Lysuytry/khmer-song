import Album from '../../models/album';
import { Op } from '../../common/sequelize-connection';
import Production from '../../models/production';
//from admin productions

export const getProductionList = async (req, res) => {
  try{
    const {limit, offset, status, name} = req.query;
    const filterName = name ? {name: { [Op.like]: `%${name}%`}} : {};
    const conditions = {...filterName, status};
    const {rows, count} = await Production.findAndCountAll({where: conditions, offset, limit});
    res.success(rows, {limit, offset, count});
  } catch(error){
    res.fail(error.message);
  }
};

export const getAlbumFromProductionById = async (req, res) => {
  try{
    const {id} = req.params;
    const {limit, offset, status, name} = req.query;
    const filterName = name ? {name: { [Op.like]: `%${name}%` }} : {};
    const filterProductionId = {productionId: id};
    const conditions = {...filterProductionId, ...filterName, status};
    const {rows, count} = await Album.findAndCountAll({where: conditions, offset, limit});
    res.success(rows, {limit, offset, count});
  } catch(error){
    res.fail(error.message);
  }
};
