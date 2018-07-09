import Joi from 'joi';
import {validator} from '../../../common/validator';

const artistCreatingSchema = Joi.object().keys({
  name: Joi.string().required(),
  type: Joi.string(),
  image: Joi.string(),
  status: Joi.string(),
  createdBy: Joi.string(),
  updatedBy: Joi.string()
});

const artistUpdatingSchema = Joi.object().keys({
  name: Joi.string(),
  type: Joi.string(),
  image: Joi.string(),
  status: Joi.string(),
  createdBy: Joi.string(),
  updatedBy: Joi.string()
});

export const validateArtistCreating = (req, res, next) => {
  const {name, type, image, status, createdBy, updatedBy} = req.body;
  validator({name, type, image, status, createdBy, updatedBy}, artistCreatingSchema, req, res, next);
};

export const validateArtistUpdating = (req, res, next) => {
  const {name, type, image, status, createdBy, updatedBy} = req.body;
  validator({name, type, image, status, createdBy, updatedBy}, artistUpdatingSchema, req, res, next);
};
