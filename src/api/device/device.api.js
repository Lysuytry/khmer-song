import Device, { getAllDevices } from '../../models/device';

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
    const { deviceId } = req.query;
    await Device.update({ subscribed: 'subscribed' }, { where: { userId, registrationToken: deviceId } });
    res.success('Subscribed for notification.');
  } catch (error) {
    res.fail(error);
  }
};

export const unsubscribeDevice = async (req, res) => {
  try {
    const userId = req.authUser.id;
    const { deviceId } = req.query;
    await Device.update({ subscribed: 'unsubscribed' }, { where: { userId, registrationToken: deviceId } });
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
