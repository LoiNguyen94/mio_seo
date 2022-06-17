import { Network } from '@capacitor/network';
import { useCallback, useState, useEffect } from 'react';

export const useCapacitorNetwork = () => {
  const isClient = typeof window === 'object';
  const fakeNetwork = {
    connected: true,
    connectionType: 'none',
  };
  const getStatusNetwork = useCallback(
    () => ({
      status: isClient ? Network.getStatus() : Promise.resolve(fakeNetwork),
    }),
    [isClient]
  );

  const [status, setStatus] = useState(getStatusNetwork);

  useEffect(() => {
    if (!isClient) {
      return;
    }
    const onChangeNetwork = () => {
      setStatus(getStatusNetwork);
    };
    Network.addListener('networkStatusChange', onChangeNetwork);
    return () => {
      Network.removeAllListeners();
    };
  }, [getStatusNetwork, isClient]);

  return status;
};

export default useCapacitorNetwork;