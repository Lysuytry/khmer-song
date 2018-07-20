import Joi from 'joi';
import {validator} from '../../common/validator';

const deviceCreatingSchema = Joi.object().keys({
  name: Joi.string().required(),
  registrationToken: Joi.string().required(),
  type: Joi.string().required(),
  tags: Joi.string()
});

export const validateDeviceCreating = (req, res, next) => {
  validator(req.body, deviceCreatingSchema, req, res, next);
};
