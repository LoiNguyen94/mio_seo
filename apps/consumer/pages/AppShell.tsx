import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';

import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import { App as CapacitorApp } from '@capacitor/app';
import Tabs from './IonTab';
import { useAppSelector, useNavigation } from '@nxseo/function-shares';
import login from './login';
import register from './register';
import forgetPassword from './forget-password';
import location from './location';
import addNewAddress from './location/add';
import fillAddress from './location/add/fill';
import editLocation from './location/edit/index';
import DetailProduct from './products/details/IonDetail';
import { useEffect } from 'react';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = useAppSelector((state) => state.auth.token);
  const isAuth = token !== undefined;

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? <Component {...props} /> : <Redirect to="/home" />
      }
    />
  );
};

const AppShell = () => {
  const { goBack } = useNavigation();
  useEffect(() => {
    CapacitorApp.addListener('backButton', ({ canGoBack }) => {
      if (!canGoBack) {
        CapacitorApp.exitApp();
      } else {
        goBack();
      }
    });
  }, []);
  return (
    // @ts-ignore
    <IonReactRouter>
      <IonRouterOutlet id="main" mode="ios">
        <Route path="/tabs" render={() => <Tabs />} />
        <Route exact path="/" render={() => <Redirect to="/tabs/home" />} />
        <Route
          path="/products/details/:id"
          component={DetailProduct}
          exact={true}
        />
        <Route path="/login" component={login} exact={true} />
        <Route path="/register" component={register} exact={true} />
        <Route
          path="/forget-password"
          component={forgetPassword}
          exact={true}
        />
        <Route
          path="/products/details/:id"
          component={DetailProduct}
          exact={true}
        />
        <Route path="/location/add" component={addNewAddress} exact={true} />
        <PrivateRoute path="/location" component={location} exact />
        <Route path="/location/add/fill" component={fillAddress} exact={true} />
        <Route path="/location/edit" component={editLocation} />
        {/* <Route exact path="/" render={() => <Redirect to="/home" />} /> */}
      </IonRouterOutlet>
    </IonReactRouter>
  );
};
const App = () => {
  return (
    <IonApp>
      <AppShell />
    </IonApp>
  );
};
export default App;
