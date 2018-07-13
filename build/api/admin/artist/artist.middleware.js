'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateArtistUpdating = exports.validateArtistCreating = undefined;

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _validator = require('../../../common/validator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const artistCreatingSchema = _joi2.default.object().keys({
  name: _joi2.default.string().required(),
  type: _joi2.default.string(),
  image: _joi2.default.string(),
  status: _joi2.default.string()
});

const artistUpdatingSchema = _joi2.default.object().keys({
  name: _joi2.default.string(),
  type: _joi2.default.string(),
  image: _joi2.default.string(),
  status: _joi2.default.string()
});

const validateArtistCreating = exports.validateArtistCreating = (req, res, next) => {
  //const {name, type, image, status, createdBy, updatedBy} = req.body;
  (0, _validator.validator)(req.body, artistCreatingSchema, req, res, next);
};

const validateArtistUpdating = exports.validateArtistUpdating = (req, res, next) => {
  //const {name, type, image, status, createdBy, updatedBy} = req.body;
  (0, _validator.validator)(req.body, artistUpdatingSchema, req, res, next);
};
//# sourceMappingURL=artist.middleware.js.map