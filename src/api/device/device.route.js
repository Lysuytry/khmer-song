import { Router } from 'express';
import { registerDevice, subscribeDevice, unsubscribeDevice, getListDevice, getListDeviceByUserId } from './device.api';
import { validateDeviceCreating } from './device.middleware';

const routeDevice = Router();

routeDevice.get('/', getListDevice);
routeDevice.post('/', validateDeviceCreating, registerDevice);
routeDevice.get('/device', getListDeviceByUserId);
routeDevice.post('/subscribe', subscribeDevice);
routeDevice.post('/unsubscribe', unsubscribeDevice);

export default routeDevice;
