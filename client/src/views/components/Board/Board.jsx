import React from 'react';
import { Route } from 'react-router-dom';
import TopNavigationBar from '../TopNavigationBar/TopNavigationBar';
import * as Roles from './roles';
import {
  BoardContainer
} from './Board.style';

const Board = ({ component: { component, linkVariable, tabs, title }, ...props }) => {
  // Can get /app/:board variable on this component.
  // console.log(props.match)
  return (
    <BoardContainer>
      <TopNavigationBar title={title} tabs={tabs} {...props} />
      <Route
        exact
        component={Roles[component]}
        path={`${props.match.url}/${linkVariable}`} // ex: /app/dashboard/:dashboard?
      />
    </BoardContainer>
  )
}

// @todo : When it is "dashboard" then get tabs from db which are names of projects.
// Use mapStatetoProps and reselect.

export default Board;