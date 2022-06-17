import { isWeb } from '@nxseo/function-shares';
import dynamic from 'next/dynamic';
import Home from './home';
// import Head from 'next/head';
const App = dynamic(() => import('./AppShell'), {
  ssr: false,
});

export default function Index() {
  return isWeb ? (
    <>
      {/* <Head>
        <title>{'Index'}</title>
        <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
        <meta property="og:title" content={'data?.name'} key="title" />
        <meta property="og:description" content={'data?.log_time'} />
        <meta property="og:image" content={'data?.photo'} />
      </Head> */}
      <Home />
    </>
  ) : (
    <App />
  );
}
