import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.scss';
import {
  wrapper,
  setDefaultToken,
  fetchListAddressConfig,
  saveUserInfo,
  isWeb,
} from '@nxseo/function-shares';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { Storage } from '@capacitor/storage';
import { Loading, TabBottom } from '@nxseo/ui-shares';

function App({ Component, pageProps }: AppProps) {
  const AnyComponent = Component;
  const route = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkToken() {
      const token = await Storage.get({
        key: 'token',
      });
      const profile = await Storage.get({ key: 'profile' });
      if (token.value && profile.value) {
        setDefaultToken(token.value);
        dispatch(
          saveUserInfo({
            token: token.value,
            profile: JSON.parse(profile.value),
          })
        );
      }
      setLoading(false);
      fetchListAddressConfig();
    }
    checkToken();
  }, [dispatch]);

  return (
    <>
    
      <main className="app">
        <AnyComponent {...pageProps} />
        <ToastContainer
          hideProgressBar
          theme="colored"
          position="top-center"
          autoClose={3000}
          closeOnClick
        />
      </main>
    </>
  );
}

// export default App;
export default wrapper.withRedux(App);
