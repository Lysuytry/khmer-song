'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _album = require('./album.api');

var _album2 = require('./album.middleware');

const routeAlbum = (0, _express.Router)();

routeAlbum.get('/', _album.getAlbumList);
routeAlbum.post('/', _album2.validateAlbumCreating, _album.createAlbum);
routeAlbum.get('/:id', _album.getAlbumById);
routeAlbum.put('/:id', _album2.validateAlbumUpdating, _album.updateAlbumById);
routeAlbum.delete('/:id', _album.deletedAlbumById);

exports.default = routeAlbum;
//# sourceMappingURL=album.route.js.map