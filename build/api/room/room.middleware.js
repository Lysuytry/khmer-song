'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateAddUserToRoom = exports.validateRoomCreating = undefined;

var _validator = require('../../common/validator.js');

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const roomCreatingSchema = _joi2.default.object().keys({
  name: _joi2.default.string().required(),
  friendIds: _joi2.default.array().required()
});

const roomAddUserToRoomSchema = _joi2.default.object().keys({
  friendIds: _joi2.default.array().required()
});

const validateRoomCreating = exports.validateRoomCreating = (req, res, next) => {
  (0, _validator.validator)(req.body, roomCreatingSchema, req, res, next);
};

const validateAddUserToRoom = exports.validateAddUserToRoom = (req, res, next) => {
  (0, _validator.validator)(req.body, roomAddUserToRoomSchema, req, res, next);
};
//# sourceMappingURL=room.middleware.js.map