import Joi from 'joi';
import {validator} from '../../../common/validator';

const categoryCreatingSchema = Joi.object().keys({
  name: Joi.string().required(),
  status: Joi.string()
});

const categoryUpdatingSchema = Joi.object().keys({
  name: Joi.string(),
  status: Joi.string()
});

export const validatCategoryCreating = (req, res, next) => {
  //const {name, status, createdBy, updatedBy} = req.body;
  validator(req.body, categoryCreatingSchema, req, res, next);
};

export const validatCategoryUpdating = (req, res, next) => {
  //const {name, status, createdBy, updatedBy} = req.body;
  validator(req.body, categoryUpdatingSchema, req, res, next);
};
