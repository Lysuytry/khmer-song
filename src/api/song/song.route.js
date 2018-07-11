import {Router} from 'express';
import {getSongById} from './song.api';

const routeSong = Router();

routeSong.get('/:id', getSongById);

export default routeSong;
