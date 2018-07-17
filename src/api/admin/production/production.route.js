import { Router } from 'express';
import { getProductionList, createProduction, updateProductionById, deleteProductionById, getProductionById} from './production.api';
import { validateProductionCreating, validateProductionUpdating} from './production.middleware';

const routeProduction = Router();

routeProduction.get('/', getProductionList);
routeProduction.post('/', validateProductionCreating, createProduction);
routeProduction.get('/:id', getProductionById);
routeProduction.put('/:id', validateProductionUpdating, updateProductionById);
routeProduction.delete('/:id', deleteProductionById);

export default routeProduction;
