import { AppProps } from 'next/app';
import './styles.scss';
import {
  wrapper,
  setDefaultToken,
  fetchListAddressConfig,
  saveUserInfo,
} from '@nxseo/function-shares';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { Storage } from '@capacitor/storage';
import { Loading, TabBottom } from '@nxseo/ui-shares';
import Head from 'next/head';

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
      {/* <Head>
        <title>{'data?.name'}</title>
        <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
        <meta property="og:title" content={'data?.name'} key="title" />
        <meta property="og:description" content={'data?.log_time'} />
        <meta property="og:image" content={'data?.photo'} />
      </Head> */}
        {!loading ? <AnyComponent {...pageProps} /> : <Loading />}
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
