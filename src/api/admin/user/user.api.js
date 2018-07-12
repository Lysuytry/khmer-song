import User from '../../../models/user';

export const getUserList = async (req, res) => {
  try{
    const {limit, offset, status, role = 'guest'} = req.query;
    const conditions = {role, status};
    const {rows, count} = await User.findAndCountAll({where: conditions, offset, limit });
    res.success(rows, {limit, offset, count});
  } catch(error){
    res.fail(error.message);
  }
};
