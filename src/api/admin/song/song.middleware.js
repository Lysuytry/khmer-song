import Joi from 'joi';
import {validator} from '../../../common/validator';

const songCreatingSchema = Joi.object().keys({
  name: Joi.string().required(),
  duration: Joi.string().required(),
  size: Joi.number().required(),
  artistIds: Joi.array().required(),
  albumId: Joi.number().required(),
  categoryId: Joi.number().required()
});

export const validateSongCreating = (req, res, next) => {
  const {name, duration, size, artistIds, albumId, categoryId} = req.body;
  validator({name, duration, size, artistIds, albumId, categoryId}, songCreatingSchema, req, res, next);
};
