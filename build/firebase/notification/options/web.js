'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const webOptions = exports.webOptions = options => {
  const { TTL = '4500' } = options;
  return {
    webpush: {
      headers: {
        TTL
      }
    }
  };
};
//# sourceMappingURL=web.js.map