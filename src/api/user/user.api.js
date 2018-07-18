import User from '../../models/user';
import { Op } from '../../common/sequelize-connection';

export const getListUser = async (req, res) => {
  try {
    //const {id} = req.authUser;
    const { limit, offset, status, name, type, att } = req.query;
    const filterName = name ? { name: { [Op.like]: `%${name}%` } } : {};
    const filterType = type ? { type } : {};
    const filterAtt = att ? { attributes: [att] } : {};
    const role = 'guest';
    const conditions = { ...filterName, role, status, ...filterType };
    const { rows, count } = await User.findAndCountAll({raw: true, ...filterAtt, where: conditions, limit, offset });
    res.success(rows, { total: count, limit, offset });
  } catch (error) {
    res.fail(error);
  }
};

export const getListUserId = async (req, res) => {
  try {
    //const {id} = req.authUser;
    const { limit, offset, status, name, type } = req.query;
    const filterName = name ? { name: { [Op.like]: `%${name}%` } } : {};
    const filterType = type ? { type } : {};
    const role = 'guest';
    const conditions = { ...filterName, role, status, ...filterType };
    const { rows, count } = await User.findAndCountAll({
      raw: true,
      attributes: ['id'],
      where: conditions,
      limit,
      offset
    });
    res.success(rows, { total: count, limit, offset });
  } catch (error) {
    res.fail(error);
  }
};

export const getMySelf = async (req, res) => {
  try {
    //const {id} = req.authUser;
    res.success(req.authUser);
  } catch (error) {
    res.fail(error);
  }
};
