import React, { Fragment, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import Routes from './Routes';
import NormalizeStyles from './styles/NormalizeStyles';
import BaseStyles from './styles/BaseStyles';
import IconStyles from './styles/IconStyles';
import store from '../redux/store';
import { loadUser } from '../redux/auth/auth.actions';
import setAuthToken from '../shared/utils/setAuthToken';

const App = () => {
  useEffect(() => {
    setAuthToken(localStorage.token);
    // Check if current token is valid.
    store.dispatch(loadUser());
  }, []);

  return (
    <Fragment>
      <NormalizeStyles />
      <BaseStyles />
      <IconStyles />
      <Routes />
    </Fragment>
  );
};

export default hot(App);
