import {Router} from 'express';
import {createPlaylist, deletePlaylist, getPlaylist, addSongToPlaylist, removeSongFromPlaylist, getSongFromPlaylist} from './playlist.api';
import {validatePlaylistCreating} from './playlist.middleware';

const routePlaylist = Router();

routePlaylist.post('/', validatePlaylistCreating, createPlaylist);
routePlaylist.delete('/:id', deletePlaylist);
routePlaylist.get('/:id', getSongFromPlaylist);
routePlaylist.get('/users/:id', getPlaylist);
routePlaylist.post('/:id/songs/:songId', addSongToPlaylist);
routePlaylist.delete('/:id/songs/:songId', removeSongFromPlaylist);

export default routePlaylist;
