import {Router} from 'express';
import {createPlaylist, deletePlaylist} from './playlist.api';
import {validatePlaylistCreating} from './playlist.middleware';

const routePlaylist = Router();

routePlaylist.post('/', validatePlaylistCreating, createPlaylist);
routePlaylist.delete('/:id', deletePlaylist);

export default routePlaylist;
