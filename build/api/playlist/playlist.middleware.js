'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateAddSongToPlaylist = exports.validatePlaylistCreating = undefined;

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _validator = require('../../common/validator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const playlistCreatingSchema = _joi2.default.object().keys({
  name: _joi2.default.string().required(),
  userId: _joi2.default.number().required()
});

const addSongSchema = _joi2.default.object().keys({
  playlistId: _joi2.default.number().required(),
  songId: _joi2.default.number().required()
});

const validatePlaylistCreating = exports.validatePlaylistCreating = (req, res, next) => {
  const { name, userId } = req.body;
  (0, _validator.validator)({ name, userId }, playlistCreatingSchema, req, res, next);
};

const validateAddSongToPlaylist = exports.validateAddSongToPlaylist = (req, res, next) => {
  const { playlistId, songId } = req.body;
  (0, _validator.validator)({ playlistId, songId }, addSongSchema, req, res, next);
};
//# sourceMappingURL=playlist.middleware.js.map