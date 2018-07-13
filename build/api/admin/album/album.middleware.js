'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateAlbumUpdating = exports.validateAlbumCreating = undefined;

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _validator = require('../../../common/validator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const albumCreatingSchema = _joi2.default.object().keys({
  name: _joi2.default.string().required(),
  image: _joi2.default.string(),
  productionId: _joi2.default.number(),
  type: _joi2.default.string(),
  status: _joi2.default.string()
});

const albumUpdatingSchema = _joi2.default.object().keys({
  name: _joi2.default.string(),
  image: _joi2.default.string(),
  type: _joi2.default.string(),
  productionId: _joi2.default.number(),
  status: _joi2.default.string()
});

const validateAlbumCreating = exports.validateAlbumCreating = (req, res, next) => {
  //const {name, image, productionId, updatedBy, createdBy, status} = req.body;
  (0, _validator.validator)(req.body, albumCreatingSchema, req, res, next);
};

const validateAlbumUpdating = exports.validateAlbumUpdating = (req, res, next) => {
  //const {name, image, productionId, updatedBy, createdBy, status} = req.body;
  (0, _validator.validator)(req.body, albumUpdatingSchema, req, res, next);
};
//# sourceMappingURL=album.middleware.js.map