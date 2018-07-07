'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _artist = require('./artist.api');

const routeArtist = (0, _express.Router)();

routeArtist.get('/', _artist.getArtistList);

exports.default = routeArtist;
//# sourceMappingURL=artist.route.js.map