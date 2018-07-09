import User from '../../models/user';
import {Op} from '../../common/sequelize-connection';

export const registerAuth = async (req, res) => {
  try{
    const {username} = req.body;
    const [user] = await User.findOrCreate({where: {username}, defaults: req.body});
    res.success(user);
  } catch(error){
    res.fail(error);
  }
};

export const loginAuth = async (req, res) => {
  try{
    const {username, password} = req.body;
    const user = await User.findOne({where: {username, password}});
    res.success(user);
  } catch(error){
    res.fail(error);
  }
};
