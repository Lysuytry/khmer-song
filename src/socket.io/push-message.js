import {getRegistrationTokenByUserId} from '../models/device';
import {sendNotificationLegacy} from '../firebase/notification/push-notification';

export const pushMessage = async (data) => {
  try{
    const {id, from, to, messages} = data;
    const token = await getRegistrationTokenByUserId([id], 'subscribed');
    const registerToken = token.map(item => item.registrationToken);
    console.log(registerToken);
    const s = await sendNotificationLegacy({
      title: `A New Message from ${from}`,
      body: `messages to ${to}`,
      token: registerToken,
      data: { messages }
    },{});
    console.log(s);
  } catch(error){
    return error;
  }
};
