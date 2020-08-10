import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Landing from '../../views/LandingPage/LandingPage'
import NotFound from '../../views/NotFound/NotFound';
import PrivateRoutesContainer from './PrivateRoutesContainer';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/app" component={PrivateRoutesContainer} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
