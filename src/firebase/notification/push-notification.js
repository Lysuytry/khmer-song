import admin from './fcm';
import { createMessage, createMessageLegacy } from './message';

export const sendNotificationLegacy = async data => {
  try {
    const message = createMessageLegacy(data);
    const { registrationToken, payload, options } = message;
    const result = await admin.messaging().sendToDevice(registrationToken, payload, options);
    console.log(result);
    return result;
  } catch (error) {
    return error;
  }
};

export const sendNotification = async (payload, options) => {
  try {
    //message.js
    //const { title, body, topic, token, data } = payload;
    //const {priority, badge, expired, icon, color, sound, ttl, TTL} = options;
    const message = createMessage(payload, options);
    //console.log(message);
    // Send a message to the device corresponding to the provided
    // registration token.
    const result = await admin.messaging().send({ ...message });
    return result;
  } catch (error) {
    return error;
  }
};
