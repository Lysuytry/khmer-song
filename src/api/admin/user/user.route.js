import {Router} from 'express';
import {getUserList} from './user.api';

const routeUser = Router();

routeUser.get('/', getUserList);

export default routeUser;
