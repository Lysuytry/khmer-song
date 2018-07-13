'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkTokenForGuest = exports.checkToken = undefined;

var _jwt = require('../../common/jwt');

var _auth = require('../auth/auth.api');

//verifyUser is a function used for verify user

const checkToken = exports.checkToken = async (req, res, next) => {
  try {
    //send from everywhere
    const token = req.body.token || req.query.token || req.headers['authorization'];
    const { status } = req.query;
    const { id, role, username } = (0, _jwt.verifyToken)(token);
    //verify user role username and status = active
    if (role === 'guest') return res.fail('Only admin could be access', 403);
    const user = await (0, _auth.verifyUser)({ id, status, username }, res);
    //passed verify => next before do that must be assign who will authorize
    req.authUser = user;
    req.authUser.updatedBy = user.id;
    req.authUser.createdBy = user.id;
    //passed to next()
    next();
  } catch (error) {
    res.fail('Token is invalid');
  }
};

const checkTokenForGuest = exports.checkTokenForGuest = async (req, res, next) => {
  try {
    //send from everywhere
    const token = req.body.token || req.query.token || req.headers['authorization'];
    const { status } = req.query;
    const { id, role, username } = (0, _jwt.verifyToken)(token);
    //verify user role username and status = active
    if (role === 'admin') return res.fail('Unauthorized', 403);
    const user = (0, _auth.verifyUser)({ id, status, username }, res);
    //passed verify => next before do that must be assign who will authorize
    req.authUser = user;
    req.authUser.updatedBy = user.id;
    req.authUser.createdBy = user.id;
    //passed to next()
    next();
  } catch (error) {
    res.fail('Token is invalid.');
  }
};
//# sourceMappingURL=admin.middleware.js.map