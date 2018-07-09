import {Router} from 'express';
import {getArtistList} from './artist.api';

const routeArtist = Router();

routeArtist.get('/', getArtistList);

export default routeArtist;
