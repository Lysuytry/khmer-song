import {Router} from 'express';
import {getProductionList, getAlbumFromProductionById} from './production.api';

const routeProduction = Router();

routeProduction.get('/', getProductionList);
routeProduction.get('/:id/albums', getAlbumFromProductionById);

export default routeProduction;
