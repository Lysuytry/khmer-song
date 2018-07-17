import { Router } from 'express';
import { getCategoryList, getCategoryById, createCategory, updateCategoryById, deleteCategory} from './category.api';
import {validatCategoryCreating, validatCategoryUpdating} from './category.middleware';

const routeCategory = Router();

routeCategory.get('/', getCategoryList);
routeCategory.post('/', validatCategoryCreating, createCategory);
routeCategory.get('/:id', getCategoryById);
routeCategory.put('/:id', validatCategoryUpdating, updateCategoryById);
routeCategory.delete('/:id', deleteCategory);

export default routeCategory;
