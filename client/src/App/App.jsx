import React, { Fragment } from 'react';
import { hot } from 'react-hot-loader/root';
import Routes from './Routes';
import NormalizeStyles from './NormalizeStyles';
import BaseStyles from './BaseStyles';
import IconStyles from './IconStyles'

const App = () => (
  <Fragment>
    <NormalizeStyles />
    <BaseStyles />
    <IconStyles />
    <Routes />
  </Fragment>
);

export default hot(App);
