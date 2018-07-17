import {verifyToken} from '../../common/jwt';
import {verifyUser} from '../auth/auth.api';
//verifyUser is a function used for verify user

export const checkToken = async (req, res, next) => {
  try{
    //send from everywhere
    const token = req.body.token || req.query.token || req.headers['authorization'];
    const {status} = req.query;
    const {id, role, username} = verifyToken(token);
    //verify user role username and status = active
    if(role === 'guest') return res.fail('Only admin could be access', 403);
    const user = await verifyUser({id, status, username}, res);
    //passed verify => next before do that must be assign who will authorize
    req.authUser = user;
    req.authUser.updatedBy = user.id;
    req.authUser.createdBy = user.id;
    //passed to next()
    next();
  } catch(error){
    res.fail('Token is invalid');
  }
};

export const checkTokenForGuest = async (req, res, next) => {
  try{
    //send from everywhere
    const token = req.body.token || req.query.token || req.headers['authorization'];
    const {status} = req.query;
    const {id, role, username} = verifyToken(token);
    //verify user role username and status = active
    if(role === 'admin') return res.fail('Unauthorized', 403);
    const user = await verifyUser({id, status, username}, res);
    //passed verify => next before do that must be assign who will authorize
    req.authUser = user;
    req.authUser.updatedBy = user.id;
    req.authUser.createdBy = user.id;
    //passed to next()
    next();
  } catch(error){
    res.fail('Token is invalid.');
  }
};
