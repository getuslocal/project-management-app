// import React from 'react';
// import { Route } from 'react-router-dom';
// // import TopNavigationBar from '../TopNavigationBar/TopNavigationBar';
// import * as Roles from './roles';
// import {
//   BoardContainer
// } from './Board.style';

// const Board = ({ component: { component, linkVariable, tabs, title }, ...props }) => {
//   // Can get /app/:board variable on this component.
//   // console.log(props.match)
//   const Component = Roles[component];
//   return (
//     <BoardContainer>
//       <Route
//         exact
//         path={`${props.match.url}/${linkVariable}`} // ex: /app/dashboard/:dashboard?
//         render={() => <Component component={component}/>}
//       />
//     </BoardContainer>
//   )
// }

// // @todo : When it is "dashboard" then get tabs from db which are names of projects.
// // Use mapStatetoProps and reselect.

// export default Board;