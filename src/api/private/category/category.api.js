import Category from '../../../models/category';

export const getCategoryList = async (req, res) => {
  try{
    const {limit, offset, status} = req.query;
    const {rows, count} = await Category.findAndCountAll();
    res.success(rows, {limit, offset, count});
  } catch(error){
    res.fail(error);
  }
};
