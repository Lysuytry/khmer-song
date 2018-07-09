import Playlist from '../../models/playlist';

export const getPlaylist = async (req, res) => {
  try{
    //const playlist
    res.success();
  } catch(error){
    res.fail(error);
  }
};

export const createPlaylist = async (req, res) => {
  try{
    const {name} = req.body;
    //we must know who created it
    const [playlist] = await Playlist.findOrCreate({where: {name}, defaults: req.body});
    res.success(playlist);
  } catch(error){
    res.fail(error);
  }
};

export const deletePlaylist = async (req, res) => {
  try{
    const {id} = req.params;
    const result = await Playlist.destroy({id});
    result ? res.success('Successfully deleted.') : res.fail('Id is not found.');
  } catch(error){
    res.fail(error);
  }
};
