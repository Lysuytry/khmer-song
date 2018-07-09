import User from '../../models/user';
import bcrypt from 'bcrypt';

const {SALT} = process.env;

export const registerAuth = async (req, res) => {
  try{
    const {username, password} = req.body;
    //encrypt and save
    const hash = bcrypt.hashSync(password, +SALT);
    req.body.password = hash;
    //
    const [user] = await User.findOrCreate({where: {username}, defaults: req.body});
    //decrypt and return
    user.password = password;
    //will include token
    res.success(user);
  } catch(error){
    res.fail(error);
  }
};

export const loginAuth = async (req, res) => {
  try{
    const {username, password} = req.body;
    //find by name
    const user = await User.findOne({where: {username}});
    //if have => check password
    user ? !bcrypt.compareSync(password, user.password) ? res.fail('Wrong Password', 400) : {} : res.fail('Username is not found.', 400);
    user.password = password;
    res.success(user);
  } catch(error){
    res.fail(error);
  }
};
