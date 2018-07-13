import Joi from 'joi';
import {validator} from '../../../common/validator';

const productionCreatingSchema = Joi.object().keys({
  name: Joi.string().required(),
  logo: Joi.string()
});

const productionUpdatingSchema = Joi.object().keys({
  name: Joi.string(),
  logo: Joi.string(),
  status: Joi.string()
});

export const validateProductionCreating = (req, res, next) => {
  //const {name, logo, createdBy, updatedBy} = req.body;
  validator(req.body, productionCreatingSchema, req, res, next);
};

export const validateProductionUpdating = (req, res, next) => {
  //const {name, logo, status, createdBy, updatedBy} = req.body;
  validator(req.body, productionUpdatingSchema, req, res, next);
};
