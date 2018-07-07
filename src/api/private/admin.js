import {Router} from 'express';
import routeProduction from './production/production.route';
import routeSong from './song/song.route';
import routeAlbum from './album/album.route';
import routeCategory from './category/category.route';
import routeArtist from './artist/artist.route';

const admin = Router();

admin.use('/songs', routeSong);
admin.use('/albums', routeAlbum);
admin.use('/artists', routeArtist);
admin.use('/categories', routeCategory);
admin.use('/productions', routeProduction);

export default admin;
