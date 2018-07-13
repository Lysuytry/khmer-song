import Joi from 'joi';
import { validator } from '../../../common/validator';

const songCreatingSchema = Joi.object().keys({
  name: Joi.string().required(),
  duration: Joi.string().required(),
  size: Joi.number().required(),
  artistIds: Joi.array().required(),
  albumId: Joi.number().required(),
  categoryId: Joi.number().required()
});

const songUpdatingSchema = Joi.object().keys({
  name: Joi.string(),
  duration: Joi.string(),
  size: Joi.number(),
  artistIds: Joi.array(),
  albumId: Joi.number(),
  categoryId: Joi.number()
});

export const validateSongCreating = (req, res, next) => {
  //const { name, duration, size, artistIds, albumId, categoryId } = req.body;
  validator(req.body, songCreatingSchema, req, res, next);
};

export const validateSongUpdating = (req, res, next) => {
  //const { name, duration, size, artistIds, albumId, categoryId } = req.body;
  validator(req.body, songUpdatingSchema, req, res, next);
};
