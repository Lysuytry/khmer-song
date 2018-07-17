import Joi from 'joi';
import {validator} from '../../common/validator';

const authRegisterSchema = Joi.object().keys({
  username: Joi.string().alphanum().required(),
  password: Joi.string().alphanum().required(),
  role: Joi.string(),
  createdBy: Joi.number().required(),
  updatedBy: Joi.number().required()
});

const authLoginSchema = Joi.object().keys({
  username: Joi.string().alphanum().required(),
  password: Joi.string().alphanum().required(),
  role: Joi.string(),
  createdBy: Joi.number(),
  updatedBy: Joi.number()
});

export const validateAuthRegister = (req, res, next) => {
  const {username, password, role, createdBy, updatedBy} = req.body;
  validator({username, password, role, createdBy, updatedBy}, authRegisterSchema, req, res, next);
};

export const validateAuthLogin = (req, res, next) => {
  const {username, password, role, createdBy, updatedBy} = req.body;
  validator({username, password, role, createdBy, updatedBy}, authLoginSchema, req, res, next);
};
