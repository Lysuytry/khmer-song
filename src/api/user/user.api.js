import User from '../../models/user';
import { Op } from '../../common/sequelize-connection';

export const getListUser = async (req, res) => {
  try{
    //const {id} = req.authUser;
    const {limit, offset, status, name, type} = req.query;
    const filterName = name ? {name: { [Op.like]: `%${name}%` }} : {};
    const filterType = type ? {type} : {};
    const conditions = {...filterName, status, ...filterType, role: 'guest'};
    const {rows, count} = User.findAndCountAll(conditions);
    res.success(rows, {total: count, limit, offset});
  } catch(error){
    res.fail(error);
  }
};
