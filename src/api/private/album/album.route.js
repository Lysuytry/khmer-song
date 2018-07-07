import { Router } from 'express';
import { getAlbumList} from './album.api';

const routeAlbum = Router();

routeAlbum.get('/', getAlbumList);

export default routeAlbum;
