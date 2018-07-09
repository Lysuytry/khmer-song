import Joi from 'joi';
import {validator} from '../../common/validator';

const playlistCreatingSchema = Joi.object().keys({
  name: Joi.string().required(),
  userId: Joi.number().required()
});

export const validatePlaylistCreating = (req, res, next) => {
  const {name, userId} = req.body;
  validator({name, userId}, playlistCreatingSchema, req, res, next);
};

