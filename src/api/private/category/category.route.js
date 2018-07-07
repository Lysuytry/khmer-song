import { Router } from 'express';
import { getCategoryList} from './category.api';

const routeCategory = Router();

routeCategory.get('/', getCategoryList);

export default routeCategory;
