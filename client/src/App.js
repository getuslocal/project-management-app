import React from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter, Route } from 'react-router-dom';
import Routes from './components/routing/Routes';
import './App.css';

const App = () => (
  <BrowserRouter>
  <Sidebar />
      <Route component={Routes} />
  </BrowserRouter>
);

export default hot(App);
