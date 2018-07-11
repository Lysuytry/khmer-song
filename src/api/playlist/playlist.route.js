import {Router} from 'express';
import {createPlaylist, deletePlaylist, getPlaylist} from './playlist.api';
import {validatePlaylistCreating} from './playlist.middleware';

const routePlaylist = Router();

routePlaylist.post('/', validatePlaylistCreating, createPlaylist);
routePlaylist.delete('/:id', deletePlaylist);
routePlaylist.get('/users/:id', getPlaylist);

export default routePlaylist;
