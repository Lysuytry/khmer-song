import { Router} from 'express';
import { getSongList} from './song.api';

const routeSong = Router();

routeSong.get('/', getSongList);

export default routeSong;
