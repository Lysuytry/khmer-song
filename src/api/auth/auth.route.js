import { Router } from 'express';
import { registerAuth, loginAuth } from './auth.api';
import { validateAuthRegister, validateAuthLogin } from './auth.middleware';
import path from 'path';
import { sendNotificationLegacy } from '../../firebase/notification/push-notification';

const routeAuth = Router();

routeAuth.get('/login', async (req, res) => {
  try {
    const s = await sendNotificationLegacy({
      title: `A New Message from `,
      body: 'messages',
      token:
        ['fBs7ZSVMtMI:APA91bGGQhMUW6g-o6Dy4NYslf3ijfVFVZGhxUwg63HMbPX2hhvcVVURwx1cJQGB8MOAWkAoxGnfIQrxlOZoCBr3CDJRsW3_83PhV7JaigL6JcMNyZvzciCKHmqrHfdxROrSVkKakHrkAtDoMeP9bTQ9YMkhrkIEMw'],
      data: { hello: 'hi' }
    },{});
    console.log(s);
  } catch (error) {
    res.fail(error);
  }
  const file = path.join(__dirname + '../../../../html/login.html');
  res.sendFile(file);
});
routeAuth.post('/login', validateAuthLogin, loginAuth);
routeAuth.post('/register', validateAuthRegister, registerAuth);

export default routeAuth;
