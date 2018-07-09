import Joi from 'joi';
import {validator} from '../../common/validator';

const authRegisterSchema = Joi.object().keys({
  username: Joi.string().alphanum().required(),
  password: Joi.string().alphanum().required(),
  role: Joi.string()
});

const authLoginSchema = Joi.object().keys({
  username: Joi.string().alphanum().required(),
  password: Joi.string().alphanum().required(),
  role: Joi.string()
});

export const validateAuthRegister = (req, res, next) => {
  const {username, password, role} = req.body;
  validator({username, password, role}, authRegisterSchema, req, res, next);
};

export const validateAuthLogin = (req, res, next) => {
  const {username, password, role} = req.body;
  validator({username, password, role}, authLoginSchema, req, res, next);
};
