export const iosOptions = options => {
  const {priority = 10, badge = 42, expired = '1604750400'} = options;
  return {
    apns: {
      header: {
        'apns-priority': priority,
        'apns-expiration': expired
      },
      payload: {
        aps: {
          badge,
        }
      }
    }
  };
};
