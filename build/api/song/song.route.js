'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _song = require('./song.api');

const routeSong = (0, _express.Router)();

routeSong.get('/', _song.getSongList);
routeSong.get('/:id', _song.getSongById);

exports.default = routeSong;
//# sourceMappingURL=song.route.js.map