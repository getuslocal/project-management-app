import React, { Fragment } from 'react'
import { hot } from 'react-hot-loader/root'
import Routes from './Routes'
import NormalizeStyles from './NormalizeStyles'
import GlobalClasses from './GlobalClasses'
import BaseStyles from './BaseStyles'
import IconStyles from './IconStyles'

const App = () => (
  <Fragment>
    <NormalizeStyles />
    <BaseStyles />
    <GlobalClasses />
    <IconStyles />
    <Routes />
  </Fragment>
)

export default hot(App)
