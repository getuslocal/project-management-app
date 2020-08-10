import React, { Fragment, useEffect } from 'react'
import { hot } from 'react-hot-loader/root'
import Routes from './routes/Routes'
import NormalizeStyles from './styles/NormalizeStyles'
import GlobalClasses from './styles/GlobalClasses'
import BaseStyles from './styles/BaseStyles'
import IconStyles from './styles/IconStyles'
import store from '../redux/store';
import { loadUser } from '../redux/auth/auth.actions';
import setAuthToken from '../shared/utils/setAuthToken';

const App = () => {

  useEffect(() => {
    setAuthToken(localStorage.token);
    store.dispatch(loadUser());
  }, []);

  return (
    <Fragment>
      <NormalizeStyles />
      <BaseStyles />
      <GlobalClasses />
      <IconStyles />
      <Routes />
    </Fragment>
  );
}

export default hot(App)
