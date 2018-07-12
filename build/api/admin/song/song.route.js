'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _song = require('./song.api');

var _song2 = require('./song.middleware');

const routeSong = (0, _express.Router)();

routeSong.get('/', _song.getSongList);
routeSong.post('/', _song2.validateSongCreating, _song.createSong);
routeSong.get('/:id', _song.getSongById);
routeSong.put('/:id', _song2.validateSongUpdating, _song.updateSongById);
routeSong.delete('/:id', _song.deleteSongById);

exports.default = routeSong;
//# sourceMappingURL=song.route.js.map