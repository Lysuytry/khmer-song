import Joi from 'joi';
import {validator} from '../../common/validator';

const playlistCreatingSchema = Joi.object().keys({
  name: Joi.string().required(),
  userId: Joi.number().required()
});

const addSongSchema = Joi.object().keys({
  playlistId: Joi.number().required(),
  songId: Joi.number().required()
});

export const validatePlaylistCreating = (req, res, next) => {
  const {name, userId} = req.body;
  validator({name, userId}, playlistCreatingSchema, req, res, next);
};

export const validateAddSongToPlaylist = (req, res, next) => {
  const {playlistId, songId} = req.body;
  validator({playlistId, songId}, addSongSchema, req, res, next);
};
