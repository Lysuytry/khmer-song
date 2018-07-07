import Artist from '../../../models/artist';

export const getArtistList = async (req, res) => {
  try{
    const {limit, skip, status} = req.query;
    const {rows, count} = await Artist.findAndCountAll();
    res.success(rows, {limit, skip, count});
  } catch(error){
    res.fail(error);
  }
};
