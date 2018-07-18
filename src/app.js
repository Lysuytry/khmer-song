import body from 'body-parser';
import 'dotenv/config';
import express from 'express';
import logger from 'morgan';

import admin from './api/admin/admin';
import routeArtist from './api/artist/artist.route';
import routeAuth from './api/auth/auth.route';
import routeProduction from './api/production/production.route';
import routePlaylist from './api/playlist/playlist.route';
import routeSong from './api/song/song.route';
import routeUser from './api/user/user.route';
import routeRoom from './api/room/room.route';

import { filterQuery } from './common/query';
//checkfunction is from admin middleware to check token user admin
import {checkToken, checkTokenForGuest} from './api/admin/admin.middleware';

const app = express();

const {ENDPOINT} = process.env;

app.use(logger('dev'));
app.use(body.json());
app.use(body.urlencoded({ extended: false}));

app.use((req, res, next) => {
  //bind query
  filterQuery(req);
  //for response success
  res.success = (data, options, code = 200) => {
    return typeof data === 'object' ? options ? res.status(code).json({data, options}) : res.status(code).json(data) : res.status(code).json({message: data});
  };
  //for response error
  res.fail = (message, code = 500) => {
    console.log(message);
    return res.status(code).json({message});
  };
  //parse to next
  next();
});

app.use(`${ENDPOINT}/`, routeAuth);
app.use(`${ENDPOINT}/admin`, checkToken, admin);
app.use(`${ENDPOINT}/rooms`, checkTokenForGuest, routeRoom);
app.use(`${ENDPOINT}/songs`, routeSong);
app.use(`${ENDPOINT}/users`, checkTokenForGuest, routeUser);
app.use(`${ENDPOINT}/artists`, routeArtist);
app.use(`${ENDPOINT}/playlist`, checkTokenForGuest, routePlaylist);
app.use(`${ENDPOINT}/productions`, routeProduction);

export default app;
