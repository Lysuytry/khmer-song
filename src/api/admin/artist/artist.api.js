import Artist from '../../../models/artist';
import { Op } from '../../../common/sequelize-connection';

export const getArtistList = async (req, res) => {
  try {
    const { limit, offset, status, name } = req.query;
    const filterName = name ? { name: { [Op.like]: `%${name}%` } } : {};
    const conditions = { ...filterName, status };
    const { rows, count } = await Artist.findAndCountAll({ where: conditions, limit, offset });
    res.success(rows, { limit, offset, count });
  } catch (error) {
    res.fail(error.message);
  }
};

export const createArtist = async (req, res) => {
  try {
    const { name } = req.body;
    const { createdBy, updatedBy } = req.authUser;
    const [artist] = await Artist.findOrCreate({ where: { name }, defaults: { ...req.body, createdBy, updatedBy } });
    res.success(artist);
  } catch (error) {
    res.fail(error.message);
  }
};

export const getArtistById = async (req, res) => {
  try {
    const { status } = req.query;
    const { id } = req.params;
    const artist = await Artist.findOne({ where: { id, status } });
    res.success(artist);
  } catch (error) {
    res.fail(error.message);
  }
};

export const updateArtistById = async (req, res) => {
  try {
    const { status } = req.query;
    const { id } = req.params;
    const { updatedBy } = req.authUser;
    let { name, type, image} = req.body;
    name = name ? { name } : {};
    type = type ? { type } : {};
    image = image ? { image } : {};
    const data = { ...name, ...type, ...image, updatedBy };
    await Artist.update(data, { where: { id, status } });
    res.success('Successfully updated');
  } catch (error) {
    res.fail(error.message);
  }
};

export const deletedArtistById = async (req, res) => {
  try {
    const { id } = req.params;
    const { updatedBy } = req.authUser;
    const result = await Artist.update({ status: 'inactive', updatedBy}, { where: { id, status: 'active' } });
    result === 1 ? res.success('Successfully deleted.') : res.success('Id not found');
  } catch (error) {
    res.fail(error.message);
  }
};
