import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Landing from '../views/LandingPage/LandingPage'
import NotFound from '../views/NotFound/NotFound';
import BoardContainer from '../views/components/Board/Board.container';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/app/:board" component={BoardContainer} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
