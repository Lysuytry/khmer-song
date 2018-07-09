'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _album = require('./album.api');

const routeAlbum = (0, _express.Router)();

routeAlbum.get('/', _album.getAlbumList);

exports.default = routeAlbum;
//# sourceMappingURL=album.route.js.map