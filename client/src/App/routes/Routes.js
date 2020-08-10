import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Landing from '../../views/LandingPage/LandingPage'
import PrivateRoutes from './PrivateRoutes';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/app" component={PrivateRoutes} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
