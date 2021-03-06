import Artist from '../../models/artist';
import {Op} from '../../common/sequelize-connection';

export const getArtistList = async (req, res) => {
  try{
    const {limit, offset, status, name} = req.query;
    const filterName = name ? {name: {[Op.like] : `%${name}%`} } : {};
    const conditions = {...filterName, status};
    const {rows, count} = await Artist.findAndCountAll({where: conditions, limit, offset});
    res.success(rows, {limit, offset, count});
  } catch(error){
    res.fail(error.message);
  }
};
