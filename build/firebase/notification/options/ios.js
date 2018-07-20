'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const iosOptions = exports.iosOptions = options => {
  const { priority = 10, badge = 42, expired = '1604750400' } = options;
  return {
    apns: {
      header: {
        'apns-priority': priority,
        'apns-expiration': expired
      },
      payload: {
        aps: {
          badge
        }
      }
    }
  };
};
//# sourceMappingURL=ios.js.map