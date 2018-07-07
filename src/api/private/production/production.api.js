import Production from '../../../models/production';

export const getProductionList = async (req, res) => {
  try{
    const {rows, count} = await Production.findAndCountAll();
    res.success({productions: rows, count});
  } catch(error){
    res.fail(error.message);
  }
};
