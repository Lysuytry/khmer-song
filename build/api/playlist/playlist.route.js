'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _playlist = require('./playlist.api');

var _playlist2 = require('./playlist.middleware');

const routePlaylist = (0, _express.Router)();

routePlaylist.get('/', _playlist.getPlaylist);
routePlaylist.post('/', _playlist2.validatePlaylistCreating, _playlist.createPlaylist);
routePlaylist.get('/:id', _playlist.getSongFromPlaylist);
routePlaylist.delete('/:id', _playlist.deletePlaylist);
routePlaylist.post('/:id/songs/:songId', _playlist.addSongToPlaylist);
routePlaylist.delete('/:id/songs/:songId', _playlist.removeSongFromPlaylist);

exports.default = routePlaylist;
//# sourceMappingURL=playlist.route.js.map