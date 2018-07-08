import {Router} from 'express';

const routeAuth = Router();

routeAuth.get('/');
routeAuth.post('/login');
routeAuth.post('/register');

export default routeAuth;
