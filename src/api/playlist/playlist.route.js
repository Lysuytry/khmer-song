import {Router} from 'express';
import {createPlaylist, deletePlaylist, getPlaylist, addSongToPlaylist, removeSongFromPlaylist, getSongFromPlaylist} from './playlist.api';
import {validatePlaylistCreating} from './playlist.middleware';

const routePlaylist = Router();

routePlaylist.get('/', getPlaylist);
routePlaylist.post('/', validatePlaylistCreating, createPlaylist);
routePlaylist.get('/:id', getSongFromPlaylist);
routePlaylist.delete('/:id', deletePlaylist);
routePlaylist.post('/:id/songs/:songId', addSongToPlaylist);
routePlaylist.delete('/:id/songs/:songId', removeSongFromPlaylist);

export default routePlaylist;
