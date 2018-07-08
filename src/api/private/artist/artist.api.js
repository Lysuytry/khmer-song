import Artist from '../../../models/artist';

export const getArtistList = async (req, res) => {
  try{
    const {limit, offset, status} = req.query;
    const {rows, count} = await Artist.findAndCountAll({where: {status}}, {limit});
    res.success(rows, {limit, offset, count});
  } catch(error){
    res.fail(error);
  }
};

export const createArtist = async (req, res) => {
  try{
    const {name, type} = req.body;
    const [artist] = await Artist.findOrCreate({where: {name}, defaults: req.body});
    res.success(artist);
  } catch(error){
    res.fail(error);
  }
};

export const getArtistById = async (req, res) => {
  try{
    const {status} = req.query;
    const {id} = req.params;
    const artist = await Artist.find({where: {id, status}});
    res.success(artist);
  } catch(error){
    res.fail(error);
  }
};

export const updateArtistById = async (req, res) => {
  try{
    const {status} = req.query;
    const {id} = req.params;
    let {name, type, image, createdBy, updatedBy} = req.body;
    name = name ? {name} : {};
    type = type ? {type} : {};
    image = image ? {image} : {};
    createdBy = createdBy ? {createdBy} : {};
    updatedBy = updatedBy ? {updatedBy} : {};
    const data = {...name, ...type, ...image, ...createdBy, ...updatedBy};
    await Artist.update(data, {where: {id, status}});
    res.success('Succesfully updated');
  } catch(error){
    res.fail(error);
  }
};

export const deletedArtistById = async (req, res) => {
  try{
    const {status} = req.query;
    const {id} = req.params;
    const result = await Artist.update({status: 'inactive'}, {where: {id, status}});
    result === 1 ? res.success('Successfully deleted.') : res.success('Id not found');
  } catch(error){
    res.fail(error);
  }
};
