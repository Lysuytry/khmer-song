import { Router } from 'express';
import { getListUser, getMySelf } from './user.api';

const routeUser = Router();

routeUser.get('/', getListUser);
routeUser.get('/myself', getMySelf);

export default routeUser;
