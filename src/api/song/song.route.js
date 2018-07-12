import { Router } from 'express';
import { getSongById, getSongList } from './song.api';

const routeSong = Router();

routeSong.get('/', getSongList);
routeSong.get('/:id', getSongById);

export default routeSong;
