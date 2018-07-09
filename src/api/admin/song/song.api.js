import Song from '../../../models/song';

export const getSongList = async (req, res) => {
  try{
    const {limit, offset, status} = req.query;
    const {rows, count} = await Song.findAndCount();
    res.success(rows, {limit, offset, count});
  } catch(error){
    res.fail(error);
  }
};
