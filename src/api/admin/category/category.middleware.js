import Joi from 'joi';
import {validator} from '../../../common/validator';

const categoryCreatingSchema = Joi.object().keys({
  name: Joi.string().required(),
  status: Joi.string(),
  createdBy: Joi.number(),
  updatedBy: Joi.number()
});

const categoryUpdatingSchema = Joi.object().keys({
  name: Joi.string(),
  status: Joi.string(),
  createdBy: Joi. number(),
  updatedBy: Joi.number()
});

export const validatCategoryCreating = (req, res, next) => {
  const {name, status, createdBy, updatedBy} = req.body;
  validator({name, status, createdBy, updatedBy}, categoryCreatingSchema, req, res, next);
};

export const validatCategoryUpdating = (req, res, next) => {
  const {name, status, createdBy, updatedBy} = req.body;
  validator({name, status, createdBy, updatedBy}, categoryUpdatingSchema, req, res, next);
};
