import Device, { getAllDevices, getRegistrationTokenByUserId } from '../../models/device';

export const registerDevice = async (req, res) => {
  try {
    const userId = req.authUser.id;
    const device = await Device.create({ ...req.body, userId });
    res.success(device);
  } catch (error) {
    res.fail(error);
  }
};

export const subscribeDevice = async (req, res) => {
  try {
    const userId = req.authUser.id;
    //const { deviceId } = req.params;
    await Device.update({ subscribed: 'subscribed' }, { where: { userId } });
    res.success('Subscribed for notification.');
  } catch (error) {
    res.fail(error);
  }
};

export const unsubscribeDevice = async (req, res) => {
  try {
    const userId = req.authUser.id;
    //const { deviceId } = req.params;
    await Device.update({ subscribed: 'unsubscribed' }, { where: { userId } });
    res.success('Unsubscribed for notification.');
  } catch (error) {
    res.fail(error);
  }
};

export const getListDevice = async (req, res) => {
  try {
    const { userId, type, tags, subscribed, attribute, offset } = req.query;
    let { limit } = req.query;
    limit = limit < 100 || limit > 200 ? 100 : limit;

    const data = { userId, type, tags, subscribed, attribute, limit, offset };
    const devices = await getAllDevices(data);
    res.success(devices);
  } catch (error) {
    res.fail(error);
  }
};

export const getListDeviceByUserId = async (req, res) => {
  try {
    const userId = req.authUser.id;
    const device = await Device.findOne({ where: { userId } });
    res.success(device);
  } catch (error) {
    res.fail(error);
  }
};

export const getDeviceIdByUserId = async (req, res) => {
  try {
    const { userIds } = req.body;
    const devices = await getRegistrationTokenByUserId(userIds);
    res.success(devices);
  } catch (error) {
    res.fail(error);
  }
};
