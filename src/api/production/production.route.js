import {Router} from 'express';
import {getProductionList} from './production.api';

const routeProduction = Router();

routeProduction.get('/', getProductionList);

export default routeProduction;
