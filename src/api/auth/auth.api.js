import User from '../../models/user';
import bcrypt from 'bcrypt';
import {getToken} from '../../common/jwt';
import stringify from 'json-stringify-safe';

const {SALT} = process.env;

export const registerAuth = async (req, res) => {
  try{
    const {username, password} = req.body;
    //encrypt and save
    const hash = bcrypt.hashSync(password, +SALT);
    req.body.password = hash;
    //
    const [user1] = await User.findOrCreate({where: {username}, defaults: req.body});
    const payload = {id: user1.id, role: user1.role, username};
    const user = JSON.parse(stringify(user1));
    const data = {...user , password: undefined, token: getToken(payload)};
    res.success(data);
  } catch(error){
    res.fail(error.message);
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
    res.success({...user, password: undefined, token: getToken(payload)});
  } catch(error){
    res.fail(error.message);
  }
};

//external function used for verify if user passed the jwt first step before push to access token
export const verifyUser = async (data, res) => {
  try{
    const user = await User.findOne({where: {...data}});
    return user ? user : res.fail('Not user');
  } catch(error){
    res.fail(error.message);
  }
};
