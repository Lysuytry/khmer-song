import {Router} from 'express';
import {getListUser} from './user.api';

const routeUser = Router();

routeUser.get('/', getListUser);

export default routeUser;
