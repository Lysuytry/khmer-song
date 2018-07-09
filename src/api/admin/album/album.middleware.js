import Joi from 'joi';
import {validator} from '../../../common/validator';

const albumCreatingSchema = Joi.object().keys({
  name: Joi.string().required(),
  image: Joi.string(),
  productionId: Joi.number(),
  updatedBy: Joi.string(),
  createdBy: Joi.string(),
  status: Joi.string()
});

const albumUpdatingSchema = Joi.object().keys({
  name: Joi.string(),
  image: Joi.string(),
  productionId: Joi.number(),
  updatedBy: Joi.string(),
  createdBy: Joi.string(),
  status: Joi.string()
});

export const validateAlbumCreating = (req, res, next) => {
  const {name, image, productionId, updatedBy, createdBy, status} = req.body;
  validator({name, image, productionId, updatedBy, createdBy, status}, albumCreatingSchema, req, res, next);
};

export const validateAlbumUpdating = (req, res, next) => {
  const {name, image, productionId, updatedBy, createdBy, status} = req.body;
  validator({name, image, productionId, updatedBy, createdBy, status}, albumUpdatingSchema, req, res, next);
};
