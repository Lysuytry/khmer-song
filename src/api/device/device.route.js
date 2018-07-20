import { Router } from 'express';
import { registerDevice, subscribeDevice, unsubscribeDevice, getListDevice } from './device.api';
import { validateDeviceCreating } from './device.middleware';

const routeDevice = Router();

routeDevice.get('/', getListDevice);
routeDevice.post('/', validateDeviceCreating, registerDevice);
routeDevice.post('/subscribe', subscribeDevice);
routeDevice.post('/unsubscribe', unsubscribeDevice);

export default routeDevice;
