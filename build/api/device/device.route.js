'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _device = require('./device.api');

var _device2 = require('./device.middleware');

const routeDevice = (0, _express.Router)();

routeDevice.get('/', _device.getListDevice);
routeDevice.post('/', _device2.validateDeviceCreating, _device.registerDevice);
routeDevice.post('/subscribe', _device.subscribeDevice);
routeDevice.post('/unsubscribe', _device.unsubscribeDevice);

exports.default = routeDevice;
//# sourceMappingURL=device.route.js.map