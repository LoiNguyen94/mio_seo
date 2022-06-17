export const setStorage = (key: string, value: any) =>
  localStorage.setItem(key, value);

export const getStorage = async (key: string) => {
  const value = await localStorage.getItem(key);
  return value;
};

export const setObjectStorage = (key: string, value: any) =>
  localStorage.setItem(key, JSON.stringify(value));

export const getObjectStorage = async (key: string) => {
  try {
    const value = await localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
  } catch (err) {
    console.log('err local storage', err);
  }
  return {};
};

export const removeStorage = (key: string) => localStorage.removeItem(key);
