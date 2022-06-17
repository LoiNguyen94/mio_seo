import { Capacitor } from '@capacitor/core';
import { NextRouter, useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';

export const isWeb = Capacitor.getPlatform() === 'web';
type HistoryLocationState = ReturnType<typeof useHistory>;
type NavigationType = NextRouter & HistoryLocationState;
export enum SCREEN {
  root='root',
  home = 'home',
  login = 'login',
  forget_password = 'forget-password',
  register = 'register',
  location = 'location',
  fill_address = 'fill-address',
  add_new_address = 'add-new-address',
  detail_product = 'detail_product'
}
const prefix = {
  [SCREEN.root]: '/',
  [SCREEN.home]: '/home',
  [SCREEN.login]: '/login',
  [SCREEN.register]: '/register',
  [SCREEN.forget_password]: '/forget-password',
  [SCREEN.location]: '/location',
  [SCREEN.add_new_address]: '/location/add',
  [SCREEN.fill_address]: '/location/add/fill',
  [SCREEN.detail_product]: '/products/details',
};

type Props = {
  navigation: NextRouter & HistoryLocationState;
  goBack: () => void;
  push: (url: keyof typeof prefix) => void;
  pushRaw: (url: string) => void;
  replaceScreen: (url: keyof typeof prefix) => void;
  pushScreenParam: (url: keyof typeof prefix, data?: any) => void
};
export const useNavigation = (): Props => {
  const history = useHistory();
  const router = useRouter();
  const navigation = useMemo(
    () => (isWeb ? router : history) as NavigationType,
    []
  );
  const goBack = useCallback(() => {
    if (isWeb) {
      navigation.back();
    } else {
      navigation.goBack();
    }
  }, []);

  const pushScreen = useCallback((url: keyof typeof prefix) => {
    if (isWeb) {
      navigation.push(prefix[url]);
    } else {
      navigation.push(prefix[url] ?? '');
    }
  }, []);
  const pushScreenParam = useCallback(
    (url: keyof typeof prefix, data: any) => {
      if (isWeb) {
        navigation.push(`${prefix[url]}/${data}` ?? '');
      } else {
        history.push(`${prefix[url]}/${data}`)
      }
    },
    []
  );
  const pushScreenWithRawLink = useCallback((url: string) => {
    navigation.push(url ?? '');
  }, []);

  const replaceScreen = useCallback((url: keyof typeof prefix) => {
    navigation.replace(prefix[url] ?? '');
  }, []);

  return {
    navigation,
    goBack,
    replaceScreen: (url: keyof typeof prefix) => replaceScreen(url),
    pushRaw: (url: string) => pushScreenWithRawLink(url),
    push: (url: keyof typeof prefix) => pushScreen(url),
    pushScreenParam: (url: keyof typeof prefix, data?: any) => pushScreenParam(url, data),
  };
};
