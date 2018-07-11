import { Router} from 'express';
import { getSongList, getSongById, deleteSongById, createSong, updateSongById} from './song.api';
import { validateSongCreating} from './song.middleware';

const routeSong = Router();

routeSong.get('/', getSongList);
routeSong.post('/', validateSongCreating, createSong);
routeSong.get('/:id', getSongById);
routeSong.put('/:id', updateSongById);
routeSong.delete('/:id', deleteSongById);

export default routeSong;
