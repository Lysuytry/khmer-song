import Joi from 'joi';
import {validator} from '../../../common/validator';

const productionCreatingSchema = Joi.object().keys({
  name: Joi.string().required(),
  logo: Joi.string(),
  updatedBy: Joi.string(),
  createdBy: Joi.string(),
});

const productionUpdatingSchema = Joi.object().keys({
  name: Joi.string(),
  logo: Joi.string(),
  updatedBy: Joi.string(),
  createdBy: Joi.string(),
  status: Joi.string()
});

export const validateProductionCreating = (req, res, next) => {
  const {name, logo, createdBy, updatedBy} = req.body;
  validator({name, logo, createdBy, updatedBy}, productionCreatingSchema, req, res, next);
};

export const validateProductionUpdating = (req, res, next) => {
  const {name, logo, status, createdBy, updatedBy} = req.body;
  validator({name, logo, status, createdBy, updatedBy}, productionUpdatingSchema, req, res, next);
};
