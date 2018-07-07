import Album from '../../../models/album';

export const getAlbumList = async (req, res) => {
  try{
    const {limit, offset, status} = req.query;
    const { rows, count} = await Album.findAndCountAll();
    res.success(rows, {limit, offset, count});
  } catch(error){
    res.fail(error);
  }
};
