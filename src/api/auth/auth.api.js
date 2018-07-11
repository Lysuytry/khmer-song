import User from '../../models/user';
import bcrypt from 'bcrypt';
import {getToken} from '../../common/jwt';

const {SALT} = process.env;

export const registerAuth = async (req, res) => {
  try{
    const {username, password} = req.body;
    //encrypt and save
    const hash = bcrypt.hashSync(password, +SALT);
    req.body.password = hash;
    //
    const [user] = await User.findOrCreate({raw: true, where: {username}, defaults: req.body});
    user.password = undefined;
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
    const user = await User.findOne({raw: true, where: {username}});
    //if have => check password
    user ? !bcrypt.compareSync(password, user.password) ? res.fail('Wrong Password', 400) : {} : res.fail('Username is not found.', 400);
    //if authenticate true
    const payload = {id: user.id, role: user.role, username};

    return user.role === 'admin' ? res.success({...user, password: undefined, token: getToken(payload)}) : res.success({...user, password: undefined});

  } catch(error){
    res.fail(error);
  }
};

//external function used for verify if user passed the jwt first step before push to access token
export const verifyUser = async (data, res) => {
  try{
    const user = await User.findOne({where: {...data}});
    return user ? user : res.fail('Not user');
  } catch(error){
    res.fail(error);
  }
};
