import {verifyToken} from '../../common/jwt';
import {verifyUser} from '../auth/auth.api';
//verifyUser is a function used for verify user

export const checkToken = (req, res, next) => {
  try{
    //send from everywhere
    const token = req.body.token || req.query.token || req.headers['authorization'];
    const {status} = req.query;
    const {id, role, username} = verifyToken(token);
    //verify user role username and status = active
    role === 'guest' ? res.success('Only admin could be access') : verifyUser({id, status, username}, res);
    //passed verify => next before do that must be assign who will authorize
    req.body.updatedBy = id;
    req.body.createdBy = id;
    //passed to next()
    next();
  } catch(error){
    res.fail('Token is invalid');
  }
};
