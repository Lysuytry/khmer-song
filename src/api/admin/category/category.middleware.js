import Joi from 'joi';
import {validator} from '../../../common/validator';

const categoryCreatingSchema = Joi.object().keys({
  name: Joi.string().required(),
  status: Joi.string(),
  createdBy: Joi.string(),
  updatedBy: Joi.string()
});

const categoryUpdatingSchema = Joi.object().keys({
  name: Joi.string(),
  status: Joi.string(),
  createdBy: Joi.string(),
  updatedBy: Joi.string()
});

export const validatCategoryCreating = (req, res, next) => {
  const {name, status, createdBy, updatedBy} = req.body;
  validator({name, status, createdBy, updatedBy}, categoryCreatingSchema, req, res, next);
};

export const validatCategoryUpdating = (req, res, next) => {
  const {name, status, createdBy, updatedBy} = req.body;
  validator({name, status, createdBy, updatedBy}, categoryUpdatingSchema, req, res, next);
};
