import { Router } from 'express';
import { getArtistList, createArtist, getArtistById, updateArtistById, deletedArtistById} from './artist.api';
import {validateArtistCreating, validateArtistUpdating} from './artist.middleware';

const routeArtist = Router();

routeArtist.get('/', getArtistList);
routeArtist.post('/', validateArtistCreating, createArtist);
routeArtist.get('/:id', getArtistById);
routeArtist.put('/:id', validateArtistUpdating, updateArtistById);
routeArtist.delete('/:id', deletedArtistById);

export default routeArtist;
