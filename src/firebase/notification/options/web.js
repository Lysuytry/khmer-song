export const webOptions = options => {
  const { TTL = '4500' } = options;
  return {
    webpush: {
      headers: {
        TTL
      }
    }
  };
};
