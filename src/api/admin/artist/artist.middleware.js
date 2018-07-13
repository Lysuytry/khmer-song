import Joi from 'joi';
import {validator} from '../../../common/validator';

const artistCreatingSchema = Joi.object().keys({
  name: Joi.string().required(),
  type: Joi.string(),
  image: Joi.string(),
  status: Joi.string()
});

const artistUpdatingSchema = Joi.object().keys({
  name: Joi.string(),
  type: Joi.string(),
  image: Joi.string(),
  status: Joi.string()
});

export const validateArtistCreating = (req, res, next) => {
  //const {name, type, image, status, createdBy, updatedBy} = req.body;
  validator(req.body, artistCreatingSchema, req, res, next);
};

export const validateArtistUpdating = (req, res, next) => {
  //const {name, type, image, status, createdBy, updatedBy} = req.body;
  validator(req.body, artistUpdatingSchema, req, res, next);
};
