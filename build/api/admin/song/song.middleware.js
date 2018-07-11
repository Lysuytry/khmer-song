'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateSongCreating = undefined;

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _validator = require('../../../common/validator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const songCreatingSchema = _joi2.default.object().keys({
  name: _joi2.default.string().required(),
  duration: _joi2.default.string().required(),
  size: _joi2.default.number().required(),
  artistIds: _joi2.default.array().required(),
  albumId: _joi2.default.number().required(),
  categoryId: _joi2.default.number().required()
});

const validateSongCreating = exports.validateSongCreating = (req, res, next) => {
  const { name, duration, size, artistIds, albumId, categoryId } = req.body;
  (0, _validator.validator)({ name, duration, size, artistIds, albumId, categoryId }, songCreatingSchema, req, res, next);
};
//# sourceMappingURL=song.middleware.js.map