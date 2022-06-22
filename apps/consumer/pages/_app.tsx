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
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function () {
        navigator.serviceWorker.register('/sw.js').then(
          function (registration) {
            console.log(
              'Service Worker registration successful with scope: ',
              registration.scope
            );
          },
          function (err) {
            console.log('Service Worker registration failed: ', err);
          }
        );
      });
    }
  }, []);

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
      <Head>
        <link rel="manifest" href="/manifest.json" />
      </Head>
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
