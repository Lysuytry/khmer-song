import { Router } from 'express';
import { getAlbumList, createAlbum, getAlbumById, updateAlbumById, deletedAlbumById} from './album.api';
import {validateAlbumCreating, validateAlbumUpdating} from './album.middleware';

const routeAlbum = Router();

routeAlbum.get('/', getAlbumList);
routeAlbum.post('/', validateAlbumCreating, createAlbum);
routeAlbum.get('/:id', getAlbumById);
routeAlbum.put('/:id', validateAlbumUpdating, updateAlbumById);
routeAlbum.delete('/:id', deletedAlbumById);

export default routeAlbum;
