'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _production = require('./production/production.route');

var _production2 = _interopRequireDefault(_production);

var _song = require('./song/song.route');

var _song2 = _interopRequireDefault(_song);

var _album = require('./album/album.route');

var _album2 = _interopRequireDefault(_album);

var _category = require('./category/category.route');

var _category2 = _interopRequireDefault(_category);

var _artist = require('./artist/artist.route');

var _artist2 = _interopRequireDefault(_artist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const admin = (0, _express.Router)();

admin.use('/songs', _song2.default);
admin.use('/albums', _album2.default);
admin.use('/artists', _artist2.default);
admin.use('/categories', _category2.default);
admin.use('/productions', _production2.default);

exports.default = admin;
//# sourceMappingURL=admin.js.map