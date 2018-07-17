'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _artist = require('./artist.api');

var _artist2 = require('./artist.middleware');

const routeArtist = (0, _express.Router)();

routeArtist.get('/', _artist.getArtistList);
routeArtist.post('/', _artist2.validateArtistCreating, _artist.createArtist);
routeArtist.get('/:id', _artist.getArtistById);
routeArtist.put('/:id', _artist2.validateArtistUpdating, _artist.updateArtistById);
routeArtist.delete('/:id', _artist.deletedArtistById);

exports.default = routeArtist;
//# sourceMappingURL=artist.route.js.map