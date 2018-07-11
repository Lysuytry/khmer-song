import Playlist from '../../models/playlist';
import User from '../../models/user';
import { Op } from '../../common/sequelize-connection';

export const getPlaylist = async (req, res) => {
  try{
    const {id} = req.params;
    const {limit, offset, name} = req.query;
    const fliterName = name ? {name: {[Op.like]: `%${name}%` } } : {};
    const conditions = {userId: id, ...fliterName};
    const {rows, count} = await Playlist.findAndCountAll({where: conditions, offset, limit});
    res.success(rows, {count, limit, offset});
  } catch(error){
    res.fail(error);
  }
};

export const createPlaylist = async (req, res) => {
  try{
    const {name, userId} = req.body;
    //we must know who created it
    const user = await User.findById(userId);
    const [playlist] = !user ? res.fail('User Id is not found.') :
      await Playlist.findOrCreate({where: {name}, defaults: req.body});
    res.success(playlist);
  } catch(error){
    res.fail(error);
  }
};

export const deletePlaylist = async (req, res) => {
  try{
    const {id} = req.params;
    const result = await Playlist.destroy({where: {id} });
    result ? res.success('Successfully deleted.') : res.fail('Id is not found.');
  } catch(error){
    res.fail(error);
  }
};
