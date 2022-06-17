import { isWeb } from '@nxseo/function-shares';
import dynamic from 'next/dynamic';
import Home from './home';

const App = dynamic(() => import('./AppShell'), {
  ssr: false,
});

export default function Index() {
  return  isWeb? <Home /> : <App/>;
}