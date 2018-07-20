import { iosOptions } from './options/ios';
import { webOptions } from './options/web';
import { androidOptions } from './options/android';

export const createMessage = (payload, options) => {
  const { title, body, topic, token, data } = payload;
  //const {priority, badge, expired, icon, color, sound, ttl, TTL} = options;
  const filterTopic = topic ? { topic } : { token };
  const filterData = data ? { data } : {};
  return {
    message: {
      ...filterTopic,
      notification: {
        title,
        body
      },
      ...filterData,
      ...iosOptions(options),
      ...androidOptions(options),
      ...webOptions(options)
    }
  };
};

export const createMessageLegacy = (payloadP) => {
  const { token, title, body, data } = payloadP;
  const filterData = data ? { data } : {};
  const payload = {
    notification: {
      title,
      body
    },
    ...filterData
  };
  const options = {
    priority: 'high',
    timeToLive: 60 * 60 * 24
  };
  //const option = legacyOptions(options);
  return {
    registrationToken: token,
    payload,
    options
  };
};
