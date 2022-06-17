import { Device } from '@capacitor/device';

export const useCapacitorDevice = async () => {
  const info = await Device.getInfo();
  return JSON.stringify(info);
};