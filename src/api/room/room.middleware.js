import { validator } from '../../common/validator.js';
import Joi from 'joi';

const roomCreatingSchema = Joi.object().keys({
  name: Joi.string().required(),
  friendIds: Joi.array().required()
});

const roomAddUserToRoomSchema = Joi.object().keys({
  friendIds: Joi.array().required()
});

export const validateRoomCreating = (req, res, next) => {
  validator(req.body, roomCreatingSchema, req, res, next);
};

export const validateAddUserToRoom = (req, res, next) => {
  validator(req.body, roomAddUserToRoomSchema, req, res, next);
};
