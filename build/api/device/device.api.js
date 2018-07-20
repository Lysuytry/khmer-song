'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getListDevice = exports.unsubscribeDevice = exports.subscribeDevice = exports.registerDevice = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _device = require('../../models/device');

var _device2 = _interopRequireDefault(_device);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const registerDevice = exports.registerDevice = async (req, res) => {
  try {
    const userId = req.authUser.id;
    const device = await _device2.default.create(_extends({}, req.body, { userId }));
    res.success(device);
  } catch (error) {
    res.fail(error);
  }
};

const subscribeDevice = exports.subscribeDevice = async (req, res) => {
  try {
    const userId = req.authUser.id;
    const { deviceId } = req.query;
    await _device2.default.update({ subscribed: 'subscribed' }, { where: { userId, registrationToken: deviceId } });
    res.success('Subscribed for notification.');
  } catch (error) {
    res.fail(error);
  }
};

const unsubscribeDevice = exports.unsubscribeDevice = async (req, res) => {
  try {
    const userId = req.authUser.id;
    const { deviceId } = req.query;
    await _device2.default.update({ subscribed: 'unsubscribed' }, { where: { userId, registrationToken: deviceId } });
    res.success('Unsubscribed for notification.');
  } catch (error) {
    res.fail(error);
  }
};

const getListDevice = exports.getListDevice = async (req, res) => {
  try {
    const { userId, type, tags, subscribed, attribute, offset } = req.query;
    let { limit } = req.query;
    limit = limit < 100 || limit > 200 ? 100 : limit;

    const data = { userId, type, tags, subscribed, attribute, limit, offset };
    const devices = await (0, _device.getAllDevices)(data);
    res.success(devices);
  } catch (error) {
    res.fail(error);
  }
};
//# sourceMappingURL=device.api.js.map