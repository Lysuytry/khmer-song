export const androidOptions = options => {
  const { ttl = 3600 * 1000, priority, icon, color = '#f45342', sound } = options;
  const filterSound = sound ? { sound } : {};
  const filterIcon = icon ? { icon } : {};
  const filterPriority = priority ? { priority } : {};
  return {
    android: {
      ttl, //3600 * 1000 // 1 hour in milliseconds
      ...filterPriority,
      notification : {
        ...filterIcon,
        color,
        ...filterSound
      }
    }
  };
};
