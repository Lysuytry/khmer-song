import {Router} from 'express';
import {registerAuth, loginAuth} from './auth.api';
import {validateAuthRegister, validateAuthLogin} from './auth.middleware';

const routeAuth = Router();

routeAuth.post('/login', validateAuthLogin, loginAuth);
routeAuth.post('/register', validateAuthRegister, registerAuth);

export default routeAuth;
